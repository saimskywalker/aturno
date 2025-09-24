'use client'

import { useSession, getProviders, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Button } from '@/components/ui'
import { Container, Stack } from '@/components/layout'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers/index'

function SignInContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingIn, setSigningIn] = useState(false)
  
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
      return
    }

    const setupProviders = async () => {
      const res = await getProviders()
      setProviders(res)
      setLoading(false)
    }
    
    setupProviders()
  }, [session, router, callbackUrl])

  const handleSignIn = async (providerId: string) => {
    setSigningIn(true)
    try {
      await signIn(providerId, { callbackUrl })
    } catch (error) {
      setSigningIn(false)
      console.error('Sign in error:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Container className="py-16">
        <div className="max-w-md mx-auto">
          {/* Back to home */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Sign in card */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-foreground font-bold text-xl">A</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">Welcome to Aturno</h1>
              <p className="text-muted-foreground">
                Sign in to access your workspace and start organizing better
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-red-800">
                    {error === 'OAuthCallback' ? 
                      'Authentication failed. Please try again.' :
                      'An error occurred during sign in. Please try again.'
                    }
                  </p>
                </div>
              </div>
            )}

            <Stack spacing="md">
              {providers && Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => handleSignIn(provider.id)}
                  disabled={signingIn}
                  className="w-full gap-3 py-6"
                  size="lg"
                >
                  {signingIn ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  {signingIn ? 'Signing in...' : `Continue with ${provider.name}`}
                </Button>
              ))}
            </Stack>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy.
                <br />
                Your data is secure and will never be shared with third parties.
              </p>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              New to Aturno?{' '}
              <Link href="/" className="text-accent hover:underline">
                Learn more about our features
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading sign in page...</p>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}