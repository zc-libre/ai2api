import crypto from "crypto";

/**
 * 浏览器指纹配置
 */
export interface BrowserFingerprint {
    // 基础配置
    userAgent: string;
    platform: string;
    vendor: string;
    language: string;
    languages: string[];
    timezone: string;
    timezoneOffset: number;
    
    // 屏幕配置
    screenWidth: number;
    screenHeight: number;
    availWidth: number;
    availHeight: number;
    colorDepth: number;
    pixelDepth: number;
    devicePixelRatio: number;
    
    // 硬件配置
    hardwareConcurrency: number;
    deviceMemory: number;
    maxTouchPoints: number;
    
    // Canvas 指纹噪声种子
    canvasNoiseSeed: number;
    
    // WebGL 配置
    webglVendor: string;
    webglRenderer: string;
    
    // 音频指纹噪声种子
    audioNoiseSeed: number;
    
    // 字体列表
    fonts: string[];
}

/**
 * 浏览器 Profile（包含指纹和元数据）
 */
export interface BrowserProfile {
    id: string;
    name: string;
    fingerprint: BrowserFingerprint;
    createdAt: string;
    lastUsedAt?: string;
    // 关联的账号信息（可选）
    accountEmail?: string;
}

// 常见的 User-Agent 列表（Windows Chrome）
const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
];

// 常见屏幕分辨率
const SCREEN_RESOLUTIONS = [
    { width: 1920, height: 1080 },
    { width: 2560, height: 1440 },
    { width: 1366, height: 768 },
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
    { width: 1680, height: 1050 },
    { width: 2560, height: 1080 },
    { width: 3840, height: 2160 },
];

// 时区配置
const TIMEZONES = [
    { name: "America/New_York", offset: 300 },
    { name: "America/Chicago", offset: 360 },
    { name: "America/Denver", offset: 420 },
    { name: "America/Los_Angeles", offset: 480 },
    { name: "Europe/London", offset: 0 },
    { name: "Europe/Paris", offset: -60 },
    { name: "Europe/Berlin", offset: -60 },
    { name: "Asia/Tokyo", offset: -540 },
    { name: "Asia/Shanghai", offset: -480 },
    { name: "Asia/Singapore", offset: -480 },
];

// WebGL 渲染器配置
const WEBGL_CONFIGS = [
    { vendor: "Google Inc. (NVIDIA)", renderer: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Google Inc. (NVIDIA)", renderer: "ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Google Inc. (NVIDIA)", renderer: "ANGLE (NVIDIA, NVIDIA GeForce GTX 1080 Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Google Inc. (AMD)", renderer: "ANGLE (AMD, AMD Radeon RX 6800 XT Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Google Inc. (Intel)", renderer: "ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Google Inc. (Intel)", renderer: "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0)" },
    { vendor: "Apple Inc.", renderer: "Apple M1" },
    { vendor: "Apple Inc.", renderer: "Apple M2" },
];

// 常见字体列表
const COMMON_FONTS = [
    "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS",
    "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT",
    "Palatino Linotype", "Lucida Console", "Lucida Sans Unicode", "MS Gothic",
    "MS PGothic", "MS UI Gothic", "Segoe UI", "Calibri", "Cambria", "Consolas"
];

/**
 * 从数组中随机选择元素
 */
function randomChoice<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)] as T;
}

/**
 * 随机选择指定数量的元素（不重复）
 */
function randomSample<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * 基于种子生成确定性的指纹（同一账号每次使用相同指纹）
 */
export function generateFingerprintFromSeed(seed: string): BrowserFingerprint {
    // 使用 seed 创建确定性随机数生成器
    const hash = crypto.createHash("sha256").update(seed).digest();
    let idx = 0;
    const nextByte = () => hash[idx++ % hash.length]!;
    const nextFloat = () => nextByte() / 256;
    const nextInt = (max: number) => Math.floor(nextFloat() * max);
    
    const userAgent = USER_AGENTS[nextInt(USER_AGENTS.length)]!;
    const resolution = SCREEN_RESOLUTIONS[nextInt(SCREEN_RESOLUTIONS.length)]!;
    const timezone = TIMEZONES[nextInt(TIMEZONES.length)]!;
    const webgl = WEBGL_CONFIGS[nextInt(WEBGL_CONFIGS.length)]!;
    
    // 根据 UA 确定平台
    let platform = "Win32";
    if (userAgent.includes("Macintosh")) {
        platform = "MacIntel";
    } else if (userAgent.includes("Linux")) {
        platform = "Linux x86_64";
    }
    
    // 字体列表（基础字体 + 随机字体）
    const baseFonts = COMMON_FONTS.slice(0, 10);
    const extraFonts = randomSample(COMMON_FONTS.slice(10), 3 + nextInt(5));
    
    // 硬件配置选项
    const hardwareCores = [4, 8, 12, 16] as const;
    const memoryOptions = [4, 8, 16, 32] as const;
    
    return {
        userAgent,
        platform,
        vendor: "Google Inc.",
        language: "en-US",
        languages: ["en-US", "en"],
        timezone: timezone.name,
        timezoneOffset: timezone.offset,
        
        screenWidth: resolution.width,
        screenHeight: resolution.height,
        availWidth: resolution.width,
        availHeight: resolution.height - 40 - nextInt(40), // 减去任务栏高度
        colorDepth: 24,
        pixelDepth: 24,
        devicePixelRatio: nextFloat() > 0.7 ? 2 : 1,
        
        hardwareConcurrency: hardwareCores[nextInt(4)]!,
        deviceMemory: memoryOptions[nextInt(4)]!,
        maxTouchPoints: 0,
        
        canvasNoiseSeed: nextInt(1000000),
        
        webglVendor: webgl.vendor,
        webglRenderer: webgl.renderer,
        
        audioNoiseSeed: nextInt(1000000),
        
        fonts: [...baseFonts, ...extraFonts]
    };
}

/**
 * 生成完全随机的浏览器指纹
 */
export function generateRandomFingerprint(): BrowserFingerprint {
    const seed = crypto.randomBytes(32).toString("hex");
    return generateFingerprintFromSeed(seed);
}

/**
 * 创建新的浏览器 Profile
 */
export function createProfile(name?: string, seed?: string): BrowserProfile {
    const id = crypto.randomUUID();
    const fingerprint = seed ? generateFingerprintFromSeed(seed) : generateRandomFingerprint();
    
    return {
        id,
        name: name ?? `Profile-${id.slice(0, 8)}`,
        fingerprint,
        createdAt: new Date().toISOString()
    };
}

/**
 * 根据邮箱地址创建关联的 Profile（同一邮箱始终使用相同指纹）
 */
export function createProfileForAccount(email: string): BrowserProfile {
    const profile = createProfile(`Profile-${email}`, email);
    profile.accountEmail = email;
    return profile;
}

