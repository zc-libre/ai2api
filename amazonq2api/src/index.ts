import { loadConfig, AppConfig } from "./config.js";
import { AWSCredentials, AccountRecord } from "./types/index.js";
import { registerClient } from "./oidc/client.js";
import { startDeviceAuthorization } from "./oidc/device-auth.js";
import { pollForTokens } from "./oidc/token.js";
import { BrowserAutomation } from "./browser/automation.js";
import { FileStore } from "./storage/file-store.js";
import { logger } from "./utils/logger.js";
import { withRetry } from "./utils/retry.js";
import { GPTMailClient } from "./email/gptmail-client.js";
import { RegisterAccountOptions } from "./browser/register-handler.js";
import { ProfileStore } from "./browser/profile-store.js";
import { loginWithCamoufox, registerWithCamoufox, ensureCamoufoxInstalled } from "./browser/camoufox-bridge.js";

interface RegistrationWorkflow {
    mailClient: GPTMailClient;
    options: RegisterAccountOptions;
}

interface AutoLoginOptions {
    credentials?: AWSCredentials;
    headless?: boolean;
    label?: string;
    maxRetries?: number;
    registration?: RegistrationWorkflow;
    config?: AppConfig;
}

/**
 * 全自动注册并登录 Amazon Q，返回存储后的账号记录。
 * 
 * 流程说明：
 * 1. 先注册 OIDC 客户端并获取设备授权码
 * 2. 打开设备验证链接
 * 3. 如果是临时邮箱模式，在验证链接页面自动完成注册+授权
 * 4. 如果是已有账号，直接登录完成授权
 */
export async function autoRegisterAndLogin(options: AutoLoginOptions): Promise<AccountRecord> {
    const config = options.config ?? loadConfig();
    const fileStore = new FileStore(config.outputFile);
    const browser = new BrowserAutomation(config.proxyManager);

    const maxRetries = options.maxRetries ?? 3;
    const headless = options.headless ?? config.headless;
    const label = options.label ?? `Auto-${Date.now()}`;

    const execute = async (): Promise<AccountRecord> => {
        // 第一步：先获取设备授权码（不需要浏览器）
        const { clientId, clientSecret } = await registerClient(config.proxyManager);
        const deviceAuth = await startDeviceAuthorization(clientId, clientSecret, config.proxyManager);
        logger.info("设备授权已获取", { verificationUrl: deviceAuth.verificationUriComplete });

        let finalCredentials: AWSCredentials;

        // 创建一个可控的 Token 轮询函数
        const startTokenPolling = (timeoutSec: number) => pollForTokens(
            clientId,
            clientSecret,
            deviceAuth.deviceCode,
            deviceAuth.interval,
            deviceAuth.expiresIn,
            config.proxyManager,
            timeoutSec
        );

        // 开始初始 Token 轮询（10 分钟超时，不阻塞）
        let tokenPromise = startTokenPolling(600);
        let tokenError: Error | null = null;
        
        // 捕获 Token 轮询错误，但不让它中断主流程
        tokenPromise = tokenPromise.catch((err) => {
            tokenError = err;
            logger.warn("Token 轮询超时，等待浏览器流程完成后重试");
            return null as any;
        });

        // 根据配置选择浏览器引擎
        if (config.browserEngine === "camoufox") {
            // 使用 Camoufox（Firefox 反检测浏览器）
            logger.info("使用 Camoufox 浏览器引擎");
            
            // 确保 Camoufox 已安装（未安装时自动安装）
            await ensureCamoufoxInstalled();

            if (options.registration) {
                // 使用 Camoufox 注册模式
                if (!config.gptmail) {
                    throw new Error("注册模式需要配置 GPTMail");
                }

                const proxy = config.proxyManager.getNextProxy();
                
                const result = await registerWithCamoufox(
                    deviceAuth.verificationUriComplete,
                    {
                        gptmail: config.gptmail,
                        password: options.registration.options.password,
                        fullName: options.registration.options.fullName,
                        headless,
                        proxy: proxy ?? undefined
                    }
                );

                if (!result.success) {
                    throw new Error(`Camoufox 注册失败: ${result.message} (${result.errorCode})`);
                }

                finalCredentials = {
                    email: result.email!,
                    password: result.password!
                };

                logger.info("Camoufox 注册成功", { email: finalCredentials.email });
            } else {
                // 已有账号登录模式
                if (!options.credentials) {
                    throw new Error("未提供登录凭据");
                }

                finalCredentials = options.credentials;
                const proxy = config.proxyManager.getNextProxy();
                
                const result = await loginWithCamoufox(
                    deviceAuth.verificationUriComplete,
                    finalCredentials,
                    {
                        headless,
                        proxy: proxy ?? undefined
                    }
                );

                if (!result.success) {
                    throw new Error(`Camoufox 登录失败: ${result.message} (${result.errorCode})`);
                }

                logger.info("Camoufox 登录成功");
            }
        } else {
            // 使用 Playwright（Chrome）
            finalCredentials = await executeWithPlaywright();
        }

        // 等待 Token（如果初始轮询已完成）
        let tokens = await tokenPromise;
        
        // 如果初始轮询超时了，浏览器流程已完成，再次尝试获取 Token
        if (!tokens && tokenError) {
            logger.info("浏览器流程已完成，重新开始 Token 轮询");
            tokens = await startTokenPolling(120);  // 再给 2 分钟
        }
        
        if (!tokens) {
            throw new Error("无法获取 Token，授权可能未完成");
        }

        const account: AccountRecord = {
            clientId,
            clientSecret,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            savedAt: new Date().toISOString(),
            label,
            expiresIn: tokens.expiresIn,
            awsEmail: finalCredentials.email,
            awsPassword: finalCredentials.password
        };

        await fileStore.append(account);
        logger.info("自动注册登录完成");
        return account;

        // 内部函数：使用 Playwright 执行
        async function executeWithPlaywright(): Promise<AWSCredentials> {
            logger.info("使用 Playwright 浏览器引擎");
            
            const profileStore = config.profile.enabled ? new ProfileStore(config.profile.storePath) : undefined;
            const accountEmail = options.credentials?.email ?? options.registration?.options.prefix;
            
            await browser.init({ 
                headless,
                accountEmail: config.profile.enabled ? accountEmail : undefined,
                enableStealth: config.profile.enableStealth,
                profileStore
            });
            
            try {
                let credentials: AWSCredentials;
                let browserPromise: Promise<AWSCredentials>;

                if (options.registration) {
                    browserPromise = browser.authorizeWithRegistration(
                        deviceAuth.verificationUriComplete,
                        options.registration.mailClient,
                        options.registration.options
                    );
                } else if (options.credentials) {
                    credentials = options.credentials;
                    browserPromise = browser.authorizeDevice(deviceAuth.verificationUriComplete, credentials)
                        .then(() => credentials);
                } else {
                    throw new Error("未提供登录凭据，且未开启注册流程");
                }

                return await browserPromise;
            } finally {
                await browser.close();
            }
        }
    };

    return withRetry(execute, {
        maxRetries,
        baseDelayMs: 2_000,
        backoffFactor: 2,
        maxDelayMs: 15_000
    });
}

