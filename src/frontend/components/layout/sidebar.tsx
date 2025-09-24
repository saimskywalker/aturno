import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SidebarLayoutProps {
  sidebar: ReactNode
  children: ReactNode
  sidebarWidth?: 'sm' | 'md' | 'lg'
  position?: 'left' | 'right'
  collapsible?: boolean
  collapsed?: boolean
  className?: string
}

const sidebarWidths = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-80'
}

export function SidebarLayout({ 
  sidebar, 
  children, 
  sidebarWidth = 'md',
  position = 'left',
  collapsible = false,
  collapsed = false,
  className 
}: SidebarLayoutProps) {
  return (
    <div className={cn('flex min-h-screen', className)}>
      {position === 'left' && (
        <aside className={cn(
          'shrink-0 border-r border-border/40 bg-background/95 backdrop-blur',
          collapsible && collapsed ? 'w-16' : sidebarWidths[sidebarWidth],
          'transition-all duration-300'
        )}>
          {sidebar}
        </aside>
      )}
      
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {position === 'right' && (
        <aside className={cn(
          'shrink-0 border-l border-border/40 bg-background/95 backdrop-blur',
          collapsible && collapsed ? 'w-16' : sidebarWidths[sidebarWidth],
          'transition-all duration-300'
        )}>
          {sidebar}
        </aside>
      )}
    </div>
  )
}

interface SidebarProps {
  children: ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <div className={cn('flex flex-col h-full p-4', className)}>
      {children}
    </div>
  )
}