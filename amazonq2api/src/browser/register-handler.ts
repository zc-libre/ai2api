import { Locator, Page } from "playwright";
import { randomUUID } from "crypto";
import { GPTMailClient, GenerateEmailOptions } from "../email/gptmail-client.js";
import { MailWaitOptions } from "../email/types.js";
import { parseVerificationEmail } from "../email/verification-parser.js";
import { logger } from "../utils/logger.js";
import { AWSCredentials } from "../types/index.js";

const DEFAULT_REGISTER_URL = "https://profile.aws.dev/register";

export interface RegisterAccountOptions extends GenerateEmailOptions, MailWaitOptions {
    password: string;
    fullName?: string;
    registerUrl?: string;
}

/**
 * 负责在 AWS Builder ID 注册页面完成账号创建，并与临时邮箱联动。
 */
export class RegisterHandler {
    private readonly page: Page;
    private readonly mailClient: GPTMailClient;

    constructor(page: Page, mailClient: GPTMailClient) {
        this.page = page;
        this.mailClient = mailClient;
    }

    /**
     * 在设备授权流程中完成注册。
     * 流程：输入邮箱 -> AWS 检测新用户 -> 进入注册流程 -> 填写信息 -> 验证邮箱 -> 完成授权
     */
    async registerInDeviceFlow(options: RegisterAccountOptions): Promise<AWSCredentials> {
        const email = await this.mailClient.generateEmail({
            prefix: options.prefix,
            domain: options.domain
        });
        const password = options.password;
        const displayName = options.fullName ?? this.generateDisplayName();

        logger.info("开始设备授权注册流程", { email });

        // 1. 输入邮箱
        await this.fillEmailAndSubmit(email);

        // 2. 等待页面跳转，检测是否进入注册流程
        await this.page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
        const isRegistration = await this.detectRegistrationPage();

        if (!isRegistration) {
            logger.warn("未进入注册页面，可能邮箱已注册", { email });
            throw new Error("邮箱可能已被注册，请检查或使用其他邮箱前缀");
        }

        // 3. 填写注册信息（姓名、密码）
        await this.fillRegistrationForm(displayName, password);

        // 4. 等待并处理邮箱验证
        await this.handleVerification({
            email,
            pollIntervalMs: options.pollIntervalMs,
            timeoutMs: options.timeoutMs
        });

        logger.info("设备授权注册流程完成", { email });
        return {
            email,
            password
        };
    }

    /**
     * 创建新的 AWS Builder ID，返回登录凭据。
     * @deprecated 推荐使用 registerInDeviceFlow 在设备授权流程中完成注册
     */
    async register(options: RegisterAccountOptions): Promise<AWSCredentials> {
        const email = await this.mailClient.generateEmail({
            prefix: options.prefix,
            domain: options.domain
        });
        const password = options.password;
        const displayName = options.fullName ?? this.generateDisplayName();

        await this.navigateToRegister(options.registerUrl);
        await this.fillBasicInfo(email, password, displayName);
        await this.submitRegisterForm();
        await this.handleVerification({
            email,
            pollIntervalMs: options.pollIntervalMs,
            timeoutMs: options.timeoutMs
        });

        logger.info("AWS Builder ID 注册完成", { email });
        return {
            email,
            password
        };
    }

    /**
     * 输入邮箱并提交（设备授权流程第一步）
     */
    private async fillEmailAndSubmit(email: string): Promise<void> {
        const selectors = [
            'input[type="email"]',
            'input[name="email"]',
            '#resolving_input',
            'input[placeholder*="@example.com"]',
            'input[placeholder*="username"]',
            'input[type="text"][autocomplete="on"]',
            'input[type="text"][placeholder]'
        ];

        const target = await this.waitForFirst(selectors, 15_000);
        if (!target) {
            // 尝试通过 role 查找
            const roleTarget = this.page.getByRole('textbox').first();
            try {
                await roleTarget.waitFor({ timeout: 5_000 });
                await roleTarget.fill(email);
                await roleTarget.press("Enter");
                logger.info("已输入邮箱（通过 role 定位）");
                return;
            } catch {
                throw new Error("未找到邮箱输入框");
            }
        }
        await target.fill(email);
        await target.press("Enter");
        logger.info("已输入邮箱", { email });
    }

    /**
     * 检测是否进入了注册页面
     */
    private async detectRegistrationPage(): Promise<boolean> {
        // 等待页面加载
        await this.page.waitForTimeout(2_000);

        // 检查 URL
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

        return false;
    }

