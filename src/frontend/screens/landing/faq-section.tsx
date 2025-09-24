'use client'

import { Card, CardContent } from '@/components/ui'
import { ChevronDown, HelpCircle, Search, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover } from '@/components/ui/motion'
import { useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'pricing' | 'technical' | 'support'
  popular?: boolean
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How does Aturno integrate with Google Sheets?',
    answer: 'Aturno seamlessly connects with your existing Google Sheets. Simply authorize access and choose which sheets to sync. All your tasks, projects, and data will automatically sync in real-time, so your team can work in the tools they already know while getting the power of modern task management.',
    category: 'technical',
    popular: true
  },
  {
    id: '2',
    question: 'Can I try Aturno for free?',
    answer: 'Yes! We offer a generous free tier that includes up to 5 team members, basic task management, and Google Sheets integration. You can also start a 14-day free trial of our Professional plan to experience all advanced features before committing.',
    category: 'pricing',
    popular: true
  },
  {
    id: '3',
    question: 'Is my data secure with Aturno?',
    answer: 'Absolutely. We take security seriously with enterprise-grade encryption, regular security audits, and compliance with international data protection standards. Your data is encrypted both in transit and at rest, and we never sell or share your information with third parties.',
    category: 'technical',
    popular: true
  },
  {
    id: '4',
    question: 'How do I invite team members?',
    answer: 'Inviting team members is simple! Go to your team settings, click "Invite Members," and enter their email addresses. They\'ll receive an invitation link to join your workspace. You can also set different permission levels for each team member.',
    category: 'general'
  },
  {
    id: '5',
    question: 'What happens if I exceed my plan limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. For the free plan, you can upgrade anytime. For paid plans, we offer flexible overage options or you can upgrade to a higher tier. We never suddenly cut off access to your data.',
    category: 'pricing'
  },
  {
    id: '6',
    question: 'Can I customize workflows and templates?',
    answer: 'Yes! Professional and Enterprise plans include custom templates and workflow builders. Create templates that match your team\'s unique processes, set up automated workflows, and standardize how your team works across all projects.',
    category: 'general'
  },
  {
    id: '7',
    question: 'Do you offer mobile apps?',
    answer: 'Our web app is fully responsive and works great on mobile devices. Native mobile apps for iOS and Android are coming soon! You\'ll get all the core features optimized for mobile use, including offline task creation and push notifications.',
    category: 'technical'
  },
  {
    id: '8',
    question: 'How does billing work for teams?',
    answer: 'Billing is simple and transparent. You pay per active team member per month. If you add members mid-cycle, you\'ll be prorated. If members leave, you won\'t be charged for them in the next cycle. Annual billing offers significant discounts.',
    category: 'pricing'
  },
  {
    id: '9',
    question: 'What kind of support do you provide?',
    answer: 'Free users get community support and comprehensive documentation. Professional users get priority email support with 24-hour response times. Enterprise customers get dedicated support with phone access and custom training sessions.',
    category: 'support'
  },
  {
    id: '10',
    question: 'Can I export my data if I decide to leave?',
    answer: 'Of course! You own your data. You can export all your tasks, projects, comments, and attachments at any time in standard formats (CSV, JSON, PDF). We also provide migration guides to help you move to other platforms if needed.',
    category: 'general'
  }
]

const categories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle },
  { id: 'general', name: 'General', icon: MessageCircle },
  { id: 'pricing', name: 'Pricing', icon: MessageCircle },
  { id: 'technical', name: 'Technical', icon: MessageCircle },
  { id: 'support', name: 'Support', icon: MessageCircle }
]

interface FAQSectionProps {
  className?: string
}

export function FAQSection({ className }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>(['1', '2', '3']) // Start with popular ones open
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Aturno. Can&apos;t find what you&apos;re looking for? 
              Chat with our friendly team.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Search and Filters */}
        <FadeInWhenVisible delay={0.1}>
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <FadeInWhenVisible key={faq.id} delay={index * 0.05}>
                <ScaleOnHover scale={1.01}>
                  <Card className={`border-2 transition-all duration-200 ${
                    isOpen ? 'border-primary/50 shadow-lg' : 'border-border hover:border-border/80'
                  } ${faq.popular ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : ''}`}>
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {faq.popular && (
                            <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                              Popular
                            </div>
                          )}
                          <h3 className="font-semibold text-foreground pr-4">
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0">
                              <div className="border-t border-border pt-4">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </FadeInWhenVisible>
            )
          })}
        </div>

        {/* No Results State */}
        {filteredFaqs.length === 0 && (
          <FadeInWhenVisible>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          </FadeInWhenVisible>
        )}

        {/* Contact Support CTA */}
        <FadeInWhenVisible delay={0.3}>
          <div className="mt-16 text-center">
            <Card className="inline-block border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="px-8 py-6">
                <h3 className="font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    Schedule Demo
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}