import fs from "fs";
import path from "path";
import { AccountRecord } from "../types/index.js";
import { logger } from "../utils/logger.js";

/**
 * 基于 NDJSON 的简单文件存储器，支持原子追加写。
 */
export class FileStore {
    private readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    /**
     * 追加写入一条账号记录。
     */
    async append(record: AccountRecord): Promise<AccountRecord> {
        await this.ensureDir();
        const line = `${JSON.stringify(record)}\n`;
        const handle = await fs.promises.open(this.filePath, "a");
        try {
            await handle.appendFile(line, { encoding: "utf8" });
            logger.info("账号记录已写入", { file: this.filePath });
            return record;
        } finally {
            await handle.close();
        }
    }

    /**
     * 读取全部账号记录。
     */
    async readAll(): Promise<AccountRecord[]> {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        const content = await fs.promises.readFile(this.filePath, "utf8");
        return content
            .split(/\r?\n/)
            .filter((line) => line.trim().length > 0)
            .map((line) => JSON.parse(line) as AccountRecord);
    }

    private async ensureDir(): Promise<void> {
        const dir = path.dirname(this.filePath);
        await fs.promises.mkdir(dir, { recursive: true });
    }
}
