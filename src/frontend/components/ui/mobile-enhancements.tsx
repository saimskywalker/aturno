'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface SwipeableCardProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
}

export function SwipeableCard({ children, onSwipeLeft, onSwipeRight, className }: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    
    if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight()
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft()
    }
    
    // Reset position
    x.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

interface TouchOptimizedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function TouchOptimizedButton({ 
  children, 
  onClick, 
  className = '',
  size = 'md'
}: TouchOptimizedButtonProps) {
  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2 text-sm',
    md: 'min-h-[48px] px-6 py-3 text-base',
    lg: 'min-h-[52px] px-8 py-4 text-lg'
  }

  return (
    <motion.button
      className={`${sizeClasses[size]} ${className} rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  )
}

export function PullToRefresh({ 
  onRefresh, 
  children 
}: { 
  onRefresh: () => Promise<void>
  children: ReactNode 
}) {
  const y = useMotionValue(0)
  const pullDistance = useTransform(y, [0, 100], [0, 1])

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      await onRefresh()
    }
    y.set(0)
  }

  return (
    <motion.div
      style={{ y }}
      drag="y"
      dragDirectionLock
      dragConstraints={{ top: 0, bottom: 100 }}
      onDragEnd={handleDragEnd}
      className="relative overflow-hidden"
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
        style={{ opacity: pullDistance }}
      >
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
          Pull to refresh
        </div>
      </motion.div>
      
      {children}
    </motion.div>
  )
}