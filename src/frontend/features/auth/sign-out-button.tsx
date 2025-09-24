'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function SignOutButton({ 
  variant = 'outline', 
  size = 'default',
  className 
}: SignOutButtonProps) {
  const handleSignOut = () => {
    signOut({ 
      callbackUrl: '/',
      redirect: true 
    })
  }

  return (
    <Button
      onClick={handleSignOut}
      variant={variant}
      size={size}
      className={className}
    >
      Sign out
    </Button>
  )
}