    /**
     * 填写注册表单（多步骤流程）
     * 步骤1: 输入姓名 -> 点击继续
     * 步骤2: 输入密码 -> 点击继续
     * 步骤3: 进入验证码页面
     */
    private async fillRegistrationForm(displayName: string, password: string): Promise<void> {
        // 步骤1: 填写姓名页面
        logger.info("注册步骤1: 填写姓名");
        const nameSelectors = [
            '[data-testid="signup-full-name-input"] input',
            'input[placeholder*="Maria José Silva"]',
            'input[placeholder*="Maria"]',
            'input[placeholder*="Silva"]',
            'input[name="fullName"]',
            'input[name="displayName"]',
            'input[autocomplete="name"]'
        ];

        const nameInput = await this.waitForFirst(nameSelectors, 10_000);
        if (!nameInput) {
            throw new Error("未找到姓名输入框");
        }
        await nameInput.fill(displayName);
        logger.info("已输入姓名", { displayName });

        // 等待继续按钮启用并点击
        await this.clickNextButton();
        
        // 等待页面跳转到密码页面
        await this.page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
        await this.page.waitForTimeout(1_000);

        // 步骤2: 填写密码页面
        logger.info("注册步骤2: 填写密码");
        const hasPassword = await this.tryFillPasswords(password);
        
        if (hasPassword) {
            // 点击继续提交密码
            await this.clickNextButton();
            await this.page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
        }
        
        logger.info("注册表单填写完成，等待验证码页面");
    }

    /**
     * 尝试填写密码（密码可能在单独页面）
     */
    private async tryFillPasswords(password: string): Promise<boolean> {
        const passwordSelectors = ["input[type='password']", "input[name='password']", "#password"];
        
        // 等待密码输入框出现
        const passwordInput = await this.waitForFirst(passwordSelectors, 15_000);
        if (!passwordInput) {
            logger.warn("未找到密码输入框，可能页面结构不同");
            return false;
        }

        // 获取所有密码输入框（可能有确认密码框）
        const passwordInputs = await this.findAll(passwordSelectors, 5_000);
        for (const [index, locator] of passwordInputs.entries()) {
            const label = index === 0 ? "password" : `confirm-password`;
            await locator.fill(password);
            logger.debug("已输入密码字段", { label });
        }
        return true;
    }

    /**
     * 点击下一步/继续按钮（等待按钮启用）
     */
    private async clickNextButton(): Promise<void> {
        // 优先使用 data-testid 选择器
        const testIdButton = this.page.locator('button[data-testid="signup-next-button"]');
        
        try {
            // 等待按钮可见
            await testIdButton.waitFor({ state: 'visible', timeout: 5_000 });
            
            // 等待按钮启用（最多等 10 秒）
            await this.page.waitForFunction(
                () => {
                    const btn = document.querySelector('button[data-testid="signup-next-button"]');
                    return btn && !btn.hasAttribute('disabled');
                },
                { timeout: 10_000 }
            );
            
            await testIdButton.click();
            logger.info("已点击继续按钮 (data-testid)");
            return;
        } catch {
            logger.debug("通过 data-testid 未找到或按钮未启用，尝试其他方式");
        }

        // 退化：通过文本查找按钮
        const buttonPatterns = [
            /继续/,
            /continue/i,
            /next/i,
            /下一步/,
            /create/i,
            /sign\s?up/i,
            /注册/
        ];

        for (const pattern of buttonPatterns) {
            try {
                const button = this.page.getByRole("button", { name: pattern });
                if (await button.isVisible({ timeout: 2_000 }).catch(() => false)) {
                    // 检查是否禁用
                    const isDisabled = await button.isDisabled().catch(() => false);
                    if (!isDisabled) {
                        await button.click();
                        logger.info("已点击按钮", { pattern: pattern.toString() });
                        return;
                    }
                }
            } catch {
                // continue
            }
        }

        // 最后退化：寻找任意 type=submit 按钮
        const submitButton = await this.waitForFirst(['button[type="submit"]:not([disabled])', 'input[type="submit"]'], 3_000);
        if (submitButton) {
            await submitButton.click();
            logger.info("已点击提交按钮 (type=submit)");
            return;
        }

        throw new Error("未找到可用的继续按钮");
    }

    /**
     * 点击继续/下一步按钮（旧方法，保留兼容）
     * @deprecated 使用 clickNextButton 替代
     */
    private async clickContinueButton(): Promise<void> {
        return this.clickNextButton();
    }

    private async navigateToRegister(registerUrl?: string): Promise<void> {
        const target = registerUrl ?? DEFAULT_REGISTER_URL;
        await this.page.goto(target, { waitUntil: "domcontentloaded", timeout: 45_000 });
        logger.info("已打开 AWS 注册页面", { target });
    }

