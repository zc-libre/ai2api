import { EmailDetail } from "./types.js";

export interface VerificationResult {
    code?: string;
    link?: string;
    source?: "text" | "html";
}

const CODE_PATTERNS: RegExp[] = [
    /\b(\d{6})\b/g, // 常见 6 位数字验证码
    /\b(\d{4,8})\b/g, // 退化匹配 4-8 位数字
    /code[:：]?\s*(\d{4,8})/gi,
    /验证码[:：]?\s*(\d{4,8})/g
];

const LINK_PATTERNS: RegExp[] = [
    /(https?:\/\/[^\s">]+verify[^\s">]*)/gi,
    /(https?:\/\/[^\s">]+confirmation[^\s">]*)/gi
];

/**
 * 从邮件详情解析验证码或验证链接。
 */
export function parseVerificationEmail(detail: EmailDetail): VerificationResult | null {
    const textContent = detail.content ?? stripHtml(detail.html_content ?? "");
    const htmlContent = detail.html_content;

    const textResult = extractFromText(textContent);
    if (textResult) {
        return { ...textResult, source: "text" };
    }

    if (htmlContent) {
        const htmlResult = extractFromText(stripHtml(htmlContent));
        if (htmlResult) {
            return { ...htmlResult, source: "html" };
        }
        const link = extractLink(htmlContent);
        if (link) {
            return { link, source: "html" };
        }
    }

    return null;
}

function extractFromText(text: string): Omit<VerificationResult, "source"> | null {
    if (!text) {
        return null;
    }
    for (const pattern of CODE_PATTERNS) {
        pattern.lastIndex = 0;
        const match = pattern.exec(text);
        if (match?.[1]) {
            return { code: match[1] };
        }
    }
    const link = extractLink(text);
    if (link) {
        return { link };
    }
    return null;
}

function extractLink(input: string): string | undefined {
    for (const pattern of LINK_PATTERNS) {
        pattern.lastIndex = 0;
        const match = pattern.exec(input);
        if (match?.[1]) {
            return match[1];
        }
    }
    return undefined;
}

function stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