async function main(): Promise<void> {
    const config = loadConfig();
    const mode = (process.env.ACCOUNT_MODE ?? "manual").toLowerCase();
    let options: AutoLoginOptions;

    if (mode === "temp-email") {
        if (!config.gptmail) {
            throw new Error("未配置 GPTMail API，无法使用临时邮箱注册模式");
        }
        const mailClient = new GPTMailClient({
            baseUrl: config.gptmail.baseUrl,
            apiKey: config.gptmail.apiKey,
            proxyManager: config.proxyManager,
            defaultPollIntervalMs: config.gptmail.pollIntervalMs,
            defaultTimeoutMs: config.gptmail.timeoutMs
        });
        const registrationOptions: RegisterAccountOptions = {
            fullName: process.env.AWS_FULL_NAME,
            prefix: config.gptmail.emailPrefix,
            domain: config.gptmail.emailDomain,
            pollIntervalMs: config.gptmail.pollIntervalMs,
            timeoutMs: config.gptmail.timeoutMs
        };
        options = {
            registration: {
                mailClient,
                options: registrationOptions
            },
            headless: config.headless,
            label: `Temp-${Date.now()}`,
            config
        };
    } else {
        const email = process.env.AWS_EMAIL;
        const password = process.env.AWS_PASSWORD;
        if (!email || !password) {
            throw new Error("请在环境变量 AWS_EMAIL 与 AWS_PASSWORD 中提供登录凭据");
        }
        const credentials: AWSCredentials = {
            email,
            password,
            mfaSecret: process.env.AWS_MFA_SECRET
        };
        options = {
            credentials,
            headless: config.headless,
            config
        };
    }

    const account = await autoRegisterAndLogin(options);
    logger.info("结果", account);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        logger.error("执行失败", { error: error instanceof Error ? error.message : String(error) });
        process.exitCode = 1;
    });
}
