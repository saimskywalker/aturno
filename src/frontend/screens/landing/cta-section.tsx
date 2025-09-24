'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover, FloatingElement } from '@/components/ui/motion'

interface CTASectionProps {
  isAuthenticated: boolean
  onGetStarted: () => void
  onViewDemo: () => void
}

export function CTASection({ isAuthenticated, onGetStarted, onViewDemo }: CTASectionProps) {
  if (isAuthenticated) {
    return (
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <FloatingElement amplitude={5} duration={3} className="inline-block mb-4">
                <Sparkles className="h-12 w-12 text-primary" />
              </FloatingElement>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Ready to boost your productivity?
              </h2>
              <p className="text-lg text-muted-foreground">
                Your workspace is set up and ready. Dive into your dashboard and start organizing your tasks like a pro.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { icon: Users, title: 'Team Ready', desc: 'Invite colleagues and collaborate' },
                  { icon: Zap, title: 'Lightning Fast', desc: 'Quick setup, instant productivity' },
                  { icon: Sparkles, title: 'Smart Features', desc: 'AI-powered task organization' }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <ScaleOnHover key={index}>
                      <Card className="text-center border-2 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </ScaleOnHover>
                  )
                })}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center">
            <FloatingElement amplitude={10} duration={4} className="inline-block mb-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
            </FloatingElement>

            <motion.h2 
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to transform your team&apos;s productivity?
            </motion.h2>

            <motion.p 
              className="text-lg leading-8 text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of Indonesian teams who have already made the switch to smarter task management. 
              Start your free trial today—no credit card required.
            </motion.p>

            <motion.div 
              className="flex items-center justify-center gap-6 flex-col sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ScaleOnHover>
                <Button
                  size="lg"
                  className="group relative overflow-hidden px-8 py-4 text-lg font-semibold shadow-xl transition-all hover:shadow-2xl hover:shadow-primary/25"
                  onClick={onGetStarted}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-3"
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                  
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </ScaleOnHover>

              <ScaleOnHover>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:border-primary/50 transition-all hover:shadow-lg"
                  onClick={onViewDemo}
                >
                  View Demo
                </Button>
              </ScaleOnHover>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="mt-12 pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Trusted by teams at</p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                {['Startup', 'Agency', 'Enterprise', 'Freelancer'].map((type, index) => (
                  <motion.span
                    key={type}
                    className="text-sm font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}