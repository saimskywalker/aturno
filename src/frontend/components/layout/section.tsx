import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  variant?: 'default' | 'muted' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sectionVariants = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  accent: 'bg-accent/5'
}

const sectionSizes = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16', 
  xl: 'py-20'
}

export function Section({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: SectionProps) {
  return (
    <section className={cn(
      sectionVariants[variant],
      sectionSizes[size],
      className
    )}>
      {children}
    </section>
  )
}