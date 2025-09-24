import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveProps {
  children: ReactNode
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  hide?: 'mobile' | 'tablet' | 'desktop'
  show?: 'mobile' | 'tablet' | 'desktop'
  className?: string
}

const hideClasses = {
  mobile: 'hidden sm:block',
  tablet: 'hidden md:block', 
  desktop: 'block lg:hidden'
}

const showClasses = {
  mobile: 'block sm:hidden',
  tablet: 'hidden sm:block md:hidden',
  desktop: 'hidden lg:block'
}

export function Responsive({ 
  children, 
  hide,
  show,
  className 
}: ResponsiveProps) {
  let responsiveClasses = ''
  
  if (hide) {
    responsiveClasses = hideClasses[hide]
  } else if (show) {
    responsiveClasses = showClasses[show]
  }

  return (
    <div className={cn(responsiveClasses, className)}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  mobile?: number
  tablet?: number  
  desktop?: number
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveGrid({ 
  children, 
  mobile = 1,
  tablet = 2,
  desktop = 3,
  gap = 'md',
  className 
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6', 
    lg: 'gap-8'
  }

  return (
    <div className={cn(
      'grid',
      `grid-cols-${mobile}`,
      `sm:grid-cols-${tablet}`,
      `lg:grid-cols-${desktop}`,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}