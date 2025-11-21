# Antigravity to OpenAI API 代理服务

将 Google Antigravity API 转换为 OpenAI 兼容格式的代理服务，支持流式响应、工具调用和多账号管理。

## 功能特性

- ✅ OpenAI API 兼容格式
- ✅ 流式和非流式响应
- ✅ 工具调用（Function Calling）支持
- ✅ 多账号自动轮换
- ✅ Token 自动刷新
- ✅ API Key 认证
- ✅ 思维链（Thinking）输出
- ✅ 图片输入支持（Base64 编码）

## 环境要求

- Node.js >= 18.0.0

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置文件

复制示例配置文件并修改：

```bash
cp config.example.json config.json
```

编辑 `config.json` 配置服务器和 API 参数：

```json
{
  "server": {
    "port": 8045,
    "host": "0.0.0.0"
  },
  "security": {
    "apiKey": "sk-your-main-api-key-here",
    "adminPassword": "your-secure-admin-password-here",
    "maxRequestSize": "50mb"
  },
  "defaults": {
    "temperature": 1,
    "top_p": 0.85,
    "top_k": 50,
    "max_tokens": 8096
  },
  "systemInstruction": ""
}
```

**重要提示**：
- 请务必修改 `apiKey` 和 `adminPassword` 为强密码
- `config.json` 已在 `.gitignore` 中，不会被提交到版本控制
- 主 API Key 不受频率限制，可用于管理和高频调用

### 3. 获取 Google Token

首次使用需要通过 OAuth 登录获取 Token：

```bash
npm run login
```

按照提示在浏览器中完成 Google 账号授权，Token 将自动保存到 `data/accounts.json`。

### 4. 启动服务

```bash
npm start
```

服务将在 `http://localhost:8045` 启动。

## API 使用

### 获取模型列表

```bash
curl http://localhost:8045/v1/models \
  -H "Authorization: Bearer sk-text"
```

### 聊天补全（流式）

```bash
curl http://localhost:8045/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-text" \
  -d '{
    "model": "gemini-2.0-flash-exp",
    "messages": [{"role": "user", "content": "你好"}],
    "stream": true
  }'
```

### 聊天补全（非流式）

```bash
curl http://localhost:8045/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-text" \
  -d '{
    "model": "gemini-2.0-flash-exp",
    "messages": [{"role": "user", "content": "你好"}],
    "stream": false
  }'
```

### 工具调用示例

```bash
curl http://localhost:8045/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-text" \
  -d '{
    "model": "gemini-2.0-flash-exp",
    "messages": [{"role": "user", "content": "北京天气怎么样"}],
    "tools": [{
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "获取天气信息",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string", "description": "城市名称"}
          }
        }
      }
    }]
  }'
```

### 图片输入示例

支持 Base64 编码的图片输入，兼容 OpenAI 的多模态格式：

```bash
curl http://localhost:8045/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-text" \
  -d '{
    "model": "gemini-2.0-flash-exp",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "这张图片里有什么？"},
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
          }
        }
      ]
    }],
    "stream": true
  }'
```

支持的图片格式：
- JPEG/JPG (`data:image/jpeg;base64,...`)
- PNG (`data:image/png;base64,...`)
- GIF (`data:image/gif;base64,...`)
- WebP (`data:image/webp;base64,...`)

## 多账号管理

`data/accounts.json` 支持多个账号，服务会自动轮换使用：

```json
[
  {
    "access_token": "ya29.xxx",
    "refresh_token": "1//xxx",
    "expires_in": 3599,
    "timestamp": 1234567890000,
    "enable": true
  },
  {
    "access_token": "ya29.yyy",
    "refresh_token": "1//yyy",
    "expires_in": 3599,
    "timestamp": 1234567890000,
    "enable": true
  }
]
```

- `enable: false` 可禁用某个账号
- Token 过期会自动刷新
- 刷新失败（403）会自动禁用并切换下一个账号

## 配置说明

### config.json

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `server.port` | 服务端口 | 8045 |
| `server.host` | 监听地址 | 0.0.0.0 |
| `security.apiKey` | API 认证密钥 | sk-text |
| `security.maxRequestSize` | 最大请求体大小 | 50mb |
| `defaults.temperature` | 默认温度参数 | 1 |
| `defaults.top_p` | 默认 top_p | 0.85 |
| `defaults.top_k` | 默认 top_k | 50 |
| `defaults.max_tokens` | 默认最大 token 数 | 8096 |
| `systemInstruction` | 系统提示词 | - |

## 部署方式

### 方式一：直接运行

```bash
# 启动服务
npm start

# 开发模式（自动重启）
npm run dev

# 登录获取 Token
npm run login
```

### 方式二：Docker Compose 部署（推荐）

#### 1. 准备配置文件

```bash
# 复制示例配置
cp config.example.json config.json

# 编辑配置文件，修改 apiKey 和 adminPassword
vim config.json
```

#### 2. 获取 Google Token

首次部署需要先在本地获取 Token：

```bash
# 安装依赖
npm install

# 运行 OAuth 登录
npm run login
```

Token 将保存到 `data/accounts.json`，该文件会被 Docker 容器挂载使用。

#### 3. 启动服务

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 4. 验证服务

```bash
# 测试 API（替换为你的 API Key）
curl http://localhost:8045/v1/models \
  -H "Authorization: Bearer sk-your-api-key"
```

#### Docker 部署说明

- **端口映射**：默认映射 `8045:8045`，可在 `docker-compose.yml` 中修改
- **数据持久化**：`data/` 目录挂载到容器，Token 和日志会持久保存
- **配置文件**：`config.json` 以只读方式挂载，修改后需重启容器
- **健康检查**：容器会自动检测服务健康状态，异常时自动重启
- **自动重启**：容器异常退出时会自动重启（`restart: unless-stopped`）

#### 常用 Docker 命令

```bash
# 重启服务
docker-compose restart

# 查看容器状态
docker-compose ps

# 进入容器
docker-compose exec antigravity-api sh

# 查看实时日志
docker-compose logs -f antigravity-api

# 重新构建镜像
docker-compose build --no-cache

# 清理容器和镜像
docker-compose down --rmi all
```

## 项目结构

```
.
├── data/
│   └── accounts.json       # Token 存储（自动生成）
├── scripts/
│   └── oauth-server.js     # OAuth 登录服务
├── src/
│   ├── api/
│   │   └── client.js       # API 调用逻辑
│   ├── auth/
│   │   └── token_manager.js # Token 管理
│   ├── config/
│   │   └── config.js       # 配置加载
│   ├── server/
│   │   └── index.js        # 主服务器
│   └── utils/
│       ├── logger.js       # 日志模块
│       └── utils.js        # 工具函数
├── config.json             # 配置文件
└── package.json            # 项目配置
```

## 注意事项

1. 首次使用需要运行 `npm run login` 获取 Token
2. `data/accounts.json` 包含敏感信息，请勿泄露
3. API Key 可在 `config.json` 中自定义
4. 支持多账号轮换，提高可用性
5. Token 会自动刷新，无需手动维护

## License

MIT
