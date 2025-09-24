'use client'

import { Card, CardContent } from '@/components/ui'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover } from '@/components/ui/motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechStart Indonesia",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "Aturno transformed how our team manages projects. The intuitive interface and powerful features helped us increase productivity by 40% in just two months.",
    featured: true
  },
  {
    id: 2,
    name: "Ahmad Rizki",
    role: "Engineering Lead",
    company: "Digital Nusantara",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "Finally, a task management tool built for Indonesian teams. The Google Sheets integration is brilliant - no learning curve for our team!"
  },
  {
    id: 3,
    name: "Maya Sari",
    role: "Startup Founder",
    company: "EcoTech Solutions",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "As a bootstrapped startup, we needed something powerful yet affordable. Aturno gives us enterprise-level features without the complexity."
  },
  {
    id: 4,
    name: "David Tan",
    role: "Creative Director",
    company: "Pixel Studio",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "The design is clean and the user experience is exceptional. Our creative team adopted it immediately - that says everything!"
  },
  {
    id: 5,
    name: "Indira Putri",
    role: "Operations Manager", 
    company: "Jakarta Consulting",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    content: "Budget tracking integrated with task management is a game-changer. We can see project profitability in real-time."
  },
  {
    id: 6,
    name: "Budi Santoso",
    role: "Tech Lead",
    company: "Code Factory",
    avatar: "/api/placeholder/64/64", 
    rating: 5,
    content: "Lightning fast, reliable, and the team collaboration features keep everyone aligned. Worth every rupiah!"
  }
]

const stats = [
  { number: "2,500+", label: "Active Teams" },
  { number: "50,000+", label: "Tasks Completed" },
  { number: "99.9%", label: "Uptime" },
  { number: "4.8/5", label: "User Rating" }
]

interface TestimonialsSectionProps {
  className?: string
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]!

  return (
    <section className={`py-24 sm:py-32 bg-gradient-to-br from-muted/30 via-background to-muted/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Loved by teams across Indonesia
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of teams who have transformed their productivity with Aturno
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Featured Testimonial Carousel */}
        <FadeInWhenVisible delay={0.2}>
          <div className="relative mx-auto max-w-4xl mb-16">
            <Card className="border-2 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 sm:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-center mb-6">
                      <Quote className="h-12 w-12 text-primary/20" />
                    </div>

                    <blockquote className="text-xl sm:text-2xl font-medium text-center leading-relaxed mb-8">
                      &ldquo;{currentTestimonial.content}&rdquo;
                    </blockquote>

                    <div className="flex items-center justify-center gap-4">
                      <div className="relative h-16 w-16">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-lg font-semibold text-primary">
                              {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="font-semibold text-foreground">{currentTestimonial.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {currentTestimonial.role} at {currentTestimonial.company}
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                          {Array.from({ length: currentTestimonial.rating }, (_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={prevTestimonial}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index)
                          setIsAutoPlaying(false)
                        }}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex 
                            ? 'w-8 bg-primary' 
                            : 'w-2 bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInWhenVisible>

        {/* Stats Grid */}
        <FadeInWhenVisible delay={0.4}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {stats.map((stat, index) => (
              <ScaleOnHover key={index}>
                <Card className="text-center border-2 bg-gradient-to-br from-card to-card/50">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Testimonial Grid */}
        <FadeInWhenVisible delay={0.6}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <ScaleOnHover key={testimonial.id}>
                <Card className="h-full border-2 bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}