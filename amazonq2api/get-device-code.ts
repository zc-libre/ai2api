#!/usr/bin/env tsx
/**
 * 简单脚本：仅获取 Amazon Q 设备授权码和验证链接
 * 不执行任何登录操作，只返回设备码信息供手动使用
 */
import { registerClient } from "./src/oidc/client.js";
import { startDeviceAuthorization } from "./src/oidc/device-auth.js";
import { loadConfig } from "./src/config.js";
import { logger } from "./src/utils/logger.js";

async function main() {
    const config = loadConfig();

    logger.info("正在注册 OIDC 客户端...");
    const { clientId, clientSecret } = await registerClient(config.proxyManager);

    logger.info("客户端注册成功", {
        clientId: clientId.substring(0, 20) + "...",
    });

    logger.info("正在获取设备授权码...");
    const deviceAuth = await startDeviceAuthorization(clientId, clientSecret, config.proxyManager);

    // 打印结果
    console.log("\n========================================");
    console.log("✅ 设备授权码已成功获取!");
    console.log("========================================\n");

    console.log("📋 设备授权信息:");
    console.log(`   设备码 (Device Code): ${deviceAuth.deviceCode}`);
    console.log(`   用户码 (User Code): ${deviceAuth.userCode}`);
    console.log(`   过期时间: ${deviceAuth.expiresIn} 秒`);
    console.log(`   轮询间隔: ${deviceAuth.interval} 秒\n`);

    console.log("🔗 验证链接:");
    console.log(`   基础链接: ${deviceAuth.verificationUri}`);
    console.log(`   完整链接: ${deviceAuth.verificationUriComplete}\n`);

    console.log("📌 使用说明:");
    console.log("   1. 在浏览器中打开完整链接");
    console.log("   2. 登录你的 AWS 账号并授权");
    console.log("   3. 授权后该设备码将生效\n");

    console.log("💾 客户端凭据 (请妥善保存):");
    console.log(`   Client ID: ${clientId}`);
    console.log(`   Client Secret: ${clientSecret}\n`);

    // 生成可点击的链接
    console.log("🌐 点击下方链接开始授权:");
    console.log(`   ${deviceAuth.verificationUriComplete}\n`);
    console.log("========================================\n");
}

main().catch((error) => {
    logger.error("获取设备授权码失败", {
        error: error instanceof Error ? error.message : String(error)
    });
    process.exitCode = 1;
});
