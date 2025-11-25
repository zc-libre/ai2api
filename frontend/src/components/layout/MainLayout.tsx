import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  type: 'admin' | 'user'
}

export function MainLayout({ type }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        theme={theme}
        onThemeToggle={toggleTheme}
        type={type}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header type={type} />
        <main className={cn(
          'flex-1 overflow-auto bg-muted/30 p-6',
          'transition-all duration-300'
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

