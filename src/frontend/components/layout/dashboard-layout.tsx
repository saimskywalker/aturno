'use client'

import { ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { UserAvatar, SignOutButton } from '@/features/auth'
import { useNavigationConfig } from '@/hooks'
import { 
  Home,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Plus,
  Bell,
  Search
} from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { dashboardNavItems } = useNavigationConfig()

  const iconMap = {
    Home,
    CheckSquare,
    BarChart3,
    Users,
    Settings
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold">Aturno</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {dashboardNavItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Home
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-accent/20 text-accent-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-border">
            <Button className="w-full gap-2" size="sm">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>

          <div className="flex-1" />

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks, projects, teams..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-background"
              />
            </div>
          </div>

          {/* Right side of header */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <UserAvatar size="sm" />
            <SignOutButton variant="ghost" size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}