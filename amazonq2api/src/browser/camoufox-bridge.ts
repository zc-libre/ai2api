/**
 * Camoufox Python 桥接器
 * 通过子进程调用 Python Camoufox 脚本完成登录/注册
 */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { AWSCredentials } from "../types/index.js";
import { logger } from "../utils/logger.js";
import { GPTMailConfig } from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CamoufoxOptions {
    /** 是否无头模式 */
    headless?: boolean;
    /** 代理服务器 */
    proxy?: string;
    /** Python 可执行文件路径（默认使用 camoufox/.venv/bin/python） */
    pythonPath?: string;
    /** 超时时间（毫秒） */
    timeoutMs?: number;
}

export interface CamoufoxRegistrationOptions extends CamoufoxOptions {
    /** GPTMail 配置 */
    gptmail: GPTMailConfig;
    /** 密码 */
    password: string;
    /** 显示名称 */
    fullName?: string;
}

export interface CamoufoxResult {
    success: boolean;
    message: string;
    errorCode?: string;
    /** 注册成功时返回的邮箱 */
    email?: string;
    /** 注册成功时返回的密码 */
    password?: string;
}

/**
 * 使用 Camoufox 完成设备授权登录
 */
export async function loginWithCamoufox(
    verificationUrl: string,
    credentials: AWSCredentials,
    options?: CamoufoxOptions
): Promise<CamoufoxResult> {
    const camoufoxDir = path.resolve(__dirname, "../../camoufox");
    const scriptPath = path.join(camoufoxDir, "login_handler.py");
    const defaultPythonPath = path.join(camoufoxDir, ".venv/bin/python");
    
    const pythonPath = options?.pythonPath ?? defaultPythonPath;
    const timeoutMs = options?.timeoutMs ?? 120_000;
    
    const args = [
        scriptPath,
        "--url", verificationUrl,
        "--email", credentials.email,
        "--password", credentials.password,
        "--json"
    ];
    
    if (credentials.mfaSecret) {
        args.push("--mfa-secret", credentials.mfaSecret);
    }
    
    if (options?.headless) {
        args.push("--headless");
    }
    
    if (options?.proxy) {
        args.push("--proxy", options.proxy);
    }
    
    logger.info("启动 Camoufox 登录", { 
        verificationUrl: verificationUrl.slice(0, 50) + "...",
        email: credentials.email 
    });
    
    return new Promise((resolve, reject) => {
        const process = spawn(pythonPath, args, {
            cwd: camoufoxDir,
            env: { 
                ...globalThis.process.env,
                PYTHONUNBUFFERED: "1"  // 实时输出
            }
        });
        
        let stdout = "";
        let stderr = "";
        
        const timeout = setTimeout(() => {
            process.kill("SIGTERM");
            reject(new Error(`Camoufox 登录超时 (${timeoutMs}ms)`));
        }, timeoutMs);
        
        process.stdout.on("data", (data) => {
            const text = data.toString();
            stdout += text;
            // 实时输出日志（过滤 JSON）
            for (const line of text.split("\n")) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith("{")) {
                    logger.info("[Camoufox]", { output: trimmed });
                }
            }
        });
        
        process.stderr.on("data", (data) => {
            stderr += data.toString();
            logger.warn("[Camoufox stderr]", { output: data.toString().trim() });
        });
        
        process.on("close", (code) => {
            clearTimeout(timeout);
            
            // 尝试解析 JSON 输出
            try {
                // 从 stdout 中提取 JSON（最后一行）
                const lines = stdout.trim().split("\n");
                const jsonLine = lines.find(line => line.trim().startsWith("{"));
                
                if (jsonLine) {
                    const result = JSON.parse(jsonLine) as CamoufoxResult;
                    logger.info("Camoufox 登录完成", { 
                        success: result.success, 
                        message: result.message 
                    });
                    resolve(result);
                    return;
                }
            } catch (e) {
                // JSON 解析失败，使用退出码判断
            }
            
            if (code === 0) {
                resolve({
                    success: true,
                    message: "登录成功"
                });
            } else {
                resolve({
                    success: false,
                    message: stderr || stdout || `进程退出码: ${code}`,
                    errorCode: "PROCESS_EXIT"
                });
            }
        });
        
        process.on("error", (error) => {
            clearTimeout(timeout);
            
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                reject(new Error(
                    `未找到 Python 环境，请先运行: cd camoufox && bash setup.sh`
                ));
            } else {
                reject(error);
            }
        });
    });
}

