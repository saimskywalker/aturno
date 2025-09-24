'use client'

import { motion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'

// Common animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
}

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Motion wrapper components
export function FadeInWhenVisible({
  children,
  duration = 0.6,
  delay = 0,
  className
}: {
  children: ReactNode
  duration?: number
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnHover({
  children,
  scale = 1.05,
  className
}: {
  children: ReactNode
  scale?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({
  children,
  amplitude = 20,
  duration = 3,
  className
}: {
  children: ReactNode
  amplitude?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}