import { chromium } from "playwright";
import { logger } from "./utils/logger.js";
import { loadConfig } from "./config.js";
import { registerClient } from "./oidc/client.js";
import { startDeviceAuthorization } from "./oidc/device-auth.js";

/**
 * 调试脚本：打开验证链接，暂停在页面上，手动检查页面结构
 */
async function debugLogin() {
    const config = loadConfig();

    // 1. 注册 OIDC 客户端
    const { clientId, clientSecret } = await registerClient(config.proxyManager);
    logger.info("OIDC 客户端注册成功", { clientId });

    // 2. 创建设备授权
    const deviceAuth = await startDeviceAuthorization(clientId, clientSecret, config.proxyManager);
    logger.info("设备授权已创建", {
        verification: deviceAuth.verificationUriComplete
    });

    // 3. 启动浏览器（非 headless 模式，方便观察）
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500 // 放慢操作速度，方便观察
    });

    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
    });

    const page = await context.newPage();

    // 4. 打开验证链接
    await page.goto(deviceAuth.verificationUriComplete, {
        waitUntil: "domcontentloaded",
        timeout: 60_000
    });
    logger.info("已打开验证链接", { url: deviceAuth.verificationUriComplete });

    // 5. 等待页面跳转
    await page.waitForTimeout(5000);

    // 6. 获取当前页面信息
    const currentUrl = page.url();
    logger.info("当前页面 URL", { currentUrl });

    // 7. 尝试查找各种可能的邮箱输入框
    const selectors = [
        'input[type="email"]',
        'input[name="email"]',
        'input[name="username"]',
        'input[id="resolving_input"]',
        'input[autocomplete="email"]',
        'input[autocomplete="username"]',
        'input[placeholder*="email" i]',
        'input[placeholder*="邮箱" i]',
        'awsui-input input',
        '[data-testid*="email" i]',
        '[data-testid*="username" i]'
    ];

    logger.info("开始检测页面输入框...");

    for (const selector of selectors) {
        try {
            const locator = page.locator(selector);
            const count = await locator.count();
            if (count > 0) {
                const isVisible = await locator.first().isVisible();
                logger.info(`找到匹配元素`, {
                    selector,
                    count,
                    isVisible
                });

                // 获取元素的 HTML
                const html = await locator.first().evaluate(el => el.outerHTML);
                logger.info(`元素 HTML`, { selector, html });
            }
        } catch (error) {
            // 忽略错误，继续下一个选择器
        }
    }

    // 8. 截图保存
    await page.screenshot({
        path: '/Users/libre/code/ai/ai2api/amazonq2api/debug-login-page.png',
        fullPage: true
    });
    logger.info("页面截图已保存到 debug-login-page.png");

    // 9. 获取页面 HTML
    const html = await page.content();
    const fs = await import("fs/promises");
    await fs.writeFile('/Users/libre/code/ai/ai2api/amazonq2api/debug-login-page.html', html);
    logger.info("页面 HTML 已保存到 debug-login-page.html");

    // 10. 保持浏览器打开，等待手动检查
    logger.info("浏览器保持打开状态，请手动检查页面元素...");
    logger.info("按 Ctrl+C 结束调试");

    // 等待 5 分钟后自动关闭
    await page.waitForTimeout(300_000);

    await browser.close();
}

debugLogin().catch((error) => {
    logger.error("调试失败", { error: error.message, stack: error.stack });
    process.exit(1);
});
