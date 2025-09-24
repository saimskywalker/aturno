'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string | undefined
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname)
  
  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      <Link 
        href="/" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="w-4 h-4" />
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Link 
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Route mapping for better labels
  const routeLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    projects: 'Projects',
    teams: 'Teams',
    settings: 'Settings',
    demo: 'Demo'
  }
  
  let currentPath = ''
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    
    breadcrumbs.push({
      label,
      href: index < segments.length - 1 ? currentPath : undefined
    })
  })
  
  return breadcrumbs
}