'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth/signin' 
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (requireAuth && !session) {
      router.push(redirectTo)
      return
    }

    if (!requireAuth && session) {
      router.push('/dashboard')
      return
    }
  }, [session, status, requireAuth, redirectTo, router])

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // If we require auth but don't have a session, don't render children
  if (requireAuth && !session) {
    return null
  }

  // If we don't require auth but have a session, don't render children
  if (!requireAuth && session) {
    return null
  }

  return <>{children}</>
}