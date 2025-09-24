'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui'

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Test Page</h1>

        {/* Theme Controls */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Theme Controls</h2>
          <p className="mb-4">Current theme: <strong>{theme}</strong></p>
          
          <div className="flex gap-4">
            <Button
              onClick={() => setTheme('light')}
              variant={theme === 'light' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Sun className="w-4 h-4" />
              Light
            </Button>
            <Button
              onClick={() => setTheme('dark')}
              variant={theme === 'dark' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Moon className="w-4 h-4" />
              Dark
            </Button>
            <Button
              onClick={() => setTheme('system')}
              variant={theme === 'system' ? 'default' : 'outline'}
              className="gap-2"
            >
              <Monitor className="w-4 h-4" />
              System
            </Button>
          </div>
        </div>

        {/* Color Palette Test */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background border border-border p-4 rounded">
              <div className="w-full h-8 bg-background border mb-2"></div>
              <p className="text-sm">Background</p>
            </div>
            <div className="bg-muted border border-border p-4 rounded">
              <div className="w-full h-8 bg-muted border mb-2"></div>
              <p className="text-sm">Muted</p>
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded">
              <div className="w-full h-8 bg-accent mb-2 rounded"></div>
              <p className="text-sm">Accent</p>
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 rounded">
              <div className="w-full h-8 bg-secondary mb-2 rounded"></div>
              <p className="text-sm">Secondary</p>
            </div>
          </div>
        </div>

        {/* UI Components Test */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">UI Components</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Form Elements</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Test input"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <textarea
                  placeholder="Test textarea"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Buttons</h3>
              <div className="flex gap-2 flex-wrap">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Text Colors</h3>
              <p className="text-foreground">Foreground text</p>
              <p className="text-muted-foreground">Muted foreground text</p>
              <p className="text-accent">Accent text</p>
              <p className="text-destructive">Destructive text</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>✅ If you can see different colors when switching themes, the theme system is working correctly!</p>
        </div>
      </div>
    </div>
  )
}