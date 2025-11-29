import { Locator, Page } from "playwright";
import { authenticator } from "otplib";
import { AWSCredentials } from "../types/index.js";
import { logger } from "../utils/logger.js";
import { sleep } from "../utils/retry.js";

interface LoginOptions {
    navigationTimeoutMs?: number;
    inputTimeoutMs?: number;
}

/**
 * 负责在 AWS 登录页面完成邮箱、密码以及 MFA 的输入。
 */
export class LoginHandler {
    private readonly page: Page;
    private readonly options: Required<LoginOptions>;

    constructor(page: Page, options?: LoginOptions) {
        this.page = page;
        this.options = {
            navigationTimeoutMs: options?.navigationTimeoutMs ?? 30_000,
            inputTimeoutMs: options?.inputTimeoutMs ?? 10_000
        };
    }

    /**
     * 完成 AWS 登录。
     * 如果邮箱未注册，会自动进入注册流程。
     */
    async login(credentials: AWSCredentials): Promise<void> {
        await this.fillEmail(credentials.email);

        // 检测是否进入了注册流程（姓名输入页面）或登录流程（密码输入页面）
        const isRegistration = await this.detectRegistrationFlow();

        if (isRegistration) {
            logger.info("检测到注册流程，开始处理注册");
            await this.handleRegistrationFlow(credentials);
        } else {
            await this.fillPassword(credentials.password);
            if (credentials.mfaSecret) {
                await this.fillMfa(credentials.mfaSecret);
            }
        }

        await this.waitForPostLogin();
    }

    /**
     * 检测是否进入了注册流程（姓名输入页面）
     */
    private async detectRegistrationFlow(): Promise<boolean> {
        // 等待页面跳转
        await sleep(2_000);

        // 检查 URL 是否包含 signup
        const url = this.page.url();
        if (url.includes('signup') || url.includes('register')) {
            return true;
        }

        // 检查是否有姓名输入框（注册特征）
        const nameSelectors = [
            'input[placeholder*="Maria"]',
            'input[placeholder*="Silva"]',
            'input[placeholder*="name" i]',
            'input[name="fullName"]',
            'input[name="displayName"]'
        ];

        for (const selector of nameSelectors) {
            try {
                const locator = this.page.locator(selector);
                const isVisible = await locator.first().isVisible({ timeout: 1_000 }).catch(() => false);
                if (isVisible) {
                    return true;
                }
            } catch {
                // continue
            }
        }

        // 检查是否有密码输入框（登录特征）
        const passwordVisible = await this.page.locator('input[type="password"]').first().isVisible({ timeout: 2_000 }).catch(() => false);
        return !passwordVisible;
    }

    /**
     * 处理注册流程：输入姓名、等待验证码等
     */
    private async handleRegistrationFlow(credentials: AWSCredentials): Promise<void> {
        // 1. 填写姓名
        const nameSelectors = [
            'input[placeholder*="Maria"]',
            'input[placeholder*="Silva"]',
            'input[name="fullName"]',
            'input[name="displayName"]',
            'input[autocomplete="name"]'
        ];

        const nameTarget = await this.waitForFirst(nameSelectors, 10_000);
        if (nameTarget) {
            const displayName = `User ${Date.now().toString(36)}`;
            await nameTarget.fill(displayName);
            logger.info("已输入姓名", { displayName });

            // 点击继续按钮
            await this.clickContinueButton();
        }

        // 2. 等待验证码页面
        await sleep(2_000);

        // 检查是否在验证码页面
        const otpSelectors = [
            'input[placeholder*="6"]',
            'input[name="code"]',
            'input[name="verificationCode"]',
            'input[type="tel"]'
        ];

        const otpTarget = await this.waitForFirst(otpSelectors, 30_000);
        if (otpTarget) {
            logger.warn("已进入验证码页面，需要输入邮箱验证码");
            // 这里需要等待用户手动输入验证码，或者集成邮箱客户端
            // 暂时等待较长时间让外部处理
            throw new Error("注册流程需要邮箱验证码，请配置临时邮箱客户端或使用 ACCOUNT_MODE=temp-email");
        }
    }

