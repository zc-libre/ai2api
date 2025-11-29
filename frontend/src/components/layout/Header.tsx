import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, Settings, ExternalLink } from 'lucide-react'

interface HeaderProps {
  type: 'admin' | 'user'
  username?: string
}

const pageTitles: Record<string, string> = {
  '/admin': '首页',
  '/admin/tokens': 'Token 管理',
  '/admin/keys': '密钥管理',
  '/admin/announcements': '公告管理',
  '/admin/users': '用户管理',
  '/admin/ai': 'AI 管理',
  '/admin/test': 'API 测试',
  '/admin/docs': 'API 文档',
  '/admin/logs': '日志查看',
  '/admin/monitor': '系统监控',
  '/admin/settings': '系统设置',
  '/user': 'API 密钥',
  '/user/tokens': 'Token 管理',
  '/user/docs': 'API 使用说明',
  '/user/test': 'API 测试',
  '/user/account': '账户设置',
}

export function Header({ type, username = '管理员' }: HeaderProps) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || '页面'

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('user_token')
    window.location.href = type === 'admin' ? '/admin/login' : '/login'
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {type === 'admin' && (
          <Link to="/user" target="_blank">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              用户中心
            </Button>
          </Link>
        )}
        
        {type === 'user' && (
          <Link to="/admin" target="_blank">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              管理后台
            </Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {type === 'admin' ? '管理员' : '普通用户'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={type === 'admin' ? '/admin/settings' : '/user/account'} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

