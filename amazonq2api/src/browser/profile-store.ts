import fs from "fs-extra";
import path from "path";
import { BrowserProfile, createProfile, createProfileForAccount } from "./profile.js";
import { logger } from "../utils/logger.js";

/**
 * Profile 存储管理器
 * 负责持久化保存和加载浏览器指纹 Profile
 */
export class ProfileStore {
    private readonly storePath: string;
    private profiles: Map<string, BrowserProfile> = new Map();
    private emailIndex: Map<string, string> = new Map(); // email -> profileId
    private loaded = false;

    constructor(storePath?: string) {
        this.storePath = storePath ?? path.resolve(process.cwd(), "output/profiles.json");
    }

    /**
     * 加载已保存的 profiles
     */
    async load(): Promise<void> {
        if (this.loaded) return;
        
        try {
            if (await fs.pathExists(this.storePath)) {
                const data = await fs.readJson(this.storePath);
                if (Array.isArray(data.profiles)) {
                    for (const profile of data.profiles) {
                        this.profiles.set(profile.id, profile);
                        if (profile.accountEmail) {
                            this.emailIndex.set(profile.accountEmail, profile.id);
                        }
                    }
                    logger.info("已加载浏览器 profiles", { count: this.profiles.size });
                }
            }
        } catch (error) {
            logger.warn("加载 profiles 失败，将使用空存储", { error });
        }
        
        this.loaded = true;
    }

    /**
     * 保存 profiles 到磁盘
     */
    async save(): Promise<void> {
        await fs.ensureDir(path.dirname(this.storePath));
        const data = {
            version: 1,
            updatedAt: new Date().toISOString(),
            profiles: Array.from(this.profiles.values())
        };
        await fs.writeJson(this.storePath, data, { spaces: 2 });
        logger.debug("Profiles 已保存", { count: this.profiles.size });
    }

    /**
     * 获取所有 profiles
     */
    getAll(): BrowserProfile[] {
        return Array.from(this.profiles.values());
    }

    /**
     * 根据 ID 获取 profile
     */
    getById(id: string): BrowserProfile | undefined {
        return this.profiles.get(id);
    }

    /**
     * 根据邮箱获取关联的 profile
     */
    getByEmail(email: string): BrowserProfile | undefined {
        const id = this.emailIndex.get(email);
        return id ? this.profiles.get(id) : undefined;
    }

    /**
     * 获取或创建账号关联的 profile
     * 同一邮箱始终返回相同的指纹配置
     */
    async getOrCreateForAccount(email: string): Promise<BrowserProfile> {
        await this.load();
        
        let profile = this.getByEmail(email);
        if (profile) {
            // 更新最后使用时间
            profile.lastUsedAt = new Date().toISOString();
            await this.save();
            logger.debug("复用已有 profile", { email, profileId: profile.id });
            return profile;
        }
        
        // 创建新的 profile
        profile = createProfileForAccount(email);
        this.profiles.set(profile.id, profile);
        this.emailIndex.set(email, profile.id);
        await this.save();
        
        logger.info("已为账号创建新 profile", { email, profileId: profile.id });
        return profile;
    }

    /**
     * 创建新的随机 profile（不关联账号）
     */
    async createRandom(name?: string): Promise<BrowserProfile> {
        await this.load();
        
        const profile = createProfile(name);
        this.profiles.set(profile.id, profile);
        await this.save();
        
        logger.info("已创建随机 profile", { profileId: profile.id, name: profile.name });
        return profile;
    }

    /**
     * 删除 profile
     */
    async delete(id: string): Promise<boolean> {
        await this.load();
        
        const profile = this.profiles.get(id);
        if (!profile) return false;
        
        this.profiles.delete(id);
        if (profile.accountEmail) {
            this.emailIndex.delete(profile.accountEmail);
        }
        await this.save();
        
        logger.info("已删除 profile", { profileId: id });
        return true;
    }

    /**
     * 关联 profile 到账号
     */
    async linkToAccount(profileId: string, email: string): Promise<void> {
        await this.load();
        
        const profile = this.profiles.get(profileId);
        if (!profile) {
            throw new Error(`Profile not found: ${profileId}`);
        }
        
        // 移除旧的邮箱索引
        if (profile.accountEmail) {
            this.emailIndex.delete(profile.accountEmail);
        }
        
        profile.accountEmail = email;
        this.emailIndex.set(email, profileId);
        await this.save();
        
        logger.info("已关联 profile 到账号", { profileId, email });
    }

    /**
     * 获取统计信息
     */
    getStats(): { total: number; linkedToAccounts: number } {
        return {
            total: this.profiles.size,
            linkedToAccounts: this.emailIndex.size
        };
    }
}

// 全局单例
let defaultStore: ProfileStore | null = null;

/**
 * 获取默认的 ProfileStore 实例
 */
export function getDefaultProfileStore(): ProfileStore {
    if (!defaultStore) {
        defaultStore = new ProfileStore();
    }
    return defaultStore;
}