/**
 * 使用 Camoufox 完成设备授权注册
 */
export async function registerWithCamoufox(
    verificationUrl: string,
    options: CamoufoxRegistrationOptions
): Promise<CamoufoxResult> {
    const camoufoxDir = path.resolve(__dirname, "../../camoufox");
    const scriptPath = path.join(camoufoxDir, "login_handler.py");
    const defaultPythonPath = path.join(camoufoxDir, ".venv/bin/python");
    
    const pythonPath = options.pythonPath ?? defaultPythonPath;
    const timeoutMs = options.timeoutMs ?? 300_000; // 注册流程需要 5 分钟
    
    const args = [
        scriptPath,
        "--url", verificationUrl,
        "--mode", "register",
        "--password", options.password,
        "--gptmail-url", options.gptmail.baseUrl,
        "--gptmail-key", options.gptmail.apiKey,
        "--json"
    ];
    
    if (options.gptmail.emailPrefix) {
        args.push("--email-prefix", options.gptmail.emailPrefix);
    }
    
    if (options.gptmail.emailDomain) {
        args.push("--email-domain", options.gptmail.emailDomain);
    }
    
    if (options.fullName) {
        args.push("--full-name", options.fullName);
    }
    
    if (options.headless) {
        args.push("--headless");
    }
    
    if (options.proxy) {
        args.push("--proxy", options.proxy);
    }
    
    logger.info("启动 Camoufox 注册", { verificationUrl: verificationUrl.slice(0, 50) + "..." });
    
    return new Promise((resolve, reject) => {
        const process = spawn(pythonPath, args, {
            cwd: camoufoxDir,
            env: { 
                ...globalThis.process.env,
                PYTHONUNBUFFERED: "1"  // 实时输出
            }
        });
        
        let stdout = "";
        let stderr = "";
        
        const timeout = setTimeout(() => {
            process.kill("SIGTERM");
            reject(new Error(`Camoufox 注册超时 (${timeoutMs}ms)`));
        }, timeoutMs);
        
        process.stdout.on("data", (data) => {
            const text = data.toString();
            stdout += text;
            // 实时输出日志
            for (const line of text.split("\n")) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith("{")) {
                    logger.info("[Camoufox]", { output: trimmed });
                }
            }
        });
        
        process.stderr.on("data", (data) => {
            stderr += data.toString();
            logger.warn("[Camoufox stderr]", { output: data.toString().trim() });
        });
        
        process.on("close", (code) => {
            clearTimeout(timeout);
            
            try {
                const lines = stdout.trim().split("\n");
                const jsonLine = lines.find(line => line.trim().startsWith("{"));
                
                if (jsonLine) {
                    const result = JSON.parse(jsonLine) as CamoufoxResult;
                    logger.info("Camoufox 注册完成", { 
                        success: result.success, 
                        message: result.message,
                        email: result.email
                    });
                    resolve(result);
                    return;
                }
            } catch (e) {
                // JSON 解析失败
            }
            
            if (code === 0) {
                resolve({ success: true, message: "注册成功" });
            } else {
                resolve({
                    success: false,
                    message: stderr || stdout || `进程退出码: ${code}`,
                    errorCode: "PROCESS_EXIT"
                });
            }
        });
        
        process.on("error", (error) => {
            clearTimeout(timeout);
            
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                reject(new Error(`未找到 Python 环境，请先运行: cd camoufox && bash setup.sh`));
            } else {
                reject(error);
            }
        });
    });
}

/**
 * 检查 Camoufox 环境是否已安装
 */
export async function checkCamoufoxInstalled(): Promise<boolean> {
    const camoufoxDir = path.resolve(__dirname, "../../camoufox");
    const pythonPath = path.join(camoufoxDir, ".venv/bin/python");
    
    return new Promise((resolve) => {
        const process = spawn(pythonPath, ["-c", "from camoufox.sync_api import Camoufox; print('ok')"], {
            cwd: camoufoxDir
        });
        
        process.on("close", (code) => {
            resolve(code === 0);
        });
        
        process.on("error", () => {
            resolve(false);
        });
    });
}

