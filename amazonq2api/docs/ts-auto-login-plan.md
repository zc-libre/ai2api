# Amazon Q 全自动注册登录 TypeScript 实现计划

## 📋 项目概述

使用 TypeScript 实现 Amazon Q 账号的全自动注册和登录流程，无需人工干预，自动完成从注册到获取 Token 的全部过程。

## 🎯 目标

- 全自动化 AWS OIDC 设备授权流程
- 使用 Playwright 自动化浏览器完成用户授权
- 支持批量账号注册
- 自动保存和管理 Token

---

## 🔧 技术栈

| 组件 | 技术选型 | 说明 |
|------|---------|------|
| 运行时 | Node.js 18+ / Bun | 推荐使用 Bun 获得更好性能 |
| 语言 | TypeScript 5.x | 类型安全 |
| HTTP 客户端 | undici / node-fetch | 高性能 HTTP 请求 |
| 浏览器自动化 | Playwright | 自动完成 AWS 登录授权 |
| 数据存储 | 本地文件（JSON/NDJSON） | 直接写入文件，避免依赖 Python 服务 |
| 配置管理 | dotenv | 环境变量管理 |

---

## 📁 项目结构

```
amazonq-ts-auto-login/
├── src/
│   ├── index.ts                 # 入口文件
│   ├── config.ts                # 配置管理
│   ├── oidc/
│   │   ├── client.ts            # OIDC 客户端注册
│   │   ├── device-auth.ts       # 设备授权
│   │   ├── token.ts             # Token 获取与刷新
│   │   └── types.ts             # OIDC 类型定义
│   ├── browser/
│   │   ├── automation.ts        # 浏览器自动化主逻辑
│   │   ├── login-handler.ts     # AWS 登录处理
│   │   └── captcha-solver.ts    # 验证码处理（可选）
│   ├── storage/
│   │   ├── file-store.ts        # 账号文件写入/读取
│   │   └── formats.ts           # JSON/NDJSON 序列化与校验
│   ├── utils/
│   │   ├── logger.ts            # 日志工具
│   │   ├── retry.ts             # 重试机制
│   │   └── proxy.ts             # 代理管理
│   └── types/
│       └── index.ts             # 全局类型定义
├── tests/
│   └── ...
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔐 核心流程实现

### 阶段 1: OIDC 客户端注册

```typescript
// src/oidc/client.ts

interface OIDCClientCredentials {
  clientId: string;
  clientSecret: string;
  clientSecretExpiresAt: number;
}

const OIDC_BASE = "https://oidc.us-east-1.amazonaws.com";
const REGISTER_URL = `${OIDC_BASE}/client/register`;

function makeOIDCHeaders(): Record<string, string> {
  // 与 python/auth_flow.py 的 make_headers 完全对齐，确保 AWS 不拒绝请求
  return {
    "content-type": "application/json",
    "user-agent": "aws-sdk-rust/1.3.9 os/windows lang/rust/1.87.0",
    "x-amz-user-agent":
      "aws-sdk-rust/1.3.9 ua/2.1 api/ssooidc/1.88.0 os/windows lang/rust/1.87.0 m/E app/AmazonQ-For-CLI",
    "amz-sdk-request": "attempt=1; max=3",
    "amz-sdk-invocation-id": crypto.randomUUID(),
  };
}

