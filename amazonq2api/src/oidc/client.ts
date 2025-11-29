import { randomUUID } from "crypto";
import { fetch } from "undici";
import { REGISTER_URL, USER_AGENT, X_AMZ_USER_AGENT, AMZ_SDK_REQUEST } from "../config.js";
import { ProxyManager } from "../utils/proxy.js";
import { logger } from "../utils/logger.js";
import { OIDCHeaders, RegisterClientResponse } from "./types.js";

/**
 * 生成与 Python 版本一致的 OIDC 请求头。
 */
export function makeOIDCHeaders(): OIDCHeaders {
    return {
        "content-type": "application/json",
        "user-agent": USER_AGENT,
        "x-amz-user-agent": X_AMZ_USER_AGENT,
        "amz-sdk-request": AMZ_SDK_REQUEST,
        "amz-sdk-invocation-id": randomUUID()
    };
}

/**
 * 调用 OIDC 客户端注册接口。
 */
export async function registerClient(proxyManager?: ProxyManager): Promise<RegisterClientResponse> {
    const payload = {
        clientName: "Amazon Q Developer for command line",
        clientType: "public",
        scopes: [
            "codewhisperer:completions",
            "codewhisperer:analysis",
            "codewhisperer:conversations"
        ]
    };

    const dispatcher = proxyManager?.getDispatcher();
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: makeOIDCHeaders(),
        body: JSON.stringify(payload),
        dispatcher
    });

    if (!response.ok) {
        const message = `OIDC 客户端注册失败: ${response.status} ${response.statusText}`;
        logger.error(message);
        throw new Error(message);
    }

    const data = (await response.json()) as RegisterClientResponse;
    logger.info("OIDC 客户端注册成功", { clientId: data.clientId });
    return data;
}
