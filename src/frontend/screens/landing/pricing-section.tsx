'use client'

import { Button, Card, CardContent, CardHeader } from '@/components/ui'
import { Check, Zap, Crown, Building, ArrowRight, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover } from '@/components/ui/motion'
import { useState } from 'react'

interface PricingPlan {
  id: string
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  limitations?: string[]
  popular?: boolean
  cta: string
  color: string
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for small teams getting started',
    icon: Zap,
    features: [
      'Up to 5 team members',
      'Basic task management',
      'Google Sheets integration',
      'Email support',
      '1GB storage',
      'Basic templates'
    ],
    limitations: ['Limited to 100 tasks/month', 'Basic reporting only'],
    cta: 'Start Free',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: { monthly: 49000, yearly: 490000 },
    description: 'Advanced features for growing teams',
    icon: Crown,
    features: [
      'Up to 25 team members',
      'Advanced task management',
      'Real-time collaboration',
      'Priority support',
      '10GB storage',
      'Custom templates',
      'Advanced reporting',
      'Budget tracking',
      'Time tracking',
      'Mobile apps'
    ],
    popular: true,
    cta: 'Start 14-Day Free Trial',
    color: 'from-violet-500/20 to-purple-500/20'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 149000, yearly: 1490000 },
    description: 'Full power for large organizations',
    icon: Building,
    features: [
      'Unlimited team members',
      'Enterprise-grade security',
      'Custom integrations',
      'Dedicated support',
      'Unlimited storage',
      'White-label options',
      'Advanced analytics',
      'API access',
      'SSO integration',
      'Custom workflows',
      'SLA guarantee',
      'Training sessions'
    ],
    cta: 'Contact Sales',
    color: 'from-amber-500/20 to-orange-500/20'
  }
]

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect immediately."
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees, no hidden costs. You only pay for your subscription and get access to all features in your plan."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and Indonesian payment methods including OVO, GoPay, and DANA."
  }
]

interface PricingSectionProps {
  onGetStarted?: (planId: string) => void
  className?: string
}

export function PricingSection({ onGetStarted, className }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (onGetStarted) {
      onGetStarted(planId)
    }
  }

  const yearlyDiscount = billingCycle === 'yearly' ? 17 : 0 // ~17% discount for yearly

  return (
    <section className={`py-24 sm:py-32 bg-gradient-to-br from-background via-muted/10 to-background ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the perfect plan for your team. All plans include our core features with no hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-muted/50 rounded-full p-1 border">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Yearly
                {yearlyDiscount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Save {yearlyDiscount}%
                  </span>
                )}
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const price = plan.price[billingCycle]
            const isSelected = selectedPlan === plan.id

            return (
              <FadeInWhenVisible key={plan.id} delay={index * 0.1}>
                <ScaleOnHover scale={1.02}>
                  <Card 
                    className={`relative border-2 transition-all duration-300 ${
                      plan.popular 
                        ? 'border-primary shadow-xl shadow-primary/10 scale-105' 
                        : isSelected
                        ? 'border-primary/50 shadow-lg'
                        : 'border-border hover:border-border/80 hover:shadow-md'
                    } ${plan.popular ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : 'bg-card'}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto h-12 w-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold">
                            {price === 0 ? 'Free' : formatPrice(price).split(',')[0]}
                          </span>
                          {price > 0 && (
                            <>
                              <span className="text-lg text-muted-foreground">
                                ,{formatPrice(price).split(',')[1]}
                              </span>
                              <span className="text-muted-foreground">
                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                              </span>
                            </>
                          )}
                        </div>
                        {billingCycle === 'yearly' && price > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(Math.round(price / 12))}/month when billed yearly
                          </p>
                        )}
                      </div>

                      {/* Features List */}
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                          >
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                        {plan.limitations?.map((limitation, limitIndex) => (
                          <li key={`limit-${limitIndex}`} className="flex items-start gap-3 opacity-60">
                            <div className="h-5 w-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="h-1 w-3 bg-muted-foreground rounded" />
                            </div>
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full group ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'variant-outline'
                        }`}
                        size="lg"
                      >
                        {plan.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </FadeInWhenVisible>
            )
          })}
        </div>

        {/* Money Back Guarantee */}
        <FadeInWhenVisible delay={0.4}>
          <div className="text-center">
            <Card className="inline-block bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30">
              <CardContent className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      30-day money-back guarantee
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      Not satisfied? Get a full refund, no questions asked.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInWhenVisible>

        {/* FAQ Section */}
        <FadeInWhenVisible delay={0.6}>
          <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}