import { fetch } from "undici";
import { DEVICE_AUTH_URL, START_URL } from "../config.js";
import { ProxyManager } from "../utils/proxy.js";
import { logger } from "../utils/logger.js";
import { DeviceAuthorizationResponse } from "./types.js";
import { makeOIDCHeaders } from "./client.js";

/**
 * 发起设备授权，返回授权码及验证链接。
 */
export async function startDeviceAuthorization(
    clientId: string,
    clientSecret: string,
    proxyManager?: ProxyManager,
    startUrl: string = START_URL
): Promise<DeviceAuthorizationResponse> {
    const payload = {
        clientId,
        clientSecret,
        startUrl
    };

    const dispatcher = proxyManager?.getDispatcher();
    const response = await fetch(DEVICE_AUTH_URL, {
        method: "POST",
        headers: makeOIDCHeaders(),
        body: JSON.stringify(payload),
        dispatcher
    });

    if (!response.ok) {
        const text = await response.text();
        const message = `设备授权失败: ${response.status} ${response.statusText} - ${text}`;
        logger.error(message);
        throw new Error(message);
    }

    const data = (await response.json()) as DeviceAuthorizationResponse;
    logger.info("设备授权已创建", { verification: data.verificationUriComplete });
    return data;
}
