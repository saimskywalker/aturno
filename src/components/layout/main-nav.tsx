'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { SignInButton, UserAvatar, SignOutButton } from '@/features/auth'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  description?: string
}

interface MainNavProps {
  items?: NavItem[]
  className?: string
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/', description: 'Homepage' },
  { label: 'Dashboard', href: '/dashboard', description: 'Your workspace' },
  { label: 'Demo', href: '/demo', description: 'Layout examples' }
]

export function MainNav({ items = defaultNavItems, className }: MainNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <nav className={cn('relative', className)}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-foreground/80',
              pathname === item.href
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </Button>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 h-full w-64 bg-background border-l border-border shadow-lg md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-sm">A</span>
                  </div>
                  <span className="font-semibold">Aturno</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-4 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <div>
                      <div>{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="p-4 border-t border-border">
                {status === 'loading' ? (
                  <div className="animate-pulse flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ) : session ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <UserAvatar size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {session.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <SignOutButton className="w-full" variant="outline" size="sm" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <SignInButton className="w-full" size="sm" />
                    <p className="text-xs text-muted-foreground text-center">
                      Sign in to access your dashboard
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

interface DesktopNavProps {
  items?: NavItem[]
  className?: string
}

export function DesktopNav({ items = defaultNavItems, className }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-foreground/80',
            pathname === item.href
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}