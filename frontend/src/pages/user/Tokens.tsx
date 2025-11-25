import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { userApi } from '@/services/api'
import {
  Key,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'

interface Token {
  id: string
  access_token: string
  refresh_token?: string
  expires_at?: number
  created_at: string
  request_count?: number
}

export function UserTokens() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [callbackUrl, setCallbackUrl] = useState('')
  const [directToken, setDirectToken] = useState({
    access_token: '',
    refresh_token: '',
    expires_in: '3600',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const token = localStorage.getItem('user_token') || ''

  useEffect(() => {
    loadTokens()
  }, [])

  const loadTokens = async () => {
    try {
      const res = await userApi.getTokens(token)
      if (res.success && res.data) {
        setTokens(res.data as Token[])
      }
    } catch (error) {
      console.error('Failed to load tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = () => {
    // 打开 OAuth 登录页面
    window.open('/user/oauth-login', '_blank')
  }

  const handleCallbackAdd = async () => {
    if (!callbackUrl) {
      setMessage({ type: 'error', text: '请输入回调链接' })
      return
    }

    setSubmitting(true)
    try {
      const url = new URL(callbackUrl)
      const code = url.searchParams.get('code')
      if (!code) {
        setMessage({ type: 'error', text: '无效的回调链接，未找到 code 参数' })
        return
      }

      const res = await userApi.addToken(token, { code })
      if (res.success) {
        setMessage({ type: 'success', text: 'Token 添加成功' })
        setCallbackUrl('')
        loadTokens()
      } else {
        setMessage({ type: 'error', text: res.error || 'Token 添加失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '无效的回调链接格式' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDirectAdd = async () => {
    if (!directToken.access_token) {
      setMessage({ type: 'error', text: '请输入 Access Token' })
      return
    }

    setSubmitting(true)
    try {
      const res = await userApi.addToken(token, {
        access_token: directToken.access_token,
        refresh_token: directToken.refresh_token || undefined,
        expires_in: parseInt(directToken.expires_in) || 3600,
      })
      if (res.success) {
        setMessage({ type: 'success', text: 'Token 添加成功' })
        setDirectToken({ access_token: '', refresh_token: '', expires_in: '3600' })
        loadTokens()
      } else {
        setMessage({ type: 'error', text: res.error || 'Token 添加失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Token 添加失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  const isTokenExpired = (expiresAt?: number) => {
    if (!expiresAt) return false
    return Date.now() > expiresAt
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Google OAuth 登录 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            添加 Google Token
          </CardTitle>
          <CardDescription>
            通过 Google OAuth 登录获取 Token，将 Token 共享到公共池
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOAuthLogin} className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Google OAuth 登录
          </Button>
        </CardContent>
      </Card>

      {/* 手动添加 Token（回调链接） */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            手动添加 Token（回调链接）
          </CardTitle>
          <CardDescription>
            将回调链接粘贴到下方添加 Token
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>回调链接</Label>
            <Input
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              placeholder="http://localhost:xxxx/oauth-callback?code=..."
            />
          </div>
          <Button onClick={handleCallbackAdd} disabled={submitting} className="bg-green-600 hover:bg-green-700">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            添加 Token
          </Button>
        </CardContent>
      </Card>

      {/* 直接添加 Token */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            直接添加 Token
          </CardTitle>
          <CardDescription>
            直接粘贴 Token 信息添加
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Access Token <span className="text-destructive">*</span></Label>
            <Textarea
              value={directToken.access_token}
              onChange={(e) => setDirectToken({ ...directToken, access_token: e.target.value })}
              placeholder="粘贴 access_token..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Refresh Token</Label>
            <Textarea
              value={directToken.refresh_token}
              onChange={(e) => setDirectToken({ ...directToken, refresh_token: e.target.value })}
              placeholder="粘贴 refresh_token（可选）..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>过期时间（秒）</Label>
            <Input
              type="number"
              value={directToken.expires_in}
              onChange={(e) => setDirectToken({ ...directToken, expires_in: e.target.value })}
              placeholder="例如: 3600"
            />
          </div>
          <Button onClick={handleDirectAdd} disabled={submitting} className="bg-green-600 hover:bg-green-700">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            添加 Token
          </Button>
        </CardContent>
      </Card>

      {/* Token 列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              我的 Token
            </CardTitle>
            <Button variant="outline" size="sm" onClick={loadTokens}>
              <RefreshCw className="h-4 w-4 mr-1" />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无 Token，请通过上方方式添加
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>使用次数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs">
                      {t.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate">
                      {t.access_token.substring(0, 20)}...
                    </TableCell>
                    <TableCell>
                      {isTokenExpired(t.expires_at) ? (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          已过期
                        </Badge>
                      ) : (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          有效
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(t.created_at)}
                    </TableCell>
                    <TableCell>{t.request_count || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

