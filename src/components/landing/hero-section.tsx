'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover, FloatingElement } from '@/components/ui/motion'

interface HeroSectionProps {
  isAuthenticated: boolean
  userName?: string | null | undefined
  onGetStarted: () => void
  onViewDemo: () => void
  onDashboard: () => void
  isLoading: boolean
}

export function HeroSection({
  isAuthenticated,
  userName,
  onGetStarted,
  onViewDemo,
  onDashboard,
  isLoading
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <FadeInWhenVisible>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-8"
            >
              <FloatingElement amplitude={10} duration={4} className="inline-block">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">A</span>
                </div>
              </FloatingElement>
              
              <motion.h1 
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="inline-block">
                  <motion.span
                    className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      ease: 'linear',
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Aturno
                  </motion.span>
                </span>
                <br />
                <motion.span
                  className="text-3xl sm:text-4xl text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {isAuthenticated 
                    ? `Welcome back, ${userName?.split(' ')[0] || 'User'}!` 
                    : 'Organize Better, Together'
                  }
                </motion.span>
              </motion.h1>
            </motion.div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.3}>
            <motion.p 
              className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isAuthenticated ? (
                "Ready to tackle your tasks? Your dashboard is waiting with all your projects and team activities."
              ) : (
                "The modern task management platform for teams. Inspired by Linear's simplicity, built for Indonesian teams who value collaboration and clear organization."
              )}
            </motion.p>
          </FadeInWhenVisible>

          {/* CTA Buttons */}
          <FadeInWhenVisible delay={0.4}>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-6 flex-col sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {isLoading ? (
                <div className="flex items-center gap-3 py-4">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                  <span className="text-lg text-muted-foreground">Loading your workspace...</span>
                </div>
              ) : (
                <>
                  <ScaleOnHover>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden px-8 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
                      onClick={isAuthenticated ? onDashboard : onGetStarted}
                    >
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ x: 2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0"
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Button>
                  </ScaleOnHover>

                  <ScaleOnHover>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group px-8 py-3 text-base font-semibold border-2 hover:border-primary/50 transition-all hover:shadow-lg"
                      onClick={onViewDemo}
                    >
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ x: 2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Play className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        {isAuthenticated ? 'Explore Features' : 'View Demo'}
                      </motion.span>
                    </Button>
                  </ScaleOnHover>
                </>
              )}
            </motion.div>
          </FadeInWhenVisible>

          {/* Floating Stats or Status */}
          {isAuthenticated && (
            <FadeInWhenVisible delay={0.6}>
              <motion.div 
                className="mt-16 mx-auto max-w-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <ScaleOnHover scale={1.02}>
                  <div className="flex items-center justify-center gap-3 rounded-2xl bg-primary/5 backdrop-blur-sm border border-primary/20 px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-green-500/50 shadow-lg" />
                      <span className="text-sm font-medium">You&apos;re signed in as {userName}</span>
                    </div>
                  </div>
                </ScaleOnHover>
              </motion.div>
            </FadeInWhenVisible>
          )}
        </div>
      </div>
    </section>
  )
}