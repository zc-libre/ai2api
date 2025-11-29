/**
 * GPTMail API 响应的统一结构。
 */
export interface GPTMailResponse<T> {
    success: boolean;
    data: T;
    error: string;
}

/**
 * 生成邮箱返回的数据结构。
 */
export interface GenerateEmailData {
    email: string;
}

/**
 * 邮件列表接口返回的数据结构。
 */
export interface EmailListData {
    emails: EmailSummary[];
    count: number;
}

/**
 * 邮件摘要信息。
 */
export interface EmailSummary {
    id: string;
    email_address: string;
    from_address: string;
    subject: string;
    content?: string;
    html_content?: string;
    has_html: boolean;
    timestamp: number;
    created_at: string;
}

/**
 * 单封邮件的详细信息，包含原文与头信息。
 */
export interface EmailDetail extends EmailSummary {
    raw_content?: string;
    headers?: Record<string, string>;
    raw_size?: number;
}

/**
 * 等待邮件时的轮询配置。
 */
export interface MailWaitOptions {
    pollIntervalMs?: number;
    timeoutMs?: number;
}