async function registerClient(): Promise<OIDCClientCredentials> {
  const payload = {
    clientName: "Amazon Q Developer for command line",
    clientType: "public",
    scopes: [
      "codewhisperer:completions",
      "codewhisperer:analysis",
      "codewhisperer:conversations",
    ],
  };

  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: makeOIDCHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Client registration failed: ${response.status}`);
  }

  return response.json();
}
```

### 阶段 2: 设备授权

```typescript
// src/oidc/device-auth.ts

interface DeviceAuthResponse {
  deviceCode: string;
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string;  // 关键：用户需要访问的完整 URL
  expiresIn: number;
  interval: number;
}

const DEVICE_AUTH_URL = `${OIDC_BASE}/device_authorization`;
const START_URL = "https://view.awsapps.com/start";

async function startDeviceAuthorization(
  clientId: string,
  clientSecret: string
): Promise<DeviceAuthResponse> {
  const payload = {
    clientId,
    clientSecret,
    startUrl: START_URL,
  };

  const response = await fetch(DEVICE_AUTH_URL, {
    method: "POST",
    headers: makeOIDCHeaders(),
    body: JSON.stringify(payload),
  });

  return response.json();
}
```

### 阶段 3: 浏览器自动化授权（核心）

```typescript
// src/browser/automation.ts

import { chromium, Browser, Page } from "playwright";

interface AWSCredentials {
  email: string;
  password: string;
  mfaSecret?: string;  // 可选：TOTP MFA 密钥
}

class BrowserAutomation {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init(options?: { headless?: boolean; proxy?: string }) {
    this.browser = await chromium.launch({
      headless: options?.headless ?? true,
      proxy: options?.proxy ? { server: options.proxy } : undefined,
    });
    
    const context = await this.browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    });
    
    this.page = await context.newPage();
  }

  async authorizeDevice(
    verificationUrl: string,
    credentials: AWSCredentials
  ): Promise<boolean> {
    if (!this.page) throw new Error("Browser not initialized");

    // 1. 访问授权 URL
    await this.page.goto(verificationUrl);

    // 2. 等待并处理 AWS 登录页面
    await this.handleAWSLogin(credentials);

    // 3. 确认设备授权
    await this.confirmAuthorization();

    return true;
  }

  private async handleAWSLogin(credentials: AWSCredentials) {
    // 等待登录表单加载
    await this.page!.waitForSelector('input[type="email"], input[name="email"]', {
      timeout: 10000,
    });

    // 输入邮箱
    await this.page!.fill('input[type="email"], input[name="email"]', credentials.email);
    await this.page!.click('button[type="submit"], input[type="submit"]');

    // 等待密码输入框
    await this.page!.waitForSelector('input[type="password"]', { timeout: 10000 });
    await this.page!.fill('input[type="password"]', credentials.password);
    await this.page!.click('button[type="submit"], input[type="submit"]');

    // 处理 MFA（如果启用）
    if (credentials.mfaSecret) {
      await this.handleMFA(credentials.mfaSecret);
    }

    // 等待登录完成
    await this.page!.waitForNavigation({ timeout: 30000 });
  }

  private async handleMFA(mfaSecret: string) {
    // 使用 otplib 生成 TOTP
    const { authenticator } = await import("otplib");
    const token = authenticator.generate(mfaSecret);

    await this.page!.waitForSelector('input[name="mfaCode"], input[type="text"]');
    await this.page!.fill('input[name="mfaCode"], input[type="text"]', token);
    await this.page!.click('button[type="submit"]');
  }

  private async confirmAuthorization() {
    // AWS 现阶段通常在登录后自动完成授权，没有“Allow”按钮。
    // 这里先监听 URL / 文案变化，如未来 UI 调整，再尝试点击按钮。
    const allowButton = this.page!.locator('button:has-text("Allow"), button:has-text("Confirm")');

    try {
      await Promise.race([
        this.page!.waitForURL(/device\/success|device\/complete|start#/i, { timeout: 15000 }),
        allowButton.waitFor({ timeout: 15000 }),
      ]);
    } catch (_) {
      // 如果都没出现，仍继续，后续轮询如果拿到 token 就算成功
    }

    if (await allowButton.isVisible()) {
      await allowButton.click();
      await this.page!.waitForURL(/device\/success|device\/complete|start#/i, { timeout: 15000 });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
```

### 阶段 4: Token 轮询

```typescript
// src/oidc/token.ts

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

const TOKEN_URL = `${OIDC_BASE}/token`;

async function pollForTokens(
  clientId: string,
  clientSecret: string,
  deviceCode: string,
  interval: number,
  expiresIn: number
): Promise<TokenResponse> {
  const payload = {
    clientId,
    clientSecret,
    deviceCode,
    grantType: "urn:ietf:params:oauth:grant-type:device_code",
  };

  const deadline = Date.now() + expiresIn * 1000;
  const pollInterval = Math.max(1, interval) * 1000;

  while (Date.now() < deadline) {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: makeOIDCHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    }

    if (response.status === 400) {
      const error = await response.json();
      if (error.error === "authorization_pending") {
        await sleep(pollInterval);
        continue;
      }
      throw new Error(`Token error: ${error.error}`);
    }

    throw new Error(`Unexpected status: ${response.status}`);
  }

  throw new Error("Authorization timeout");
}
```

### 阶段 5: 完整自动化流程

```typescript
// src/index.ts

interface AutoLoginOptions {
  credentials: AWSCredentials;
  headless?: boolean;
  proxy?: string;
  maxRetries?: number;
}

async function autoRegisterAndLogin(options: AutoLoginOptions): Promise<Account> {
  const { credentials, headless = true, proxy, maxRetries = 3 } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const browser = new BrowserAutomation();

    try {
      console.log(`[${attempt}/${maxRetries}] 开始自动注册登录...`);

      // Step 1: 注册 OIDC 客户端
      console.log("Step 1: 注册 OIDC 客户端...");
      const { clientId, clientSecret } = await registerClient();

      // Step 2: 发起设备授权
      console.log("Step 2: 发起设备授权...");
      const deviceAuth = await startDeviceAuthorization(clientId, clientSecret);

      // Step 3: 初始化浏览器
      console.log("Step 3: 启动浏览器自动化...");
      await browser.init({ headless, proxy });

      // Step 4: 自动完成授权（并行执行）
      console.log("Step 4: 自动完成授权...");
      const [_, tokens] = await Promise.all([
        // 浏览器自动化授权
        browser.authorizeDevice(deviceAuth.verificationUriComplete, credentials),
        // 同时轮询 Token
        pollForTokens(
          clientId,
          clientSecret,
          deviceAuth.deviceCode,
          deviceAuth.interval,
          deviceAuth.expiresIn
        ),
      ]);

      // Step 5: 保存账号信息（写入本地文件）
      console.log("Step 5: 保存账号信息...");
      const account = await fileStore.append({
        clientId,
        clientSecret,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        label: `Auto-${Date.now()}`,
      });

      console.log("✅ 自动注册登录成功！");
      return account;

    } catch (error) {
      lastError = error as Error;
      console.error(`❌ 尝试 ${attempt} 失败:`, error);
    } finally {
      await browser.close();
    }

    // 重试前等待
    if (attempt < maxRetries) {
      await sleep(5000);
    }
  }

  throw lastError || new Error("Auto login failed");
}
```

---

## 🛡️ 注意事项与挑战

### 1. OIDC Header 兼容性

- 所有 `/client/register`、`/device_authorization`、`/token` 请求都必须携带与 `amazonq2api/auth_flow.py` 完全一致的头部，否则 AWS 会拒绝或限流。
- 这些头部包括 `user-agent`、`x-amz-user-agent`、`amz-sdk-request`、`amz-sdk-invocation-id` 等，且 `amz-sdk-invocation-id` 需要每次生成新的 UUID。
- 若未来 Python 侧更新 header，TS 计划也要同步，以免行为不一致。

### 2. 浏览器流程校验

- 目前 AWS 登录完成后通常直接显示 “You are signed in” 或跳回 `view.awsapps.com`，没有 “Allow/Confirm” 按钮；计划里的 Playwright 流程已经通过 `confirmAuthorization()` 兼容“无按钮”场景。
- 在实现前建议录制一次真实登录流程，确认 DOM 结构和跳转 URL；实现中要持续监听 URL/文案，而不是依赖固定按钮。
- 若 AWS 后续新增确认按钮，逻辑也会自动点击（写在 `confirmAuthorization` 中），并记录在日志中。

### 3. 验证码处理

AWS 登录可能出现验证码，需要考虑：

```typescript
// src/browser/captcha-solver.ts

interface CaptchaSolver {
  solve(imageData: Buffer): Promise<string>;
}

// 方案 A: 接入第三方打码平台
class ThirdPartyCaptchaSolver implements CaptchaSolver {
  async solve(imageData: Buffer): Promise<string> {
    // 调用 2Captcha / Anti-Captcha 等服务
  }
}

// 方案 B: 使用 AI 识别（简单验证码）
class AICaptchaSolver implements CaptchaSolver {
  async solve(imageData: Buffer): Promise<string> {
    // 使用 OCR 或 AI 模型识别
  }
}
```

### 4. MFA 处理

```typescript
// 支持 TOTP 自动生成
import { authenticator } from "otplib";

function generateMFAToken(secret: string): string {
  return authenticator.generate(secret);
}
```

### 5. 文件写入策略

为避免并发写入损坏文件，采用 NDJSON 追加方案，并在写入前获取文件锁或使用原子写。建议结构：

```typescript
// src/storage/file-store.ts

const OUTPUT_PATH = path.resolve(process.cwd(), "output/accounts.ndjson");

async function append(record: AccountRecord) {
  const line = JSON.stringify({ ...record, savedAt: new Date().toISOString() });
  await fs.promises.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.promises.appendFile(OUTPUT_PATH, line + "\n", "utf8");
  return record;
}
```

如需 CSV/JSON 双格式，可在 `formats.ts` 中提供转换函数，并在配置中指定输出格式。

### 6. 代理轮换

```typescript
// src/utils/proxy.ts

class ProxyManager {
  private proxies: string[] = [];
  private currentIndex = 0;

  addProxies(proxies: string[]) {
    this.proxies.push(...proxies);
  }

  getNext(): string | undefined {
    if (this.proxies.length === 0) return undefined;
    const proxy = this.proxies[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.proxies.length;
    return proxy;
  }
}
```

### 7. 错误处理与重试

```typescript
// src/utils/retry.ts

async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries: number; delay: number; backoff?: number }
): Promise<T> {
  let lastError: Error | null = null;
  let delay = options.delay;

  for (let i = 0; i < options.maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await sleep(delay);
      delay *= options.backoff ?? 1;
    }
  }

  throw lastError;
}
```

---

## 📦 依赖清单

```json
{
  "dependencies": {
    "playwright": "^1.40.0",
    "undici": "^6.0.0",
    "fs-extra": "^11.2.0",
    "otplib": "^12.0.1",
    "dotenv": "^16.3.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/uuid": "^9.0.0",
    "typescript": "^5.3.0",
    "tsx": "^4.0.0"
  }
}
```

---

## 🚀 实现步骤

### 第一阶段：基础框架（1-2天）

- [ ] 初始化 TypeScript 项目
- [ ] 实现 OIDC 客户端注册
- [ ] 实现设备授权流程
- [ ] 实现 Token 轮询

### 第二阶段：浏览器自动化（2-3天）

- [ ] 集成 Playwright
- [ ] 实现 AWS 登录自动化
- [ ] 处理页面元素定位
- [ ] 处理登录异常情况

### 第三阶段：完善功能（1-2天）

- [ ] 实现 MFA 自动处理
- [ ] 实现代理支持
- [ ] 实现重试机制
- [ ] 文件写入封装（NDJSON/JSON）

### 第四阶段：优化与测试（1-2天）

- [ ] 批量注册支持
- [ ] 并发控制
- [ ] 日志完善
- [ ] 单元测试

---

## 📝 使用示例

```typescript
// 单账号注册
const account = await autoRegisterAndLogin({
  credentials: {
    email: "user@example.com",
    password: "password123",
    mfaSecret: "JBSWY3DPEHPK3PXP",  // 可选
  },
  headless: true,
  proxy: "http://127.0.0.1:7890",
});

console.log("Access Token:", account.accessToken);
console.log("Refresh Token:", account.refreshToken);

// 批量注册
const accounts = [
  { email: "user1@example.com", password: "pass1" },
  { email: "user2@example.com", password: "pass2" },
];

for (const cred of accounts) {
  await autoRegisterAndLogin({ credentials: cred });
  await sleep(5000);  // 间隔避免频率限制
}
```

---

## ⚠️ 风险与合规

1. **账号安全**：确保凭据加密存储，不要明文保存密码
2. **频率限制**：AWS 可能有请求频率限制，建议添加延时
3. **服务条款**：自动化登录可能违反 AWS 服务条款，请谨慎使用
4. **IP 封禁**：建议使用代理轮换避免 IP 被封

---

## 🔗 参考资料

- [AWS SSO OIDC API](https://docs.aws.amazon.com/singlesignon/latest/OIDCAPIReference/Welcome.html)
- [OAuth 2.0 Device Authorization Grant](https://datatracker.ietf.org/doc/html/rfc8628)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [原 Python 实现](../amazonq2api/auth_flow.py)

