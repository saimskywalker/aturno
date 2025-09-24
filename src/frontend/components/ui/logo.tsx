'use client'

import * as React from 'react'

export function Logo({ className, size = "md" }: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 2L2 8v8c0 8.84 5.6 16.92 14 19.6 8.4-2.68 14-10.76 14-19.6V8L16 2zm0 4l10 4.8V16c0 6.76-4.26 13.04-10 15.2-5.74-2.16-10-8.44-10-15.2v-5.2L16 6z"/>
        <path d="M16 10l-6 3v6l6 3 6-3v-6l-6-3zm0 2.2l3.6 1.8-3.6 1.8-3.6-1.8L16 12.2z"/>
      </svg>
    </div>
  )
}