import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StackProps {
  children: ReactNode
  direction?: 'vertical' | 'horizontal'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  className?: string
}

const stackSpacing = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8'
}

const alignItems = {
  start: 'items-start',
  center: 'items-center', 
  end: 'items-end',
  stretch: 'items-stretch'
}

const justifyContent = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export function Stack({ 
  children, 
  direction = 'vertical', 
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  className 
}: StackProps) {
  return (
    <div className={cn(
      'flex',
      direction === 'vertical' ? 'flex-col' : 'flex-row',
      stackSpacing[spacing],
      alignItems[align],
      justifyContent[justify],
      className
    )}>
      {children}
    </div>
  )
}