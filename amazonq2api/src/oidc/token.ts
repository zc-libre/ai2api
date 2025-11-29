import { fetch, Response } from "undici";
import { TOKEN_URL } from "../config.js";
import { ProxyManager } from "../utils/proxy.js";
import { logger } from "../utils/logger.js";
import { sleep } from "../utils/retry.js";
import { TokenPollResponse } from "./types.js";
import { makeOIDCHeaders } from "./client.js";

/**
 * 轮询设备授权 Token，直到获得或超时。
 */
export async function pollForTokens(
    clientId: string,
    clientSecret: string,
    deviceCode: string,
    interval: number,
    expiresIn: number,
    proxyManager?: ProxyManager,
    maxTimeoutSec: number = 300
): Promise<TokenPollResponse> {
    const payload = {
        clientId,
        clientSecret,
        deviceCode,
        grantType: "urn:ietf:params:oauth:grant-type:device_code"
    };

    const deadline = Math.min(Date.now() + expiresIn * 1000, Date.now() + maxTimeoutSec * 1000);
    const pollInterval = Math.max(1, Math.floor(interval)) * 1000;
    const dispatcher = proxyManager?.getDispatcher();

    while (Date.now() < deadline) {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: makeOIDCHeaders(),
            body: JSON.stringify(payload),
            dispatcher
        });

        if (response.ok) {
            const data = (await response.json()) as TokenPollResponse;
            logger.info("获取到访问 Token");
            return data;
        }

        if (response.status === 400) {
            const errorBody = await safeParseJSON(response);
            if (errorBody?.error === "authorization_pending") {
                logger.debug("授权尚未完成，继续轮询");
                await sleep(pollInterval);
                continue;
            }
            const message = `Token 请求失败: ${errorBody?.error ?? "unknown"}`;
            logger.error(message, errorBody);
            throw new Error(message);
        }

        const text = await response.text();
        const message = `Token 请求异常: ${response.status} ${response.statusText} - ${text}`;
        logger.error(message);
        throw new Error(message);
    }

    throw new Error("授权超时，未在截止时间内获取 Token");
}

async function safeParseJSON(response: Response): Promise<Record<string, unknown> | null> {
    try {
        return (await response.json()) as Record<string, unknown>;
    } catch (error) {
        logger.warn("解析 JSON 失败", { error });
        return null;
    }
}
