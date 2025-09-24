import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  children: ReactNode
  variant?: 'default' | 'sticky' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const headerVariants = {
  default: 'border-b border-border/40 bg-background/95 backdrop-blur',
  sticky: 'sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
  floating: 'sticky top-4 z-50 mx-4 rounded-lg border border-border/40 bg-background/95 backdrop-blur shadow-lg'
}

const headerSizes = {
  sm: 'h-12',
  md: 'h-16', 
  lg: 'h-20'
}

export function Header({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: HeaderProps) {
  return (
    <header className={cn(
      headerVariants[variant],
      headerSizes[size],
      'flex items-center',
      className
    )}>
      {children}
    </header>
  )
}

interface HeaderContentProps {
  children: ReactNode
  className?: string
}

export function HeaderContent({ children, className }: HeaderContentProps) {
  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full', className)}>
      {children}
    </div>
  )
}