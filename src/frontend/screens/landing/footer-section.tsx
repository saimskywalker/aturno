'use client'

import { Button, Card, CardContent, Separator } from '@/components/ui'
import { 
  Mail, 
  ArrowRight, 
  Heart,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Globe,
  FileText,
  Shield,
  HelpCircle,
  BookOpen,
  Code,
  MessageCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover } from '@/components/ui/motion'
import { useState } from 'react'
import Link from 'next/link'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'API', href: '/api-docs' },
      { name: 'Changelog', href: '/changelog' },
      { name: 'Roadmap', href: '/roadmap' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
      { name: 'Templates', href: '/templates' },
      { name: 'Webinars', href: '/webinars' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
      { name: 'Compliance', href: '/compliance' }
    ]
  }
]

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/aturno_id' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/aturno' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/aturno_id' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@aturno' }
]

const quickActions = [
  { icon: HelpCircle, text: 'Get Support', href: '/support' },
  { icon: BookOpen, text: 'Documentation', href: '/docs' },
  { icon: Code, text: 'Developer API', href: '/api' },
  { icon: MessageCircle, text: 'Community', href: '/community' }
]

interface FooterSectionProps {
  className?: string
}

export function FooterSection({ className }: FooterSectionProps) {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubscribed(true)
    setIsSubscribing(false)
    setEmail('')
    
    // Reset success state after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className={`bg-gradient-to-br from-muted/30 via-background to-muted/20 border-t border-border/40 ${className}`}>
      {/* Newsletter Section */}
      <div className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <FadeInWhenVisible>
            <Card className="border-2 bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
              <CardContent className="p-8 sm:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                      Stay in the loop
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Get the latest updates on new features, product tips, and insights 
                      to help your team work better. No spam, just value.
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Weekly insights
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Feature updates
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Tips & tricks
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          disabled={isSubscribing}
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={!email || isSubscribing}
                        className="w-full group"
                        size="lg"
                      >
                        {isSubscribing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            Subscribing...
                          </>
                        ) : subscribed ? (
                          <>
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2" />
                            Successfully subscribed!
                          </>
                        ) : (
                          <>
                            Subscribe to newsletter
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>
                    
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      By subscribing, you agree to our{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{' '}
                      and consent to receive updates from our team.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <FadeInWhenVisible>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-bold">Aturno</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Modern task management built for Indonesian teams. 
                Simple, powerful, and designed to help your team achieve more together.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:hello@aturno.id" className="hover:text-foreground transition-colors">
                    hello@aturno.id
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  <span>Available in Bahasa Indonesia & English</span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <FadeInWhenVisible delay={index * 0.1}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <FadeInWhenVisible delay={0.4}>
          <div className="mb-12">
            <h4 className="font-semibold text-foreground mb-4 text-center">Quick Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <ScaleOnHover key={index}>
                    <Link href={action.href}>
                      <Card className="border-2 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                          <span className="text-sm font-medium">{action.text}</span>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScaleOnHover>
                )
              })}
            </div>
          </div>
        </FadeInWhenVisible>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <FadeInWhenVisible>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2025 Aturno. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for Indonesian teams.</span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                )
              })}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="border-t border-border/40 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Hosted in Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}