    private async fillBasicInfo(email: string, password: string, displayName: string): Promise<void> {
        // 注意：不要在填邮箱后按 Enter，否则可能提前触发表单提交
        await this.fillInput(["input[type='email']", "input[name='email']", "#emailAddress"], email, false);

        const nameInput = await this.waitForFirst(
            ["input[name='fullName']", "input[name='displayName']", "input[autocomplete='name']", "#fullName"],
            5_000
        );
        if (nameInput) {
            await nameInput.fill(displayName);
        }

        await this.fillPasswords(password);

        // 勾选同意条款
        const consentCheckbox = await this.findCheckbox(["input[name='terms']", "input[type='checkbox']"]);
        if (consentCheckbox) {
            const isChecked = await consentCheckbox.isChecked();
            if (!isChecked) {
                await consentCheckbox.check();
            }
        }
    }

    private async submitRegisterForm(): Promise<void> {
        const submitButton = this.page.getByRole("button", { name: /create|注册|sign\s?up|继续|next/i });
        if (await submitButton.isVisible().catch(() => false)) {
            await submitButton.click();
            return;
        }

        // 退化：寻找 type=submit
        const submitInput = await this.waitForFirst(["button[type='submit']", "input[type='submit']"], 3_000);
        if (submitInput) {
            await submitInput.click();
            return;
        }

        throw new Error("未找到注册提交按钮");
    }

    private async handleVerification(options: MailWaitOptions & { email: string }): Promise<void> {
        const codeInput = await this.waitForFirst(
            ["input[name='code']", "input[name='verificationCode']", "#verification_code", "input[type='tel']"],
            45_000
        );
        if (!codeInput) {
            throw new Error("未找到验证码输入框");
        }

        const mail = await this.mailClient.waitForEmail({
            email: options.email,
            pollIntervalMs: options.pollIntervalMs,
            timeoutMs: options.timeoutMs,
            filter: (item) => /aws|amazon|verify/i.test(item.subject),
            newestFirst: true
        });
        const parsed = parseVerificationEmail(mail);
        if (parsed?.code) {
            await codeInput.fill(parsed.code.trim());
            await codeInput.press("Enter").catch(() => undefined);
            await this.page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
            return;
        }

        if (parsed?.link) {
            await this.page.goto(parsed.link, { waitUntil: "load", timeout: 30_000 });
            return;
        }

        throw new Error("未能从邮件中解析验证码");
    }

    private async fillPasswords(password: string): Promise<void> {
        const passwordSelectors = ["input[type='password']", "input[name='password']", "#password"];
        const passwordInputs = await this.findAll(passwordSelectors, 10_000);
        if (passwordInputs.length === 0) {
            throw new Error("未找到密码输入框");
        }
        for (const [index, locator] of passwordInputs.entries()) {
            const label = index === 0 ? "password" : `password-${index}`;
            await locator.fill(password);
            logger.debug("已输入密码字段", { label });
        }
    }

    private async fillInput(selectors: string[], value: string, pressEnter = false): Promise<void> {
        const locator = await this.waitForFirst(selectors, 15_000);
        if (!locator) {
            throw new Error(`未找到输入框: ${selectors.join(",")}`);
        }
        await locator.fill(value);
        if (pressEnter) {
            await locator.press("Enter").catch(() => undefined);
        }
    }

    private async waitForFirst(selectors: string[], timeout: number): Promise<Locator | null> {
        const start = Date.now();
        for (const selector of selectors) {
            const remaining = Math.max(0, timeout - (Date.now() - start));
            if (remaining === 0) {
                break;
            }
            try {
                const locator = this.page.locator(selector).first();
                await locator.waitFor({ timeout: remaining });
                return locator;
            } catch {
                // ignore
            }
        }
        return null;
    }

    private async findAll(selectors: string[], timeout: number): Promise<Locator[]> {
        const results: Locator[] = [];
        for (const selector of selectors) {
            try {
                const locator = this.page.locator(selector);
                await locator.first().waitFor({ timeout });
                results.push(...(await locator.all()));
            } catch {
                // ignore
            }
        }
        return results;
    }

    private async findCheckbox(selectors: string[]): Promise<Locator | null> {
        for (const selector of selectors) {
            try {
                const locator = this.page.locator(selector).first();
                const isVisible = await locator.isVisible({ timeout: 1000 }).catch(() => false);
                if (isVisible) {
                    return locator;
                }
            } catch {
                // ignore
            }
        }
        return null;
    }

    private generateDisplayName(): string {
        const uuid = randomUUID().split("-")[0];
        return `GPT User ${uuid}`;
    }
}

