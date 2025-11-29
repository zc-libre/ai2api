import { RetryOptions } from "../types/index.js";
import { logger } from "./logger.js";

/**
 * 延迟指定毫秒数。
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 带指数退避的重试包装器。
 */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
    let attempt = 0;
    let delay = options.baseDelayMs;
    let lastError: unknown;
    const backoff = options.backoffFactor ?? 1;

    while (attempt <= options.maxRetries) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === options.maxRetries) {
                break;
            }
            const wait = Math.min(delay, options.maxDelayMs ?? delay);
            logger.warn(`第 ${attempt + 1} 次尝试失败，${wait}ms 后重试`, {
                error: error instanceof Error ? error.message : String(error)
            });
            await sleep(wait);
            delay = Math.floor(delay * backoff);
            attempt += 1;
        }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
