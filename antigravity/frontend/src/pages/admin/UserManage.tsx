import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Users,
  Trash2,
  RefreshCw,
  Loader2,
  UserCheck,
  Key,
  Activity,
} from 'lucide-react'

interface User {
  id: string
  username: string
  created_at: string
  last_login?: string
  keys_count: number
  tokens_count: number
  total_requests: number
  is_active: boolean
}

interface Stats {
  totalUsers: number
  activeUsers: number
  sharedTokens: number
  todayCalls: number
}

export function UserManage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    sharedTokens: 0,
    todayCalls: 0,
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const res = await adminApi.getUsers()
      if (res.success && res.data) {
        const data = res.data as { users: User[]; stats: Stats }
        setUsers(data.users || [])
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!userToDelete) return

    try {
      const res = await adminApi.deleteUser(userToDelete)
      if (res.success) {
        setMessage({ type: 'success', text: '用户删除成功' })
        loadUsers()
      } else {
        setMessage({ type: 'error', text: res.error || '用户删除失败' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: '用户删除失败' })
    } finally {
      setDeleteDialogOpen(false)
      setUserToDelete(null)
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

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">共享Token数</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sharedTokens}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">今日调用</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayCalls}</div>
          </CardContent>
        </Card>
      </div>

      {/* 用户列表 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              用户列表
            </CardTitle>
            <Button variant="outline" size="sm" onClick={loadUsers}>
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
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无用户
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户名</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>密钥数</TableHead>
                  <TableHead>Token数</TableHead>
                  <TableHead>总请求</TableHead>
                  <TableHead>注册时间</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? 'success' : 'secondary'}>
                        {user.is_active ? '活跃' : '不活跃'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.keys_count}</TableCell>
                    <TableCell>{user.tokens_count}</TableCell>
                    <TableCell>{user.total_requests}</TableCell>
                    <TableCell className="text-sm">
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.last_login ? formatDate(user.last_login) : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setUserToDelete(user.id)
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
              确定要删除这个用户吗？该用户的所有数据（包括密钥和 Token）都将被删除。此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

