import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  12: 'grid-cols-12'
}

const gridGaps = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
}

export function Grid({ 
  children, 
  cols = 1, 
  gap = 'md', 
  className 
}: GridProps) {
  return (
    <div className={cn(
      'grid',
      gridCols[cols],
      gridGaps[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface GridItemProps {
  children: ReactNode
  span?: 1 | 2 | 3 | 4 | 6 | 12
  className?: string
}

const colSpans = {
  1: 'col-span-1',
  2: 'col-span-2', 
  3: 'col-span-3',
  4: 'col-span-4',
  6: 'col-span-6',
  12: 'col-span-12'
}

export function GridItem({ 
  children, 
  span = 1, 
  className 
}: GridItemProps) {
  return (
    <div className={cn(colSpans[span], className)}>
      {children}
    </div>
  )
}