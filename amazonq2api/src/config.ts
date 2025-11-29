import path from "path";
import dotenv from "dotenv";
import { ProxyManager } from "./utils/proxy.js";
import { LogLevel } from "./types/index.js";

dotenv.config();

export const OIDC_BASE = "https://oidc.us-east-1.amazonaws.com";
export const REGISTER_URL = `${OIDC_BASE}/client/register`;
export const DEVICE_AUTH_URL = `${OIDC_BASE}/device_authorization`;
export const TOKEN_URL = `${OIDC_BASE}/token`;
export const START_URL = "https://view.awsapps.com/start";

export const USER_AGENT = "aws-sdk-rust/1.3.9 os/windows lang/rust/1.87.0";
export const X_AMZ_USER_AGENT = "aws-sdk-rust/1.3.9 ua/2.1 api/ssooidc/1.88.0 os/windows lang/rust/1.87.0 m/E app/AmazonQ-For-CLI";
export const AMZ_SDK_REQUEST = "attempt=1; max=3";

export interface GPTMailConfig {
    baseUrl: string;
    apiKey: string;
    emailPrefix?: string;
    emailDomain?: string;
    pollIntervalMs?: number;
    timeoutMs?: number;
}

export interface ProfileConfig {
    /** 是否启用浏览器指纹隔离（默认 true） */
    enabled: boolean;
    /** Profile 存储路径 */
    storePath: string;
    /** 是否启用反检测脚本（默认 true） */
    enableStealth: boolean;
}

/** 浏览器引擎类型 */
export type BrowserEngine = "playwright" | "camoufox";

export interface AppConfig {
    headless: boolean;
    proxyManager: ProxyManager;
    outputFile: string;
    logLevel: LogLevel;
    gptmail?: GPTMailConfig;
    profile: ProfileConfig;
    /** 浏览器引擎：playwright (Chrome) 或 camoufox (Firefox 反检测) */
    browserEngine: BrowserEngine;
}

/**
 * 读取环境变量生成运行配置。
 */
export function loadConfig(): AppConfig {
    // 默认打开可见浏览器窗口（headless: false），设置 HEADLESS=true 可切换到无头模式
    const headless = (process.env.HEADLESS ?? "false").toLowerCase() === "true";
    const outputFile = process.env.OUTPUT_FILE ?? path.resolve(process.cwd(), "output/accounts.ndjson");
    const proxyManager = ProxyManager.fromEnv();
    const logLevel = (process.env.LOG_LEVEL as LogLevel) ?? "info";
    const gptmailApiKey = process.env.GPTMAIL_API_KEY ?? process.env.GPTMAIL_KEY;
    const gptmail = gptmailApiKey
        ? {
              baseUrl: process.env.GPTMAIL_BASE_URL ?? "https://mail.chatgpt.org.uk",
              apiKey: gptmailApiKey,
              emailPrefix: process.env.GPTMAIL_EMAIL_PREFIX,
              emailDomain: process.env.GPTMAIL_EMAIL_DOMAIN,
              pollIntervalMs: parseNumberEnv(process.env.GPTMAIL_POLL_INTERVAL_MS),
              timeoutMs: parseNumberEnv(process.env.GPTMAIL_TIMEOUT_MS)
          }
        : undefined;

    // Profile 配置（浏览器指纹隔离）
    const profile: ProfileConfig = {
        enabled: (process.env.PROFILE_ENABLED ?? "true").toLowerCase() === "true",
        storePath: process.env.PROFILE_STORE_PATH ?? path.resolve(process.cwd(), "output/profiles.json"),
        enableStealth: (process.env.PROFILE_STEALTH ?? "true").toLowerCase() === "true"
    };

    // 浏览器引擎：playwright (Chrome) 或 camoufox (Firefox 反检测)
    // 默认使用 camoufox 以获得更好的反检测效果
    const browserEngine = (process.env.BROWSER_ENGINE ?? "camoufox").toLowerCase() as BrowserEngine;

    return {
        headless,
        proxyManager,
        outputFile,
        logLevel,
        gptmail,
        profile,
        browserEngine
    };
}

function parseNumberEnv(value?: string): number | undefined {
    if (!value) {
        return undefined;
    }
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
}
