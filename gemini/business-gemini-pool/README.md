# Business Gemini Pool 管理系统

一个基于 Flask 的 Google Gemini Enterprise API 代理服务，支持多账号轮训、OpenAI 兼容接口和 Web 管理控制台。

## 项目结构

```
/
├── gemini.py                      # 后端服务主程序
├── index.html                     # Web 管理控制台前端
├── business_gemini_session.json   # 配置文件
└── README.md                      # 项目文档
```

## 快速请求

### 发送聊天请求

```bash
curl --location --request POST 'http://127.0.0.1:8000/v1/chat/completions' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model": "gemini-enterprise-2",
    "messages": [
        {
            "role": "user",
            "content": "你好"
        }
    ],
    "safe_mode": false
}'
```

## 功能特性

### 核心功能
- **多账号轮训**: 支持配置多个 Gemini 账号，自动轮训使用
- **OpenAI 兼容接口**: 提供与 OpenAI API 兼容的接口格式
- **流式响应**: 支持 SSE (Server-Sent Events) 流式输出
- **代理支持**: 支持 HTTP/HTTPS 代理配置
- **JWT 自动管理**: 自动获取和刷新 JWT Token

### 管理功能
- **Web 控制台**: 美观的 Web 管理界面，支持明暗主题切换
- **账号管理**: 添加、编辑、删除、启用/禁用账号
- **模型配置**: 自定义模型参数配置
- **代理测试**: 在线测试代理连接状态
- **配置导入/导出**: 支持配置文件的导入导出

## 文件说明

### gemini.py

后端服务主程序，基于 Flask 框架开发。

#### 主要类和函数

| 名称 | 类型 | 说明 |
|------|------|------|
| `AccountManager` | 类 | 账号管理器，负责账号加载、保存、状态管理和轮训选择 |
| `load_config()` | 方法 | 从配置文件加载账号和配置信息 |
| `save_config()` | 方法 | 保存配置到文件 |
| `get_next_account()` | 方法 | 轮训获取下一个可用账号 |
| `mark_account_unavailable()` | 方法 | 标记账号为不可用状态 |
| `create_jwt()` | 函数 | 创建 JWT Token |
| `create_chat_session()` | 函数 | 创建聊天会话 |
| `stream_chat()` | 函数 | 发送聊天请求并获取响应 |
| `check_proxy()` | 函数 | 检测代理是否可用 |

#### API 接口

**OpenAI 兼容接口**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/v1/models` | 获取可用模型列表 |
| POST | `/v1/chat/completions` | 聊天对话接口 |
| GET | `/v1/status` | 获取系统状态 |
| GET | `/health` | 健康检查 |

**管理接口**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 返回管理页面 |
| GET | `/api/accounts` | 获取账号列表 |
| POST | `/api/accounts` | 添加账号 |
| PUT | `/api/accounts/<id>` | 更新账号 |
| DELETE | `/api/accounts/<id>` | 删除账号 |
| POST | `/api/accounts/<id>/toggle` | 切换账号状态 |
| POST | `/api/accounts/<id>/test` | 测试账号 JWT 获取 |
| GET | `/api/models` | 获取模型配置 |
| POST | `/api/models` | 添加模型 |
| PUT | `/api/models/<id>` | 更新模型 |
| DELETE | `/api/models/<id>` | 删除模型 |
| GET | `/api/config` | 获取完整配置 |
| PUT | `/api/config` | 更新配置 |
| POST | `/api/config/import` | 导入配置 |
| GET | `/api/config/export` | 导出配置 |
| POST | `/api/proxy/test` | 测试代理 |
| GET | `/api/proxy/status` | 获取代理状态 |

### business_gemini_session.json

配置文件，JSON 格式，包含以下字段：

```json
{
    "proxy": "http://127.0.0.1:7890",
    "accounts": [
        {
            "team_id": "团队ID",
            "secure_c_ses": "安全会话Cookie",
            "host_c_oses": "主机Cookie",
            "csesidx": "会话索引",
            "user_agent": "浏览器UA",
            "available": true
        }
    ],
    "models": [
        {
            "id": "模型ID",
            "name": "模型名称",
            "description": "模型描述",
            "context_length": 32768,
            "max_tokens": 8192,
            "price_per_1k_tokens": 0.0015
        }
    ]
}
```

#### 配置字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `proxy` | string | HTTP 代理地址 |
| `accounts` | array | 账号列表 |
| `accounts[].team_id` | string | Google Cloud 团队 ID |
| `accounts[].secure_c_ses` | string | 安全会话 Cookie |
| `accounts[].host_c_oses` | string | 主机 Cookie |
| `accounts[].csesidx` | string | 会话索引 |
| `accounts[].user_agent` | string | 浏览器 User-Agent |
| `accounts[].available` | boolean | 账号是否可用 |
| `models` | array | 模型配置列表 |
| `models[].id` | string | 模型唯一标识 |
| `models[].name` | string | 模型显示名称 |
| `models[].description` | string | 模型描述 |
| `models[].context_length` | number | 上下文长度限制 |
| `models[].max_tokens` | number | 最大输出 Token 数 |

### index.html

Web 管理控制台前端，单文件 HTML 应用。

#### 功能模块

1. **仪表盘**: 显示系统概览、账号统计、代理状态
2. **账号管理**: 账号的增删改查、状态切换、JWT 测试
3. **模型配置**: 模型的增删改查
4. **系统设置**: 代理配置、配置导入导出

#### 界面特性

- 响应式设计，适配不同屏幕尺寸
- 支持明暗主题切换
- Google Material Design 风格
- 实时状态更新

## 快速开始

### 环境要求

- Python 3.7+
- Flask
- requests

### 安装依赖

```bash
pip install flask requests
```

### 配置账号

编辑 `business_gemini_session.json` 文件，添加你的 Gemini 账号信息：

```json
{
    "proxy": "http://your-proxy:port",
    "accounts": [
        {
            "team_id": "your-team-id",
            "secure_c_ses": "your-secure-c-ses",
            "host_c_oses": "your-host-c-oses",
            "csesidx": "your-csesidx",
            "user_agent": "Mozilla/5.0 ...",
            "available": true
        }
    ],
    "models": []
}
```

### 启动服务

```bash
python gemini.py
```

服务将在 `http://127.0.0.1:8000` 启动。

### 访问管理控制台

打开浏览器访问 `http://127.0.0.1:8000/` 即可进入 Web 管理控制台。

## API 使用示例

### 获取模型列表

```bash
curl http://127.0.0.1:8000/v1/models
```

### 聊天对话

```bash
curl -X POST http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-enterprise",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": false
  }'
```

### 流式对话

```bash
curl -X POST http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-enterprise",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ],
    "stream": true
  }'
```

## 注意事项

1. **安全性**: 配置文件中包含敏感信息，请妥善保管，不要提交到公开仓库
2. **代理**: 如果需要访问 Google 服务，可能需要配置代理
3. **账号限制**: 请遵守 Google 的使用条款，合理使用 API
4. **JWT 有效期**: JWT Token 有效期有限，系统会自动刷新

## 许可证

MIT License
