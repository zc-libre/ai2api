/**
 * 调试脚本：获取设备授权 URL，然后启动浏览器进行调试
 */
import { registerClient } from "./oidc/client.js";
import { startDeviceAuthorization } from "./oidc/device-auth.js";
import { chromium } from "playwright";

async function main() {
    console.log("1. 注册 OIDC 客户端...");
    const { clientId, clientSecret } = await registerClient();
    console.log("   clientId:", clientId);

    console.log("\n2. 获取设备授权...");
    const deviceAuth = await startDeviceAuthorization(clientId, clientSecret);
    console.log("   deviceCode:", deviceAuth.deviceCode);
    console.log("   userCode:", deviceAuth.userCode);
    console.log("   verificationUri:", deviceAuth.verificationUri);
    console.log("   verificationUriComplete:", deviceAuth.verificationUriComplete);
    console.log("   expiresIn:", deviceAuth.expiresIn);
    console.log("   interval:", deviceAuth.interval);

    console.log("\n3. 启动浏览器访问验证链接...");
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(deviceAuth.verificationUriComplete, { waitUntil: "domcontentloaded" });
    console.log("   已打开验证链接，请观察页面...");

    // 等待用户手动操作
    console.log("\n按 Ctrl+C 退出...");
    await new Promise(() => {}); // 永久等待
}

main().catch(console.error);

