import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { adminApi } from '@/services/api'
import {
  KeyRound,
  Plus,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Loader2,
} from 'lucide-react'

interface ApiKey {
  key: string
  name?: string
  created_at: string
  request_count: number
  rate_limit?: {
    max_requests: number
    window_seconds: number
  }
}

export function KeyManage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [keyName, setKeyName] = useState('')
  const [enableRateLimit, setEnableRateLimit] = useState(false)
  const [maxRequests, setMaxRequests] = useState('100')
  const [windowSeconds, setWindowSeconds] = useState('60')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [newKey, setNewKey] = useState<string | null>(null)

  useEffect(() => {
    loadKeys()
  }, [])

  const loadKeys = async () => {
    try {
      const res = await adminApi.getKeys()
      if (res.success && res.data) {
        setKeys(res.data as ApiKey[])
      }
    } catch (error) {
      console.error('Failed to load keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateKey = async () => {
    setSubmitting(true)
    try {
      const res = await adminApi.generateKey({
        name: keyName || undefined,
        rateLimit: enableRateLimit
          ? {
              maxRequests: parseInt(maxRequests) || 100,
              windowSeconds: parseInt(windowSeconds) || 60,
            }
          : undefined,
      })
      if (res.success && res.data) {
        const data = res.data as { key: string }
        setNewKey(data.key)
        setMessage({ type: 'success', text: '密钥生成成功！' })
        setKeyName('')
        setEnableRateLimit(false)
        setMaxRequests('100')
        setWindowSeconds('60')
        loadKeys()
      } else {
        setMessage({ type: 'error', text: res.error || '密钥生成失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '密钥生成失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteKey = async () => {
    if (!keyToDelete) return

    try {
      const res = await adminApi.deleteKey(keyToDelete)
      if (res.success) {
        setMessage({ type: 'success', text: '密钥删除成功' })
        loadKeys()
      } else {
        setMessage({ type: 'error', text: res.error || '密钥删除失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '密钥删除失败' })
    } finally {
      setDeleteDialogOpen(false)
      setKeyToDelete(null)
    }
  }

  const handleCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* 新生成的密钥展示 */}
      {newKey && (
        <Alert className="bg-green-500/10 border-green-500/20">
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">新密钥已生成，请立即保存：</p>
              <code className="text-sm bg-background px-2 py-1 rounded">{newKey}</code>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleCopyKey(newKey)}>
              {copiedKey === newKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 生成新密钥 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            生成新密钥
          </CardTitle>
          <CardDescription>
            创建新的 API 密钥用于访问 API 服务
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>密钥名称（可选）</Label>
            <Input
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="例如: 我的应用密钥"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="rate-limit"
              checked={enableRateLimit}
              onCheckedChange={setEnableRateLimit}
            />
            <Label htmlFor="rate-limit">启用频率限制</Label>
          </div>

          {enableRateLimit && (
            <div className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-2">
                <Label>最大请求数</Label>
                <Input
                  type="number"
                  value={maxRequests}
                  onChange={(e) => setMaxRequests(e.target.value)}
                  placeholder="例如: 100"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label>时间窗口（秒）</Label>
                <Input
                  type="number"
                  value={windowSeconds}
                  onChange={(e) => setWindowSeconds(e.target.value)}
                  placeholder="例如: 60"
                  min="1"
                />
              </div>
              <p className="text-sm text-muted-foreground md:col-span-2">
                设置时间窗口内允许的最大请求数。例如：100 次/60 秒
              </p>
            </div>
          )}

          <Button onClick={handleGenerateKey} disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <KeyRound className="h-4 w-4 mr-2" />
            )}
            生成密钥
          </Button>
        </CardContent>
      </Card>

      {/* 密钥列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              已有密钥
            </CardTitle>
            <Button variant="outline" size="sm" onClick={loadKeys}>
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
          ) : keys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无密钥
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>密钥</TableHead>
                  <TableHead>请求次数</TableHead>
                  <TableHead>频率限制</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.key}>
                    <TableCell>{key.name || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 4)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyKey(key.key)}
                        >
                          {copiedKey === key.key ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{key.request_count}</TableCell>
                    <TableCell>
                      {key.rate_limit ? (
                        <Badge variant="outline">
                          {key.rate_limit.max_requests}/{key.rate_limit.window_seconds}s
                        </Badge>
                      ) : (
                        <Badge variant="secondary">无限制</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(key.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setKeyToDelete(key.key)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 删除确认对话框 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除这个密钥吗？删除后使用该密钥的所有应用将无法访问 API。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteKey}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

