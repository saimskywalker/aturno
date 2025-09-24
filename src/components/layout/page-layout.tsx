import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: ReactNode
  header?: ReactNode
  sidebar?: ReactNode
  footer?: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const maxWidths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl', 
  xl: 'max-w-[1400px]',
  full: 'max-w-none'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6 lg:p-8',
  lg: 'p-8 lg:p-12'
}

export function PageLayout({ 
  children, 
  header,
  sidebar,
  footer,
  maxWidth = 'lg',
  padding = 'md',
  className 
}: PageLayoutProps) {
  if (sidebar) {
    return (
      <div className="min-h-screen flex">
        {sidebar}
        <div className="flex-1 flex flex-col">
          {header}
          <main className={cn('flex-1', paddings[padding], className)}>
            <div className={cn('mx-auto', maxWidths[maxWidth])}>
              {children}
            </div>
          </main>
          {footer}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <main className={cn('flex-1', paddings[padding], className)}>
        <div className={cn('mx-auto', maxWidths[maxWidth])}>
          {children}
        </div>
      </main>
      {footer}
    </div>
  )
}