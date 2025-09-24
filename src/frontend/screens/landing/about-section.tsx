'use client'

import { Card, CardContent } from '@/components/ui'
import { MapPin, Calendar, Users, Award, Heart, Code, Linkedin, Twitter, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeInWhenVisible, ScaleOnHover, FloatingElement } from '@/components/ui/motion'

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
  location: string
  expertise: string[]
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

const team: TeamMember[] = [
  {
    name: "Ari Wibowo",
    role: "Founder & CEO",
    bio: "Former engineering lead at Tokopedia. Passionate about building tools that help Indonesian teams work better together.",
    avatar: "/api/placeholder/128/128",
    location: "Jakarta, Indonesia",
    expertise: ["Product Strategy", "Team Leadership", "Indonesian Market"],
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Sarah Putri",
    role: "Head of Engineering",
    bio: "Full-stack engineer with 8+ years experience. Previously at Gojek, building scalable systems for millions of users.",
    avatar: "/api/placeholder/128/128", 
    location: "Bandung, Indonesia",
    expertise: ["React", "Node.js", "System Architecture"],
    social: {
      github: "#",
      linkedin: "#"
    }
  },
  {
    name: "Budi Santoso",
    role: "Head of Design",
    bio: "UX designer focused on creating intuitive experiences. Believes great design should feel invisible and empower users.",
    avatar: "/api/placeholder/128/128",
    location: "Yogyakarta, Indonesia", 
    expertise: ["UX Design", "Design Systems", "User Research"],
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Maya Chen",
    role: "Customer Success Lead",
    bio: "Dedicated to helping teams succeed with Aturno. Former consultant who understands the challenges of project management.",
    avatar: "/api/placeholder/128/128",
    location: "Surabaya, Indonesia",
    expertise: ["Customer Success", "Team Training", "Process Optimization"], 
    social: {
      linkedin: "#"
    }
  }
]

const companyStats = [
  { icon: Users, value: "2,500+", label: "Teams Using Aturno" },
  { icon: MapPin, value: "25+", label: "Cities Across Indonesia" },
  { icon: Calendar, value: "2", label: "Years Building Better Tools" },
  { icon: Award, value: "99.9%", label: "Uptime Reliability" }
]

const values = [
  {
    icon: Heart,
    title: "Built for Indonesia",
    description: "We understand the unique needs of Indonesian teams and build features that matter to local businesses."
  },
  {
    icon: Users,
    title: "Team-First Approach", 
    description: "Great work happens when teams collaborate seamlessly. Every feature is designed with teamwork in mind."
  },
  {
    icon: Code,
    title: "Simple by Design",
    description: "Complex problems deserve simple solutions. We believe powerful tools should be easy to use and quick to learn."
  }
]

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section className={`py-24 sm:py-32 bg-gradient-to-br from-muted/20 via-background to-muted/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Company Story */}
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Building better tools for Indonesian teams
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Aturno was born from a simple frustration: why is it so hard for teams to stay organized? 
                After years of using complex, foreign-built tools that didn&apos;t fit how Indonesian teams actually work, 
                we decided to build something better.
              </p>
              <p>
                We started with a core belief: great project management shouldn&apos;t require changing how your team works. 
                Instead, it should amplify your team&apos;s natural strengths and make collaboration feel effortless.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Company Stats */}
        <FadeInWhenVisible delay={0.2}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
            {companyStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <ScaleOnHover key={index}>
                  <Card className="text-center border-2 bg-gradient-to-br from-card to-card/50">
                    <CardContent className="p-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              )
            })}
          </div>
        </FadeInWhenVisible>

        {/* Company Values */}
        <FadeInWhenVisible delay={0.3}>
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center mb-12">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <ScaleOnHover key={index}>
                    <Card className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-card to-card/50">
                      <CardContent className="p-8 text-center">
                        <FloatingElement amplitude={5} duration={3 + index * 0.5}>
                          <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                        </FloatingElement>
                        <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                )
              })}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Team Section */}
        <FadeInWhenVisible delay={0.4}>
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Meet Our Team</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A passionate group of builders, designers, and problem-solvers dedicated to making work better for teams across Indonesia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <FadeInWhenVisible key={index} delay={index * 0.1}>
                  <ScaleOnHover scale={1.03}>
                    <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                      <CardContent className="p-6 text-center">
                        {/* Avatar */}
                        <div className="relative mb-4">
                          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          {/* Status indicator */}
                          <div className="absolute bottom-2 right-1/2 transform translate-x-6 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                        </div>

                        {/* Info */}
                        <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                        <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {member.bio}
                        </p>

                        {/* Location */}
                        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                          <MapPin className="h-3 w-3" />
                          {member.location}
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {member.expertise.slice(0, 2).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.expertise.length > 2 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                              +{member.expertise.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-3">
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.github && (
                            <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors">
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Join Us CTA */}
        <FadeInWhenVisible delay={0.6}>
          <div className="mt-20 text-center">
            <Card className="inline-block border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="px-8 py-6">
                <h3 className="text-xl font-bold mb-2">Join Our Mission</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  We&apos;re always looking for talented people who share our passion for building great products.
                </p>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  View Open Positions
                </button>
              </CardContent>
            </Card>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}