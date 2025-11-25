import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { adminApi } from '@/services/api'
import {
  Activity,
  RefreshCw,
  Loader2,
  Cpu,
  MemoryStick,
  HardDrive,
  Clock,
  Server,
  Wifi,
  Database,
} from 'lucide-react'

interface SystemStatus {
  cpu: number
  memory: {
    used: number
    total: number
    percent: number
  }
  disk: {
    used: number
    total: number
    percent: number
  }
  uptime: number
  platform: string
  nodeVersion: string
  hostname: string
}

interface ServiceStatus {
  api: boolean
  database: boolean
  tokenRotation: boolean
}

interface Stats {
  totalRequests: number
  todayRequests: number
  activeTokens: number
  activeKeys: number
}

export function Monitor() {
  const [system, setSystem] = useState<SystemStatus | null>(null)
  const [services, setServices] = useState<ServiceStatus>({
    api: true,
    database: true,
    tokenRotation: true,
  })
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    todayRequests: 0,
    activeTokens: 0,
    activeKeys: 0,
  })
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    loadStatus()
  }, [])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (autoRefresh) {
      interval = setInterval(loadStatus, 5000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const loadStatus = async () => {
    try {
      const res = await adminApi.getStatus()
      if (res.success && res.data) {
        const data = res.data as {
          system?: SystemStatus
          services?: ServiceStatus
          stats?: Stats
        }
        if (data.system) setSystem(data.system)
        if (data.services) setServices(data.services)
        if (data.stats) setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to load status:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    const parts = []
    if (days > 0) parts.push(`${days}天`)
    if (hours > 0) parts.push(`${hours}时`)
    if (mins > 0) parts.push(`${mins}分`)
    if (secs > 0 || parts.length === 0) parts.push(`${secs}秒`)
    
    return parts.join(' ')
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (percent: number): string => {
    if (percent >= 90) return 'text-red-500'
    if (percent >= 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">系统监控</h2>
          <p className="text-sm text-muted-foreground">实时监控系统状态</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '停止' : '自动'}刷新
          </Button>
          <Button variant="outline" size="sm" onClick={loadStatus}>
            <RefreshCw className="h-4 w-4 mr-1" />
            刷新
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* 服务状态 */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">API 服务</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge variant={services.api ? 'success' : 'destructive'}>
                  {services.api ? '运行中' : '已停止'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">数据存储</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge variant={services.database ? 'success' : 'destructive'}>
                  {services.database ? '正常' : '异常'}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Token 轮询</CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge variant={services.tokenRotation ? 'success' : 'destructive'}>
                  {services.tokenRotation ? '正常' : '异常'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* 系统资源 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">CPU 使用率</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(system?.cpu || 0)}`}>
                  {system?.cpu?.toFixed(1) || 0}%
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      (system?.cpu || 0) >= 90
                        ? 'bg-red-500'
                        : (system?.cpu || 0) >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${system?.cpu || 0}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">内存使用</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(system?.memory?.percent || 0)}`}>
                  {system?.memory?.percent?.toFixed(1) || 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatBytes(system?.memory?.used || 0)} / {formatBytes(system?.memory?.total || 0)}
                </p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      (system?.memory?.percent || 0) >= 90
                        ? 'bg-red-500'
                        : (system?.memory?.percent || 0) >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${system?.memory?.percent || 0}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">磁盘使用</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor(system?.disk?.percent || 0)}`}>
                  {system?.disk?.percent?.toFixed(1) || 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatBytes(system?.disk?.used || 0)} / {formatBytes(system?.disk?.total || 0)}
                </p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      (system?.disk?.percent || 0) >= 90
                        ? 'bg-red-500'
                        : (system?.disk?.percent || 0) >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${system?.disk?.percent || 0}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">运行时长</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatUptime(system?.uptime || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Node.js {system?.nodeVersion || '-'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 业务统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                业务统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">总请求数</p>
                  <p className="text-2xl font-bold">{stats.totalRequests}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">今日请求</p>
                  <p className="text-2xl font-bold">{stats.todayRequests}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">活跃 Token</p>
                  <p className="text-2xl font-bold">{stats.activeTokens}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">活跃密钥</p>
                  <p className="text-2xl font-bold">{stats.activeKeys}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 系统信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                系统信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">主机名</span>
                    <span className="text-sm font-medium">{system?.hostname || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">操作系统</span>
                    <span className="text-sm font-medium">{system?.platform || '-'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Node.js 版本</span>
                    <span className="text-sm font-medium">{system?.nodeVersion || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">运行时长</span>
                    <span className="text-sm font-medium">{formatUptime(system?.uptime || 0)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

