import { fetch } from "undici";
import { ProxyManager } from "../utils/proxy.js";
import { logger } from "../utils/logger.js";
import { sleep } from "../utils/retry.js";
import {
    EmailDetail,
    EmailListData,
    EmailSummary,
    GenerateEmailData,
    GPTMailResponse,
    MailWaitOptions
} from "./types.js";

export interface GPTMailClientOptions {
    baseUrl: string;
    apiKey: string;
    proxyManager?: ProxyManager;
    defaultPollIntervalMs?: number;
    defaultTimeoutMs?: number;
}

export interface GenerateEmailOptions {
    prefix?: string;
    domain?: string;
}

export interface WaitForEmailOptions extends MailWaitOptions {
    email: string;
    filter?: (email: EmailSummary) => boolean;
    newestFirst?: boolean;
}

/**
 * GPTMail API 客户端封装。
 */
export class GPTMailClient {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private readonly proxyManager?: ProxyManager;
    private readonly defaultPollIntervalMs: number;
    private readonly defaultTimeoutMs: number;

    constructor(options: GPTMailClientOptions) {
        this.baseUrl = options.baseUrl.replace(/\/$/, "");
        this.apiKey = options.apiKey;
        this.proxyManager = options.proxyManager;
        this.defaultPollIntervalMs = options.defaultPollIntervalMs ?? 3000;
        this.defaultTimeoutMs = options.defaultTimeoutMs ?? 120_000;
    }

    /**
     * 生成新的临时邮箱地址。
     */
    async generateEmail(options?: GenerateEmailOptions): Promise<string> {
        const hasCustom = Boolean(options?.prefix || options?.domain);
        const data = await this.request<GenerateEmailData>("/api/generate-email", {
            method: hasCustom ? "POST" : "GET",
            body: hasCustom ? JSON.stringify(options) : undefined
        });
        logger.info("已创建临时邮箱", { email: data.email });
        return data.email;
    }

    /**
     * 获取邮箱的邮件列表。
     */
    async getEmails(email: string): Promise<EmailSummary[]> {
        if (!email) {
            throw new Error("邮箱地址不能为空");
        }
        const data = await this.request<EmailListData>("/api/emails", {
            method: "GET",
            query: { email }
        });
        return data.emails ?? [];
    }

    /**
     * 获取单封邮件详情。
     */
    async getEmailDetail(id: string): Promise<EmailDetail> {
        if (!id) {
            throw new Error("邮件 ID 不能为空");
        }
        return this.request<EmailDetail>(`/api/email/${encodeURIComponent(id)}`, {
            method: "GET"
        });
    }

    /**
     * 清空指定邮箱的所有邮件。
     */
    async clearInbox(email: string): Promise<number> {
        const data = await this.request<{ message: string; count?: number }>("/api/emails/clear", {
            method: "DELETE",
            query: { email }
        });
        logger.info("已清空邮箱", { email, count: data.count ?? 0 });
        return data.count ?? 0;
    }

    /**
     * 轮询等待邮件到达，并返回匹配的邮件详情。
     */
    async waitForEmail(options: WaitForEmailOptions): Promise<EmailDetail> {
        const pollInterval = options.pollIntervalMs ?? this.defaultPollIntervalMs;
        const timeout = options.timeoutMs ?? this.defaultTimeoutMs;
        const deadline = Date.now() + timeout;
        logger.info("开始轮询临时邮箱", { email: options.email, timeout, pollInterval });

        while (Date.now() < deadline) {
            const emails = await this.getEmails(options.email);
            const ordered = options.newestFirst ? emails : emails.slice().reverse();
            const match = options.filter ? ordered.find(options.filter) : ordered[0];
            if (match) {
                logger.info("已捕获邮件", { id: match.id, subject: match.subject });
                return await this.getEmailDetail(match.id);
            }
            await sleep(pollInterval);
        }

        throw new Error(`在 ${timeout}ms 内未收到匹配邮件`);
    }

    private async request<T>(
        path: string,
        init: {
            method?: string;
            body?: string;
            query?: Record<string, string | undefined>;
        }
    ): Promise<T> {
        const url = this.buildUrl(path, init.query);
        const headers: Record<string, string> = {
            "content-type": "application/json",
            accept: "application/json",
            "x-api-key": this.apiKey
        };
        const dispatcher = this.proxyManager?.getDispatcher();
        const response = await fetch(url, {
            method: init.method ?? "GET",
            headers,
            body: init.body,
            dispatcher
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`GPTMail API 请求失败: ${response.status} ${response.statusText} - ${text}`);
        }

        const payload = (await response.json()) as GPTMailResponse<T>;
        if (!payload.success) {
            throw new Error(payload.error || "GPTMail API 返回失败");
        }
        return payload.data;
    }

    private buildUrl(path: string, query?: Record<string, string | undefined>): string {
        const url = new URL(path.startsWith("/") ? path : `/${path}`, this.baseUrl);
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (typeof value !== "undefined" && value !== null) {
                    url.searchParams.set(key, value);
                }
            });
        }
        return url.toString();
    }
}

