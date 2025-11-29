import { Dispatcher, ProxyAgent } from "undici";
import { ProxyConfig } from "../types/index.js";

/**
 * 代理管理器，支持轮询使用多个代理。
 */
export class ProxyManager {
    private readonly proxies: string[] = [];
    private index = 0;

    constructor(config?: ProxyConfig) {
        if (config?.rotateList) {
            this.addProxies(config.rotateList);
        }
        if (config?.httpProxy) {
            this.addProxies([config.httpProxy]);
        }
    }

    /**
     * 添加代理列表。
     */
    addProxies(list: string[]): void {
        const cleaned = list.map((item) => item.trim()).filter((item) => item.length > 0);
        this.proxies.push(...cleaned);
    }

    /**
     * 获取下一个代理地址，轮询方式返回。
     */
    getNextProxy(): string | undefined {
        if (this.proxies.length === 0) {
            return undefined;
        }
        const proxy = this.proxies[this.index % this.proxies.length];
        this.index = (this.index + 1) % this.proxies.length;
        return proxy;
    }

    /**
     * 返回 undici ProxyAgent，用于 HTTP 请求。
     */
    getDispatcher(): Dispatcher | undefined {
        const proxy = this.getNextProxy();
        if (!proxy) {
            return undefined;
        }
        return new ProxyAgent(proxy);
    }

    /**
     * 基于环境变量初始化代理管理器。
     */
    static fromEnv(): ProxyManager {
        const envList = process.env.PROXY_LIST ?? "";
        const httpProxy = process.env.HTTP_PROXY ?? process.env.http_proxy;
        const list = envList
            .split(/[,\n]/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        return new ProxyManager({
            httpProxy: httpProxy && httpProxy.length > 0 ? httpProxy : undefined,
            rotateList: list.length > 0 ? list : undefined
        });
    }
}
