# Amazon Q TS 全自动登录

基于 TypeScript 的 Amazon Q OIDC 设备授权与浏览器自动化实现，复刻 `auth_flow.py` 的行为并增加自动化登录、NDJSON 存储与代理轮换能力。

## 快速开始

1. 安装依赖

    ```bash
    npm install
    ```

2. 配置环境变量

    ```bash
    cp .env.example .env
    # 按需填写 AWS_EMAIL / AWS_PASSWORD / AWS_MFA_SECRET / HTTP_PROXY 等
    ```

3. 运行

    ```bash
    npm run start
    ```

4. 输出

    - 成功后会在 `OUTPUT_FILE`（默认 `output/accounts.ndjson`）追加一行账号记录。
    - 日志级别可用 `LOG_LEVEL` 控制（debug|info|warn|error）。

## 设计要点

- **头部一致性**：所有 OIDC 请求使用与 `auth_flow.py` 完全一致的 `user-agent`、`x-amz-user-agent`、`amz-sdk-request`、`amz-sdk-invocation-id`。
- **并行授权**：浏览器自动化与 Token 轮询通过 `Promise.race` 并行，尽早发现失败。
- **严格类型**：开启 `strict`、`noImplicitAny`，所有函数均有中文 JSDoc。
- **存储可靠**：NDJSON 采用原子追加，避免并发写损坏。
- **代理支持**：读取 `HTTP_PROXY` 或 `PROXY_LIST`，支持轮换。

## 主要脚本

- `npm run start`：使用 `tsx` 直接运行 `src/index.ts`。
- `npm run build`：编译到 `dist/`。
- `npm run lint`：仅做类型检查。

## 目录

- `src/config.ts`：常量与环境配置
- `src/oidc/*`：OIDC 客户端注册、设备授权、Token 轮询
- `src/browser/*`：Playwright 自动化与登录处理
- `src/storage/file-store.ts`：NDJSON 存储
- `src/utils/*`：日志、重试、代理管理
- `src/index.ts`：自动注册登录入口

## 注意事项

- 避免滥用，自动化登录可能违反服务条款，请自行评估。
- 建议使用代理并适当间隔调用，降低风控概率。
- Playwright 初次运行会自动下载浏览器，可能需要数分钟。
