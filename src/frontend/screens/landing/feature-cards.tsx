'use client'

import { CheckCircle, Users, BarChart3, Zap, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover } from '@/components/ui/motion'
import { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  href?: string
}

const features: Feature[] = [
  {
    icon: CheckCircle,
    title: 'Task Management',
    description: 'Organize tasks with intuitive workflows, priorities, and team assignments.',
    href: '/dashboard/tasks'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite friends, discuss projects, and work together seamlessly.',
    href: '/dashboard/teams'
  },
  {
    icon: BarChart3,
    title: 'Budget Tracking',
    description: 'Monitor project expenses and stay within budget with detailed analytics.',
    href: '/dashboard/projects'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Stay in sync with live notifications and instant collaboration.',
    href: '/dashboard'
  }
]

interface FeatureCardsProps {
  isAuthenticated: boolean
  onFeatureClick?: (href: string) => void
}

export function FeatureCards({ isAuthenticated, onFeatureClick }: FeatureCardsProps) {
  const handleFeatureClick = (feature: Feature) => {
    if (isAuthenticated && feature.href && onFeatureClick) {
      onFeatureClick(feature.href)
    }
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {isAuthenticated ? 'Your Workspace Features' : 'Powerful Features for Your Team'}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {isAuthenticated 
                ? 'Everything you need to manage tasks, collaborate with your team, and track progress effectively.'
                : 'Discover why teams choose Aturno for their project management needs.'
              }
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FadeInWhenVisible key={index} delay={0.1 * index}>
                <ScaleOnHover scale={isAuthenticated ? 1.05 : 1.02}>
                  <Card 
                    className={`group relative overflow-hidden border-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 ${
                      isAuthenticated 
                        ? 'cursor-pointer hover:border-primary/50' 
                        : 'hover:border-border/80'
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        {/* Icon with animated background */}
                        <motion.div 
                          className="relative"
                          whileHover={{ rotate: isAuthenticated ? 5 : 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg group-hover:shadow-primary/20 transition-all">
                            <Icon className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                          </div>
                          {isAuthenticated && (
                            <motion.div
                              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 shadow-lg opacity-0 group-hover:opacity-100"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            />
                          )}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                            {feature.title}
                            {isAuthenticated && (
                              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            )}
                          </h3>
                          <p className="text-sm leading-6 text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                            {feature.description}
                          </p>
                        </div>

                        {/* Interactive indicator for authenticated users */}
                        {isAuthenticated && (
                          <motion.div
                            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                              <ArrowRight className="h-3 w-3 text-primary" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>

                    {/* Hover gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </Card>
                </ScaleOnHover>
              </FadeInWhenVisible>
            )
          })}
        </div>

        {/* Tech Stack Section */}
        <FadeInWhenVisible delay={0.6}>
          <div className="mt-20">
            <ScaleOnHover scale={1.02}>
              <Card className="mx-auto max-w-2xl bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border-2">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-4">Built with Modern Technology</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Google Sheets API'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-background/80 rounded-full border text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        whileHover={{ y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}