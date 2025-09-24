'use client'

import { Button, Card, CardContent } from '@/components/ui'
import { X, Play, ChevronLeft, ChevronRight, ExternalLink, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface DemoStep {
  id: string
  title: string
  description: string
  image: string
  duration: string
  category: 'dashboard' | 'tasks' | 'projects' | 'teams' | 'mobile'
}

const demoSteps: DemoStep[] = [
  {
    id: '1',
    title: 'Modern Dashboard Overview',
    description: 'Get a complete view of your team\'s progress with our intuitive dashboard. See active projects, upcoming deadlines, and team performance at a glance.',
    image: '/api/placeholder/800/500',
    duration: '0:30',
    category: 'dashboard'
  },
  {
    id: '2', 
    title: 'Task Management Made Simple',
    description: 'Create, organize, and track tasks with drag-and-drop simplicity. Set priorities, assign team members, and never miss a deadline.',
    image: '/api/placeholder/800/500',
    duration: '0:45',
    category: 'tasks'
  },
  {
    id: '3',
    title: 'Project Planning & Budget Tracking',
    description: 'Plan projects with built-in budget tracking. Monitor expenses in real-time and keep your projects profitable.',
    image: '/api/placeholder/800/500',
    duration: '1:00',
    category: 'projects'
  },
  {
    id: '4',
    title: 'Team Collaboration Features',
    description: 'Collaborate seamlessly with your team. Share files, leave comments, and stay aligned with real-time updates.',
    image: '/api/placeholder/800/500',
    duration: '0:40',
    category: 'teams'
  },
  {
    id: '5',
    title: 'Mobile Experience',
    description: 'Work from anywhere with our responsive design. Full functionality on mobile devices with touch-optimized interactions.',
    image: '/api/placeholder/800/500',
    duration: '0:35',
    category: 'mobile'
  }
]

const categories = [
  { id: 'all', name: 'All Features', count: 5 },
  { id: 'dashboard', name: 'Dashboard', count: 1 },
  { id: 'tasks', name: 'Tasks', count: 1 },
  { id: 'projects', name: 'Projects', count: 1 },
  { id: 'teams', name: 'Teams', count: 1 },
  { id: 'mobile', name: 'Mobile', count: 1 }
]

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  onGetStarted?: () => void
}

export function DemoModal({ isOpen, onClose, onGetStarted }: DemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || !isOpen) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % filteredSteps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const filteredSteps = selectedCategory === 'all' 
    ? demoSteps 
    : demoSteps.filter(step => step.category === selectedCategory)

  const currentDemoStep = filteredSteps[currentStep]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % filteredSteps.length)
    setIsAutoPlaying(false)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + filteredSteps.length) % filteredSteps.length)
    setIsAutoPlaying(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-2 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold">Aturno Demo</h2>
                    <p className="text-muted-foreground">
                      See how Aturno can transform your team&apos;s productivity
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    >
                      <Play className={`h-4 w-4 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
                      {isAutoPlaying ? 'Pause' : 'Auto Play'}
                    </Button>
                    
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id)
                          setCurrentStep(0)
                          setIsAutoPlaying(false)
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {category.name}
                        <span className="ml-2 text-xs opacity-75">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 min-h-[600px]">
                  {/* Demo Preview */}
                  <div className="lg:col-span-2 relative">
                    <div className="relative h-full bg-muted/30">
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevStep}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-background/90 hover:bg-background border border-border rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={nextStep}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-background/90 hover:bg-background border border-border rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Demo Image/Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${selectedCategory}-${currentStep}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex items-center justify-center p-8"
                        >
                          <div className="relative w-full h-full max-w-4xl max-h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-border/50 flex items-center justify-center">
                            {/* Placeholder for demo screenshot */}
                            <div className="text-center">
                              <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Play className="h-12 w-12 text-primary" />
                              </div>
                              <h3 className="text-lg font-semibold mb-2">
                                {currentDemoStep?.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 max-w-md">
                                Interactive demo screenshot would appear here
                              </p>
                              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Live Demo</span>
                                <span>•</span>
                                <span>{currentDemoStep?.duration}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Progress Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {filteredSteps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentStep(index)
                              setIsAutoPlaying(false)
                            }}
                            className={`h-2 rounded-full transition-all ${
                              index === currentStep 
                                ? 'w-8 bg-primary' 
                                : 'w-2 bg-primary/30 hover:bg-primary/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="bg-muted/20 p-6 border-l border-border">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedCategory}-${currentStep}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                              {currentDemoStep?.category}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {currentStep + 1} of {filteredSteps.length}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3">
                            {currentDemoStep?.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {currentDemoStep?.description}
                          </p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="space-y-3 mb-6">
                          <h4 className="font-semibold text-sm">Key Features:</h4>
                          <div className="space-y-2">
                            {[
                              'Drag & drop interface',
                              'Real-time collaboration', 
                              'Mobile-responsive design',
                              'Google Sheets integration'
                            ].map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span className="text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button 
                            onClick={onGetStarted}
                            className="w-full group"
                            size="lg"
                          >
                            Start Free Trial
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            size="sm"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Screenshots
                          </Button>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-6 pt-6 border-t border-border">
                          <p className="text-xs text-muted-foreground text-center">
                            Want a personalized demo?{' '}
                            <button className="text-primary hover:underline">
                              Schedule a call
                            </button>
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}