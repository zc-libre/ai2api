// API 服务层
const API_BASE = ''

interface ApiResponse<T = unknown> {
  success?: boolean
  data?: T
  error?: string
  message?: string
}

async function request<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      return { success: false, error: error.error || error.message || 'Request failed' }
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Admin API
export const adminApi = {
  // 验证 session
  verifySession: (session: string) => 
    request('/admin/verify-session', {
      method: 'POST',
      body: JSON.stringify({ session }),
    }),

  // 登录
  login: (password: string) =>
    request<{ session: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  // 获取统计数据
  getStats: () => request('/admin/stats'),

  // 获取 Token 列表
  getTokens: () => request('/admin/tokens'),

  // 添加 Token
  addToken: (tokenData: { access_token: string; refresh_token?: string; expires_in?: number }) =>
    request('/admin/add-token', {
      method: 'POST',
      body: JSON.stringify(tokenData),
    }),

  // 删除 Token
  deleteToken: (tokenId: string) =>
    request(`/admin/delete-token/${tokenId}`, { method: 'DELETE' }),

  // 切换 Token 状态
  toggleToken: (tokenId: string) =>
    request(`/admin/toggle-token/${tokenId}`, { method: 'POST' }),

  // 获取密钥列表
  getKeys: () => request('/admin/keys'),

  // 生成密钥
  generateKey: (data: { name?: string; rate_limit?: { max_requests: number; window_seconds: number } }) =>
    request('/admin/generate-key', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 删除密钥
  deleteKey: (key: string) =>
    request(`/admin/delete-key/${key}`, { method: 'DELETE' }),

  // 获取公告列表
  getAnnouncements: () => request('/admin/announcements'),

  // 创建公告
  createAnnouncement: (data: FormData) =>
    fetch('/admin/announcements', {
      method: 'POST',
      body: data,
    }).then(res => res.json()),

  // 删除公告
  deleteAnnouncement: (id: string) =>
    request(`/admin/announcements/${id}`, { method: 'DELETE' }),

  // 获取用户列表
  getUsers: () => request('/admin/users'),

  // 删除用户
  deleteUser: (userId: string) =>
    request(`/admin/users/${userId}`, { method: 'DELETE' }),

  // 获取 AI 配置
  getAIConfig: () => request('/admin/ai-config'),

  // 更新 AI 配置
  updateAIConfig: (config: unknown) =>
    request('/admin/ai-config', {
      method: 'PUT',
      body: JSON.stringify(config),
    }),

  // 获取 AI 日志
  getAILogs: () => request('/admin/ai-logs'),

  // 运行 AI 审核
  runAIModerator: () =>
    request('/admin/run-ai-moderator', { method: 'POST' }),

  // 获取日志
  getLogs: (params?: { level?: string; limit?: number }) => {
    const query = new URLSearchParams()
    if (params?.level) query.set('level', params.level)
    if (params?.limit) query.set('limit', params.limit.toString())
    return request(`/admin/logs?${query}`)
  },

  // 清理日志
  clearLogs: () =>
    request('/admin/logs', { method: 'DELETE' }),

  // 获取监控数据
  getStatus: () => request('/admin/status'),

  // 获取系统设置
  getSettings: () => request('/admin/settings'),

  // 更新系统设置
  updateSettings: (settings: unknown) =>
    request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  // OAuth 配置
  getOAuthConfig: () => request('/admin/oauth-config'),

  updateOAuthConfig: (config: { client_id: string; client_secret: string; project_id: string }) =>
    request('/admin/oauth-config', {
      method: 'PUT',
      body: JSON.stringify(config),
    }),

  // 触发 OAuth 登录
  triggerOAuthLogin: () => request('/admin/trigger-oauth'),
}

// User API
export const userApi = {
  // 登录
  login: (username: string, password: string) =>
    request<{ token: string; user: { username: string } }>('/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  // 注册
  register: (username: string, password: string) =>
    request('/user/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  // 获取用户信息
  getProfile: (token: string) =>
    request('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 获取用户密钥
  getKeys: (token: string) =>
    request('/user/keys', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 生成密钥
  generateKey: (token: string, name?: string) =>
    request('/user/generate-key', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name }),
    }),

  // 删除密钥
  deleteKey: (token: string, key: string) =>
    request(`/user/keys/${key}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 获取用户 Token
  getTokens: (token: string) =>
    request('/user/tokens', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 添加 Token
  addToken: (token: string, tokenData: unknown) =>
    request('/user/add-token', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(tokenData),
    }),

  // 修改密码
  changePassword: (token: string, oldPassword: string, newPassword: string) =>
    request('/user/change-password', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    }),

  // 获取公告
  getAnnouncements: () => request('/user/announcements'),
}

// 聊天 API
export const chatApi = {
  test: (apiKey: string, model: string, message: string) =>
    fetch('/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: message }],
        stream: false,
      }),
    }).then(res => res.json()),

  getModels: (apiKey: string) =>
    fetch('/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    }).then(res => res.json()),
}

