'use client'

import { 
  Container,
  Stack,
  Grid,
  Section,
  DashboardLayout
} from '@/components/layout'
import { AuthGuard, UserAvatar } from '@/features/auth'
import { Button } from '@/components/ui'
import { 
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Settings,
  Save,
  Upload
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive notifications'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Manage your account security settings'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your dashboard'
    },
    {
      id: 'billing',
      title: 'Billing & Plans',
      icon: CreditCard,
      description: 'Manage your subscription and billing information'
    }
  ]

  return (
    <AuthGuard>
      <DashboardLayout>
        <Container className="py-8">
          <Stack spacing="lg">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>

            <Grid cols={3} gap="lg">
              {/* Settings Navigation */}
              <div className="space-y-2">
                {settingsSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </div>

              {/* Settings Content */}
              <div className="col-span-2 space-y-6">
                {/* Profile Settings */}
                <Section>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Stack spacing="md">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Profile Information</h2>
                      </div>

                      {/* Avatar Upload */}
                      <div className="flex items-center gap-4">
                        <UserAvatar size="lg" />
                        <div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="w-4 h-4" />
                            Change Avatar
                          </Button>
                          <p className="text-sm text-muted-foreground mt-1">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <Grid cols={2} gap="md">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name</label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      </Grid>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Job Title</label>
                        <input
                          type="text"
                          defaultValue="Product Manager"
                          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                          rows={3}
                          defaultValue="Passionate about building great products and leading high-performing teams."
                          className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        />
                      </div>

                      <Button className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </Stack>
                  </div>
                </Section>

                {/* Notification Settings */}
                <Section>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Stack spacing="md">
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Notification Preferences</h2>
                      </div>

                      <div className="space-y-4">
                        {[
                          { title: 'Email Notifications', description: 'Receive notifications via email', enabled: true },
                          { title: 'Task Updates', description: 'Notifications when tasks are updated', enabled: true },
                          { title: 'Project Mentions', description: 'When you are mentioned in projects', enabled: true },
                          { title: 'Weekly Summary', description: 'Weekly progress summary emails', enabled: false },
                          { title: 'Marketing Emails', description: 'Product updates and newsletters', enabled: false }
                        ].map((notification, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">{notification.title}</p>
                              <p className="text-sm text-muted-foreground">{notification.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={notification.enabled}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                            </label>
                          </div>
                        ))}
                      </div>

                      <Button className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </Button>
                    </Stack>
                  </div>
                </Section>

                {/* Appearance Settings */}
                <Section>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Stack spacing="md">
                      <div className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Appearance</h2>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { name: 'Light', value: 'light' },
                            { name: 'Dark', value: 'dark' },
                            { name: 'System', value: 'system' }
                          ].map((themeOption) => (
                            <button
                              key={themeOption.value}
                              onClick={() => setTheme(themeOption.value)}
                              className={`p-3 border rounded-lg text-left transition-colors ${
                                theme === themeOption.value ? 'border-accent bg-accent/5' : 'border-border hover:bg-muted'
                              }`}
                            >
                              <p className="font-medium">{themeOption.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {themeOption.value === 'system' ? 'Adapt to system' : `${themeOption.name} mode`}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">Language</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                          <option>English (US)</option>
                          <option>Bahasa Indonesia</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>

                      <Button className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Appearance
                      </Button>
                    </Stack>
                  </div>
                </Section>
              </div>
            </Grid>
          </Stack>
        </Container>
      </DashboardLayout>
    </AuthGuard>
  )
}