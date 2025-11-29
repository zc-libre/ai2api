import { Browser, BrowserContext, Page, chromium } from "playwright";
import { AWSCredentials } from "../types/index.js";
import { ProxyManager } from "../utils/proxy.js";
import { logger } from "../utils/logger.js";
import { LoginHandler } from "./login-handler.js";
import { RegisterAccountOptions, RegisterHandler } from "./register-handler.js";
import { GPTMailClient } from "../email/gptmail-client.js";
import { BrowserProfile, generateRandomFingerprint } from "./profile.js";
import { generateFingerprintScript, generateStealthScript } from "./fingerprint-inject.js";
import { getDefaultProfileStore, ProfileStore } from "./profile-store.js";

export interface BrowserOptions {
    headless?: boolean;
    proxyManager?: ProxyManager;
    /** 使用指定的浏览器指纹 Profile */
    profile?: BrowserProfile;
    /** 根据邮箱自动获取或创建 Profile */
    accountEmail?: string;
    /** 是否启用反检测（默认 true） */
    enableStealth?: boolean;
    /** Profile 存储管理器（默认使用全局单例） */
    profileStore?: ProfileStore;
}

/**
 * 浏览器自动化封装，负责在 AWS 页面完成授权。
 * 支持为每个账号注入独立的浏览器指纹，实现多账号防关联。
 */
export class BrowserAutomation {
    private browser: Browser | null = null;
    private context: BrowserContext | null = null;
    private page: Page | null = null;
    private readonly proxyManager?: ProxyManager;
    private currentProfile?: BrowserProfile;

    constructor(proxyManager?: ProxyManager) {
        this.proxyManager = proxyManager;
    }

    /**
     * 获取当前使用的 Profile
     */
    getProfile(): BrowserProfile | undefined {
        return this.currentProfile;
    }

    /**
     * 初始化 Playwright 浏览器。
     * 支持传入 Profile 或邮箱来自动应用浏览器指纹。
     */
    async init(options?: BrowserOptions): Promise<void> {
        const proxy = options?.proxyManager?.getNextProxy() ?? this.proxyManager?.getNextProxy();
        const enableStealth = options?.enableStealth ?? true;
        
        // 获取或创建 Profile
        let profile = options?.profile;
        if (!profile && options?.accountEmail) {
            const store = options?.profileStore ?? getDefaultProfileStore();
            profile = await store.getOrCreateForAccount(options.accountEmail);
        }
        
        // 如果没有指定 profile，生成一个临时的随机指纹
        const fingerprint = profile?.fingerprint ?? generateRandomFingerprint();
        this.currentProfile = profile;
        
        this.browser = await chromium.launch({
            headless: options?.headless ?? true,
            proxy: proxy ? { server: proxy } : undefined,
            args: [
                "--disable-blink-features=AutomationControlled",
                "--disable-dev-shm-usage",
                "--no-first-run",
                "--no-default-browser-check"
            ]
        });
        
        this.context = await this.browser.newContext({
            userAgent: fingerprint.userAgent,
            viewport: {
                width: fingerprint.screenWidth,
                height: fingerprint.screenHeight
            },
            screen: {
                width: fingerprint.screenWidth,
                height: fingerprint.screenHeight
            },
            locale: fingerprint.language,
            timezoneId: fingerprint.timezone,
            deviceScaleFactor: fingerprint.devicePixelRatio,
            colorScheme: "light"
        });
        
        // 注入指纹伪装脚本（在每个页面加载前执行）
        await this.context.addInitScript(generateFingerprintScript(fingerprint));
        
        // 注入反检测脚本
        if (enableStealth) {
            await this.context.addInitScript(generateStealthScript());
        }
        
        this.page = await this.context.newPage();
        
        logger.info("浏览器已启动", { 
            proxy, 
            profileId: profile?.id,
            userAgent: fingerprint.userAgent.slice(0, 50) + "...",
            screen: `${fingerprint.screenWidth}x${fingerprint.screenHeight}`,
            timezone: fingerprint.timezone
        });
    }

    /**
     * 在浏览器中完成设备授权流程（已有账号登录）。
     */
    async authorizeDevice(verificationUrl: string, credentials: AWSCredentials): Promise<void> {
        const page = this.getPageOrThrow();
        await page.goto(verificationUrl, { waitUntil: "domcontentloaded" });
        logger.info("已打开验证链接", { verificationUrl });

        const loginHandler = new LoginHandler(page);
        await loginHandler.login(credentials);
        await this.confirmAuthorization();
    }

    /**
     * 在设备授权流程中使用临时邮箱完成注册+授权。
     * 正确流程：先获取设备授权码 -> 打开验证链接 -> 输入邮箱 -> 进入注册流程 -> 完成注册后自动授权
     */
    async authorizeWithRegistration(
        verificationUrl: string,
        mailClient: GPTMailClient,
        options: RegisterAccountOptions
    ): Promise<AWSCredentials> {
        const page = this.getPageOrThrow();
        await page.goto(verificationUrl, { waitUntil: "domcontentloaded" });
        logger.info("已打开设备验证链接（注册模式）", { verificationUrl });

        const handler = new RegisterHandler(page, mailClient);
        const credentials = await handler.registerInDeviceFlow(options);
        
        await this.confirmAuthorization();
        return credentials;
    }

    /**
     * 使用临时邮箱注册新的 AWS Builder ID（独立注册页面，备用）。
     * @deprecated 推荐使用 authorizeWithRegistration 在设备授权流程中完成注册
     */
    async registerAccount(mailClient: GPTMailClient, options: RegisterAccountOptions): Promise<AWSCredentials> {
        const page = this.getPageOrThrow();
        const handler = new RegisterHandler(page, mailClient);
        return handler.register(options);
    }

    /**
     * 关闭浏览器实例。
     */
    async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            logger.info("浏览器已关闭");
        }
        this.page = null;
        this.context = null;
        this.browser = null;
    }

    private async confirmAuthorization(): Promise<void> {
        const page = this.getPageOrThrow();
        const allowButton = page.getByRole("button", { name: /Allow|Confirm|允许|确认/i });
        try {
            await Promise.race([
                page.waitForURL(/device\/(success|complete|done)/i, { timeout: 15_000 }),
                allowButton.waitFor({ timeout: 15_000 })
            ]);
        } catch (error) {
            logger.warn("确认授权时等待超时或页面无跳转", { error });
        }

        if (await allowButton.isVisible().catch(() => false)) {
            await allowButton.click();
            logger.info("检测到授权按钮并已点击");
            await page.waitForURL(/device\/(success|complete|done)/i, { timeout: 15_000 }).catch(() => undefined);
        }
    }

    private getPageOrThrow(): Page {
        if (!this.page) {
            throw new Error("浏览器尚未初始化");
        }
        return this.page;
    }
}
