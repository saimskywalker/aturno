'use client'

// UI Components from organized frontend structure
import { Button, ThemeToggle, Logo } from '@/frontend/components/ui'
import { 
  Container, 
  Header, 
  HeaderContent, 
  Section, 
  Stack,
  PageLayout,
  MainNav
} from '@/components/layout'

// Feature Components
import { SignInButton, UserAvatar, SignOutButton } from '@/features/auth'

// Screen Components  
import { 
  HeroSection, 
  FeatureCards, 
  TestimonialsSection,
  PricingSection,
  FAQSection,
  AboutSection,
  CTASection,
  FooterSection,
  DemoModal
} from '@/screens/landing'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showDemoModal, setShowDemoModal] = useState(false)
  
  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      // Trigger sign-in flow
      const signInButton = document.querySelector('[data-signin-button]') as HTMLButtonElement
      signInButton?.click()
    }
  }
  
  const handleViewDemo = () => {
    setShowDemoModal(true)
  }
  
  const handleFeatureClick = (href: string) => {
    router.push(href)
  }

  const handlePricingSelect = (planId: string) => {
    // Handle pricing plan selection
    if (planId === 'enterprise') {
      // Contact sales
      router.push('/contact?plan=enterprise')
    } else {
      // Start trial or free plan
      handleGetStarted()
    }
  }

  return (
    <>
    <PageLayout
      header={
        <Header variant="sticky">
          <HeaderContent>
            <Stack direction="horizontal" spacing="sm" align="center">
              <Logo className="text-primary" />
              <span className="text-xl font-semibold">Aturno</span>
            </Stack>
            
            <Stack direction="horizontal" spacing="lg" align="center">
              <MainNav />
              <div className="flex items-center gap-4">
                <ThemeToggle />
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                  </div>
                ) : session ? (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => router.push('/dashboard')}
                      className="gap-2"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <UserAvatar size="sm" />
                    <SignOutButton variant="ghost" size="sm" />
                  </>
                ) : (
                  <>
                    <SignInButton variant="outline" size="sm" data-signin-button />
                    <Button size="sm" onClick={handleGetStarted}>Get Started</Button>
                  </>
                )}
              </div>
            </Stack>
          </HeaderContent>
        </Header>
      }
      footer={
        <footer className="border-t border-border/40 py-8">
          <Container>
            <p className="text-muted-foreground text-center">
              © 2025 Aturno. Built with ❤️ for Indonesian teams.
            </p>
          </Container>
        </footer>
      }
      padding="none"
      className="bg-gradient-to-br from-background via-muted/20 to-background"
    >
      {/* Hero Section */}
      <HeroSection
        isAuthenticated={!!session}
        userName={session?.user?.name}
        onGetStarted={handleGetStarted}
        onViewDemo={handleViewDemo}
        onDashboard={() => router.push('/dashboard')}
        isLoading={status === 'loading'}
      />

      {/* Features Section */}
      <FeatureCards
        isAuthenticated={!!session}
        onFeatureClick={handleFeatureClick}
      />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      {!session && (
        <PricingSection onGetStarted={handlePricingSelect} />
      )}

      {/* FAQ Section */}
      <FAQSection />

      {/* About Section */}
      <AboutSection />

      {/* Call to Action Section */}
      <CTASection
        isAuthenticated={!!session}
        onGetStarted={handleGetStarted}
        onViewDemo={handleViewDemo}
      />
    </PageLayout>

    {/* Footer */}
    <FooterSection />

    {/* Demo Modal */}
    <DemoModal
      isOpen={showDemoModal}
      onClose={() => setShowDemoModal(false)}
      onGetStarted={handleGetStarted}
    />
    </>
  )
}
