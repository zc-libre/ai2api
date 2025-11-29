import { DeviceAuthorization, OIDCClientCredentials, TokenResponse } from "../types/index.js";

/**
 * OIDC 请求头结构。
 */
export interface OIDCHeaders extends Record<string, string> {
    "content-type": string;
    "user-agent": string;
    "x-amz-user-agent": string;
    "amz-sdk-request": string;
    "amz-sdk-invocation-id": string;
}

/**
 * OIDC 客户端注册响应。
 */
export type RegisterClientResponse = OIDCClientCredentials;

/**
 * 设备授权响应类型别名，便于调用方引用。
 */
export type DeviceAuthorizationResponse = DeviceAuthorization;

/**
 * Token 轮询响应类型别名。
 */
export type TokenPollResponse = TokenResponse;
