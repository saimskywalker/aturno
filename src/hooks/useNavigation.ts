'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

interface NavigationItem {
  label: string
  href: string
  icon?: string
  description?: string
  requiresAuth?: boolean
  badge?: string | number
}

interface UseNavigationReturn {
  currentPath: string
  isActive: (href: string) => boolean
  navigate: (href: string) => void
  canAccess: (item: NavigationItem) => boolean
  getBreadcrumbs: () => { label: string; href?: string | undefined }[]
  getActiveSection: () => string
}

export function useNavigation(): UseNavigationReturn {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const navigate = (href: string) => {
    router.push(href)
  }

  const canAccess = (item: NavigationItem): boolean => {
    if (!item.requiresAuth) return true
    return status === 'authenticated' && !!session
  }

  const getBreadcrumbs = useMemo(() => {
    return (): { label: string; href?: string | undefined }[] => {
      const segments = pathname.split('/').filter(Boolean)
      const breadcrumbs: { label: string; href?: string | undefined }[] = []
      
      const routeLabels: Record<string, string> = {
        dashboard: 'Dashboard',
        tasks: 'Tasks',
        projects: 'Projects',
        teams: 'Teams',
        settings: 'Settings',
        demo: 'Demo',
        'dashboard-preview': 'Dashboard Preview'
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
  }, [pathname])

  const getActiveSection = (): string => {
    const segments = pathname.split('/').filter(Boolean)
    return segments[0] || 'home'
  }

  return {
    currentPath: pathname,
    isActive,
    navigate,
    canAccess,
    getBreadcrumbs,
    getActiveSection
  }
}

// Navigation configuration hook
export function useNavigationConfig() {
  const { data: session } = useSession()

  const mainNavItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      description: 'Homepage and overview'
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      description: 'Your workspace',
      requiresAuth: true
    },
    {
      label: 'Demo',
      href: '/demo',
      description: 'Layout examples'
    }
  ]

  const dashboardNavItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: 'Home',
      description: 'Overview and stats'
    },
    {
      label: 'Tasks',
      href: '/dashboard/tasks',
      icon: 'CheckSquare',
      description: 'Manage your tasks',
      badge: '24' // Could be dynamic
    },
    {
      label: 'Projects',
      href: '/dashboard/projects',
      icon: 'BarChart3',
      description: 'Project overview'
    },
    {
      label: 'Teams',
      href: '/dashboard/teams',
      icon: 'Users',
      description: 'Team management'
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: 'Settings',
      description: 'Account settings'
    }
  ]

  const quickActions: NavigationItem[] = [
    {
      label: 'New Task',
      href: '/dashboard/tasks/new',
      icon: 'Plus',
      description: 'Create a new task',
      requiresAuth: true
    },
    {
      label: 'New Project',
      href: '/dashboard/projects/new',
      icon: 'FolderPlus',
      description: 'Start a new project',
      requiresAuth: true
    },
    {
      label: 'Invite Team',
      href: '/dashboard/teams/invite',
      icon: 'UserPlus',
      description: 'Invite team members',
      requiresAuth: true
    }
  ]

  const footerNavItems: NavigationItem[] = [
    {
      label: 'About',
      href: '/about',
      description: 'Learn about Aturno'
    },
    {
      label: 'Help',
      href: '/help',
      description: 'Get help and support'
    },
    {
      label: 'Contact',
      href: '/contact',
      description: 'Contact us'
    }
  ]

  return {
    mainNavItems,
    dashboardNavItems,
    quickActions,
    footerNavItems,
    isAuthenticated: !!session
  }
}