    /**
     * 点击继续/下一步按钮
     */
    private async clickContinueButton(): Promise<void> {
        const buttonSelectors = [
            'button:has-text("继续")',
            'button:has-text("Continue")',
            'button:has-text("Next")',
            'button[data-testid="signup-next-button"]',
            'button[type="submit"]'
        ];

        for (const selector of buttonSelectors) {
            try {
                const button = this.page.locator(selector).first();
                if (await button.isVisible({ timeout: 1_000 }).catch(() => false)) {
                    await button.click();
                    logger.info("已点击继续按钮");
                    return;
                }
            } catch {
                // continue
            }
        }
    }

    private async fillEmail(email: string): Promise<void> {
        // 新的 AWS 登录页面使用 type="text" 而不是 type="email"
        // 需要更灵活的选择器来适配页面变化
        const selectors = [
            'input[type="email"]',
            'input[name="email"]',
            '#resolving_input',
            'input[placeholder*="@example.com"]',
            'input[placeholder*="username"]',
            'input[aria-labelledby*="formField"]', // AWS UI 框架的 aria 属性
            'input[type="text"][autocomplete="on"]', // 新登录页的邮箱输入框特征
            'input[type="text"][placeholder]' // 通用的文本输入框
        ];

        // 等待页面加载和可能的重定向
        await this.page.waitForLoadState('domcontentloaded').catch(() => undefined);

        const target = await this.waitForFirst(selectors, this.options.inputTimeoutMs);
        if (!target) {
            // 尝试通过 role 查找
            try {
                const roleTarget = this.page.getByRole('textbox').first();
                await roleTarget.waitFor({ timeout: 5_000 });
                await roleTarget.fill(email);
                await roleTarget.press("Enter");
                logger.info("已输入邮箱（通过 role 定位）");
                return;
            } catch {
                throw new Error("未找到邮箱输入框，可能页面结构变化");
            }
        }
        await target.fill(email);
        await target.press("Enter");
        logger.info("已输入邮箱");
    }

    private async fillPassword(password: string): Promise<void> {
        const selectors = ['input[type="password"]', 'input[name="password"]', '#password'];
        const target = await this.waitForFirst(selectors, this.options.inputTimeoutMs);
        if (!target) {
            throw new Error("未找到密码输入框");
        }
        await target.fill(password);
        await target.press("Enter");
        logger.info("已输入密码");
    }

    private async fillMfa(secret: string): Promise<void> {
        const token = authenticator.generate(secret);
        const selectors = ['input[name="mfaCode"]', 'input[name="otp"]', 'input[type="tel"]'];
        const target = await this.waitForFirst(selectors, 15_000);
        if (!target) {
            logger.warn("未找到 MFA 输入框，跳过 TOTP 提交");
            return;
        }
        await target.fill(token);
        await target.press("Enter");
        logger.info("已提交 MFA 令牌");
    }

    private async waitForPostLogin(): Promise<void> {
        try {
            await Promise.race([
                this.page.waitForURL(/device\/(success|complete)/i, { timeout: this.options.navigationTimeoutMs }),
                this.page.waitForNavigation({ timeout: this.options.navigationTimeoutMs })
            ]);
        } catch (error) {
            logger.warn("等待登录后导航超时", { error });
        }
        // 再给页面一点时间完成重定向
        await sleep(1_000);
    }

    private async waitForFirst(selectors: string[], timeout: number): Promise<Locator | null> {
        const start = Date.now();
        for (const selector of selectors) {
            const remaining = Math.max(0, timeout - (Date.now() - start));
            if (remaining === 0) {
                break;
            }
            try {
                const locator = this.page.locator(selector);
                await locator.first().waitFor({ timeout: remaining });
                return locator.first();
            } catch {
                // continue to next selector
            }
        }
        return null;
    }
}
