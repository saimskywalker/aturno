'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

interface AuthProviderProps {
  children: React.ReactNode
  session?: Session | null | undefined
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session ?? null}>{children}</SessionProvider>
}