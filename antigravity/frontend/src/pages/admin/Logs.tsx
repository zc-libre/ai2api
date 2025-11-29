import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { adminApi } from '@/services/api'
import {
  ScrollText,
  RefreshCw,
  Trash2,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Info,
  Bug,
} from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  source?: string
}

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState<string>('all')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    loadLogs()
  }, [level])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (autoRefresh) {
      interval = setInterval(loadLogs, 5000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, level])

  const loadLogs = async () => {
    try {
      const res = await adminApi.getLogs({
        level: level === 'all' ? undefined : level,
        limit: 500,
      })
      if (res.success && res.data) {
        setLogs(res.data as LogEntry[])
      }
    } catch (error) {
      console.error('Failed to load logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearLogs = async () => {
    try {
      const res = await adminApi.clearLogs()
      if (res.success) {
        setMessage({ type: 'success', text: '日志清理成功' })
        loadLogs()
      } else {
        setMessage({ type: 'error', text: res.error || '日志清理失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '日志清理失败' })
    } finally {
      setClearDialogOpen(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'warn':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'debug':
        return <Bug className="h-4 w-4 text-gray-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'error':
        return <Badge variant="destructive">ERROR</Badge>
      case 'warn':
        return <Badge variant="warning">WARN</Badge>
      case 'info':
        return <Badge variant="default">INFO</Badge>
      case 'debug':
        return <Badge variant="secondary">DEBUG</Badge>
      default:
        return <Badge variant="outline">{level.toUpperCase()}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                系统日志
              </CardTitle>
              <CardDescription>
                查看系统运行日志
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="error">错误</SelectItem>
                  <SelectItem value="warn">警告</SelectItem>
                  <SelectItem value="info">信息</SelectItem>
                  <SelectItem value="debug">调试</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={autoRefresh ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? '停止' : '自动'}刷新
              </Button>
              <Button variant="outline" size="sm" onClick={loadLogs}>
                <RefreshCw className="h-4 w-4 mr-1" />
                刷新
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => setClearDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                清理
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无日志
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {getLevelIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getLevelBadge(log.level)}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(log.timestamp)}
                        </span>
                        {log.source && (
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-mono break-all">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* 清理确认对话框 */}
      <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认清理日志</DialogTitle>
            <DialogDescription>
              确定要清理所有日志吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleClearLogs}>
              清理
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

