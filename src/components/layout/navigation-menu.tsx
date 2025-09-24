'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronDown, ExternalLink } from 'lucide-react'

interface MenuItem {
  label: string
  href: string
  description?: string
  external?: boolean
  children?: MenuItem[]
}

interface NavigationMenuProps {
  items: MenuItem[]
  className?: string
}

export function NavigationMenu({ items, className }: NavigationMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  return (
    <nav className={cn('relative', className)}>
      <ul className="flex items-center space-x-1">
        {items.map((item) => (
          <li key={item.label} className="relative">
            {item.children ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDropdownToggle(item.label)}
                  className="gap-1 h-9"
                >
                  {item.label}
                  <ChevronDown className={cn(
                    'w-3 h-3 transition-transform',
                    openDropdown === item.label && 'rotate-180'
                  )} />
                </Button>

                {openDropdown === item.label && (
                  <>
                    <div 
                      className="fixed inset-0 z-20"
                      onClick={closeDropdown}
                    />
                    <div className="absolute top-full left-0 z-30 mt-1 w-56 bg-background border border-border rounded-md shadow-lg">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeDropdown}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-md transition-colors',
                              pathname === child.href
                                ? 'bg-accent text-accent-foreground'
                                : 'hover:bg-muted'
                            )}
                            {...(child.external && { 
                              target: '_blank', 
                              rel: 'noopener noreferrer' 
                            })}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{child.label}</div>
                                {child.description && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                              {child.external && (
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                )}
                {...(item.external && { 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                })}
              >
                {item.label}
                {item.external && (
                  <ExternalLink className="w-3 h-3 ml-1" />
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Quick Actions Menu Component
interface QuickAction {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  shortcut?: string
}

interface QuickActionsMenuProps {
  actions: QuickAction[]
  className?: string
}

export function QuickActionsMenu({ actions, className }: QuickActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        Quick Actions
        <ChevronDown className={cn(
          'w-3 h-3 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 z-30 mt-1 w-64 bg-background border border-border rounded-md shadow-lg">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </div>
              {actions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                  >
                    {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                    <div className="flex-1">
                      <div className="font-medium">{action.label}</div>
                      {action.description && (
                        <div className="text-xs text-muted-foreground">
                          {action.description}
                        </div>
                      )}
                    </div>
                    {action.shortcut && (
                      <kbd className="px-2 py-1 text-xs bg-muted rounded border">
                        {action.shortcut}
                      </kbd>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}