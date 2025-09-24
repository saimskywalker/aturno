import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { User } from '@/types'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async signIn({ user, account, profile }) {
      // You can add custom sign-in logic here
      // For example, check if user email is in allowed domain
      if (account?.provider === "google") {
        return (profile as { email_verified?: boolean })?.email_verified === true
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  debug: process.env.NODE_ENV === 'development',
}

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
  }
}