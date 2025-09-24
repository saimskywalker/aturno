'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function UserAvatar({ size = 'md', className }: UserAvatarProps) {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const user = session.user

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || 'User avatar'}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          className="rounded-full object-cover"
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
          <span className="text-gray-600 font-medium">
            {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
          </span>
        </div>
      )}
    </div>
  )
}