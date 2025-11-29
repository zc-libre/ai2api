import { LogLevel } from "../types/index.js";

const LEVEL_WEIGHT: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};

/**
 * 简单的分级日志记录器，支持环境变量 LOG_LEVEL 控制输出级别。
 */
export class Logger {
    private readonly level: LogLevel;

    constructor(level?: LogLevel | string) {
        const envLevel = (level ?? process.env.LOG_LEVEL ?? "info").toString();
        this.level = this.parseLevel(envLevel);
    }

    /**
     * 输出 debug 级日志。
     */
    debug(message: string, context?: unknown): void {
        this.print("debug", message, context);
    }

    /**
     * 输出 info 级日志。
     */
    info(message: string, context?: unknown): void {
        this.print("info", message, context);
    }

    /**
     * 输出 warn 级日志。
     */
    warn(message: string, context?: unknown): void {
        this.print("warn", message, context);
    }

    /**
     * 输出 error 级日志。
     */
    error(message: string, context?: unknown): void {
        this.print("error", message, context);
    }

    private print(level: LogLevel, message: string, context?: unknown): void {
        if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[this.level]) {
            return;
        }
        const timestamp = new Date().toISOString();
        const parts: string[] = [timestamp, level.toUpperCase(), message];
        if (typeof context !== "undefined") {
            parts.push(JSON.stringify(context, null, 2));
        }
        // eslint-disable-next-line no-console
        console.log(parts.join(" | "));
    }

    private parseLevel(input: string): LogLevel {
        if (input === "debug" || input === "info" || input === "warn" || input === "error") {
            return input;
        }
        return "info";
    }
}

/**
 * 创建一个默认日志实例，便于快速使用。
 */
export const logger = new Logger();
