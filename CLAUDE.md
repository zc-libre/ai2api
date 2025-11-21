# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个将 Google Antigravity API 转换为 OpenAI 兼容格式的代理服务，支持流式响应、工具调用和多账号管理。

## 核心架构

### 1. 请求流程
- **入口**: `src/server/index.js` - Express 服务器，处理 `/v1/chat/completions` 和 `/v1/models` 端点
- **转换层**: `src/utils/utils.js` - 将 OpenAI 格式消息转换为 Antigravity 格式
- **API 客户端**: `src/api/client.js` - 调用 Google Antigravity API，处理流式响应
- **Token 管理**: `src/auth/token_manager.js` - 多账号轮换、自动刷新、失败处理

### 2. 管理系统
- **管理路由**: `src/admin/routes.js` - 提供 Web 管理界面的 API
- **功能模块**:
  - `src/admin/key_manager.js` - API Key 管理和频率限制
  - `src/admin/token_admin.js` - Token 账号管理（增删改查、导入导出）
  - `src/admin/log_manager.js` - 系统日志管理
  - `src/admin/monitor.js` - 系统状态监控
  - `src/admin/session.js` - 管理员会话认证
  - `src/admin/settings_manager.js` - 系统设置管理

### 3. 关键转换逻辑

**消息转换** (`src/utils/utils.js:132-146`):
- OpenAI 的 `user`/`system` 角色 → Antigravity 的 `user` 角色
- OpenAI 的 `assistant` 角色 → Antigravity 的 `model` 角色
- OpenAI 的 `tool` 角色 → Antigravity 的 `functionResponse`
- 支持多模态输入（文本 + Base64 图片）

**工具调用转换** (`src/utils/utils.js:171-184`):
- OpenAI 的 `tools` 数组 → Antigravity 的 `functionDeclarations`
- 自动处理工具调用的 ID 映射和参数转换

**思维链支持** (`src/utils/utils.js:186-192`):
- 模型名称以 `-thinking` 结尾或特定模型会启用思维链
- 在响应中包装 `<think>` 标签

### 4. Token 管理机制

**轮换策略** (`src/auth/token_manager.js:117-148`):
- 循环使用多个 Google 账号的 Token
- 自动检测过期并刷新（提前 5 分钟）
- 403 错误自动禁用账号并切换下一个
- 记录每个 Token 的使用统计

**数据存储**:
- `data/accounts.json` - Token 账号数据（access_token, refresh_token, expires_in, timestamp, enable）
- `data/keys.json` - API Key 数据
- `data/logs.json` - 系统日志

## 常用开发命令

```bash
# 启动服务（生产模式）
npm start

# 开发模式（自动重启）
npm run dev

# OAuth 登录获取新 Token
npm run login
```

## 配置文件

**config.json** - 主配置文件:
- `server.port` / `server.host` - 服务器监听配置
- `security.apiKey` - 主 API Key（不受频率限制）
- `security.adminPassword` - 管理后台密码
- `defaults.*` - 默认模型参数（temperature, top_p, top_k, max_tokens）
- `systemInstruction` - 系统提示词

## 安全注意事项

1. **硬编码凭证**: `src/auth/token_manager.js:9-10` 包含 Google OAuth CLIENT_ID 和 CLIENT_SECRET
2. **敏感数据**: `data/accounts.json` 包含 access_token 和 refresh_token，不应提交到版本控制
3. **API Key 验证**: 支持两层验证 - 配置文件中的主密钥和数据库中的多个密钥
4. **频率限制**: 仅对数据库中的 API Key 生效，主密钥不受限制

## API 端点

### 对外 API（需要 API Key）
- `GET /v1/models` - 获取可用模型列表
- `POST /v1/chat/completions` - 聊天补全（支持流式和非流式）

### 管理 API（需要管理员认证）
- `POST /admin/login` - 管理员登录
- `GET /admin/tokens` - 获取所有 Token 账号
- `POST /admin/keys/generate` - 生成新 API Key
- `GET /admin/logs` - 获取系统日志
- `GET /admin/status` - 获取系统状态

## 开发注意事项

1. **模块化原则**: 每个功能模块职责单一，避免跨模块直接访问数据
2. **错误处理**: Token 刷新失败会自动禁用账号，API 请求失败会返回详细错误信息
3. **日志记录**: 使用 `src/utils/logger.js` 统一日志格式，支持不同级别（info, warn, error）
4. **空闲管理**: `src/utils/idle_manager.js` 监控服务空闲状态，可用于自动休眠
5. **并发处理**: Token 轮换使用索引而非锁，适合高并发场景

## 扩展点

- **新增模型支持**: 修改 `src/utils/utils.js:186-192` 的思维链判断逻辑
- **自定义转换**: 修改 `src/utils/utils.js` 中的消息转换函数
- **新增管理功能**: 在 `src/admin/` 目录下添加新模块并注册到 `routes.js`
