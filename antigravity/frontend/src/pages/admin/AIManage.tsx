import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { adminApi } from '@/services/api'
import {
  Bot,
  Play,
  RefreshCw,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
} from 'lucide-react'

interface AIConfig {
  enabled: boolean
  interval_hours: number
  rules: string[]
  model: string
  system_prompt: string
}

interface AILog {
  id: string
  timestamp: string
  action: 'approve' | 'reject' | 'warning'
  token_id: string
  reason: string
}

interface AIStats {
  totalRuns: number
  tokensChecked: number
  tokensApproved: number
  tokensRejected: number
}

export function AIManage() {
  const [config, setConfig] = useState<AIConfig>({
    enabled: false,
    interval_hours: 24,
    rules: [],
    model: 'gemini-pro',
    system_prompt: '',
  })
  const [logs, setLogs] = useState<AILog[]>([])
  const [stats, setStats] = useState<AIStats>({
    totalRuns: 0,
    tokensChecked: 0,
    tokensApproved: 0,
    tokensRejected: 0,
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [running, setRunning] = useState(false)
  const [rulesText, setRulesText] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [configRes, logsRes] = await Promise.all([
        adminApi.getAIConfig(),
        adminApi.getAILogs(),
      ])

      if (configRes.success && configRes.data) {
        const data = configRes.data as AIConfig & { stats?: AIStats }
        setConfig({
          enabled: data.enabled ?? false,
          interval_hours: data.interval_hours ?? 24,
          rules: data.rules ?? [],
          model: data.model ?? 'gemini-pro',
          system_prompt: data.system_prompt ?? '',
        })
        setRulesText((data.rules ?? []).join('\n'))
        if (data.stats) {
          setStats(data.stats)
        }
      }

      if (logsRes.success && logsRes.data) {
        setLogs(logsRes.data as AILog[])
      }
    } catch (error) {
      console.error('Failed to load AI data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveConfig = async () => {
    setSubmitting(true)
    try {
      const res = await adminApi.updateAIConfig({
        ...config,
        rules: rulesText.split('\n').filter(r => r.trim()),
      })
      if (res.success) {
        setMessage({ type: 'success', text: 'AI 配置保存成功' })
        loadData()
      } else {
        setMessage({ type: 'error', text: res.error || 'AI 配置保存失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'AI 配置保存失败' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleRunModerator = async () => {
    setRunning(true)
    try {
      const res = await adminApi.runAIModerator()
      if (res.success) {
        setMessage({ type: 'success', text: 'AI 审核已执行' })
        loadData()
      } else {
        setMessage({ type: 'error', text: res.error || 'AI 审核执行失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'AI 审核执行失败' })
    } finally {
      setRunning(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'approve':
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            通过
          </Badge>
        )
      case 'reject':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            拒绝
          </Badge>
        )
      case 'warning':
        return (
          <Badge variant="warning" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            警告
          </Badge>
        )
      default:
        return <Badge variant="outline">{action}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总审核次数</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRuns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">检查Token数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tokensChecked}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">通过Token</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.tokensApproved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">拒绝Token</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.tokensRejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* AI 配置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI 自动审核配置
          </CardTitle>
          <CardDescription>
            配置 AI 自动审核 Token 的规则和参数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label className="text-base">启用 AI 自动审核</Label>
              <p className="text-sm text-muted-foreground">
                开启后将定期自动审核 Token
              </p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>审核间隔（小时）</Label>
              <Input
                type="number"
                value={config.interval_hours}
                onChange={(e) => setConfig({ ...config, interval_hours: parseInt(e.target.value) || 24 })}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label>使用模型</Label>
              <Input
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                placeholder="gemini-pro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>审核规则（每行一条）</Label>
            <Textarea
              value={rulesText}
              onChange={(e) => setRulesText(e.target.value)}
              placeholder="输入审核规则，每行一条..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>系统提示词</Label>
            <Textarea
              value={config.system_prompt}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
              placeholder="输入 AI 系统提示词..."
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSaveConfig} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              保存配置
            </Button>
            <Button variant="outline" onClick={handleRunModerator} disabled={running}>
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              立即执行审核
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 审核日志 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              最新审核记录
            </CardTitle>
            <Button variant="outline" size="sm" onClick={loadData}>
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
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无审核记录
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>时间</TableHead>
                  <TableHead>Token ID</TableHead>
                  <TableHead>操作</TableHead>
                  <TableHead>原因</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {log.token_id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell className="text-sm max-w-[300px] truncate">
                      {log.reason}
                    </TableCell>
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

