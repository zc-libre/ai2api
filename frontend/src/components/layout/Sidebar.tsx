import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Home,
  Key,
  KeyRound,
  Megaphone,
  Users,
  Bot,
  TestTube,
  FileText,
  ScrollText,
  Activity,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Rocket,
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  theme: 'light' | 'dark'
  onThemeToggle: () => void
  type: 'admin' | 'user'
}

const adminNavItems = [
  { icon: Home, label: '首页', path: '/admin' },
  { icon: Key, label: 'Token 管理', path: '/admin/tokens' },
  { icon: KeyRound, label: '密钥管理', path: '/admin/keys' },
  { icon: Megaphone, label: '公告管理', path: '/admin/announcements' },
  { icon: Users, label: '用户管理', path: '/admin/users' },
  { icon: Bot, label: 'AI 管理', path: '/admin/ai' },
  { icon: TestTube, label: 'API 测试', path: '/admin/test' },
  { icon: FileText, label: 'API 文档', path: '/admin/docs' },
  { icon: ScrollText, label: '日志查看', path: '/admin/logs' },
  { icon: Activity, label: '系统监控', path: '/admin/monitor' },
  { icon: Settings, label: '系统设置', path: '/admin/settings' },
]

const userNavItems = [
  { icon: KeyRound, label: 'API 密钥', path: '/user' },
  { icon: Key, label: 'Token 管理', path: '/user/tokens' },
  { icon: FileText, label: 'API 使用说明', path: '/user/docs' },
  { icon: TestTube, label: 'API 测试', path: '/user/test' },
  { icon: Settings, label: '账户设置', path: '/user/account' },
]

export function Sidebar({ isCollapsed, onToggle, theme, onThemeToggle, type }: SidebarProps) {
  const location = useLocation()
  const navItems = type === 'admin' ? adminNavItems : userNavItems

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          'relative flex h-screen flex-col border-r bg-background transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Antigravity</span>
            </div>
          )}
          {isCollapsed && <Rocket className="h-6 w-6 text-primary mx-auto" />}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/admin' && item.path !== '/user' && location.pathname.startsWith(item.path))
              
              if (isCollapsed) {
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <NavLink to={item.path}>
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          size="icon"
                          className={cn(
                            'w-10 h-10',
                            isActive && 'bg-secondary'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                        </Button>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <NavLink key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start gap-3',
                      isActive && 'bg-secondary'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </NavLink>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-3">
          <Separator className="mb-3" />
          <div className={cn('flex gap-2', isCollapsed ? 'flex-col items-center' : 'justify-between')}>
            {isCollapsed ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onThemeToggle}>
                      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onToggle}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">展开侧边栏</TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" onClick={onThemeToggle}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onToggle}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

