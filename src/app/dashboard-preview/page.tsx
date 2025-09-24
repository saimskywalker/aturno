import Link from 'next/link'
import { Button } from '@/components/ui'
import { Container, Stack, Grid } from '@/components/layout'
import { 
  Home,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  ArrowRight
} from 'lucide-react'

export default function DashboardPreviewPage() {
  const dashboardPages = [
    {
      name: 'Dashboard Home',
      href: '/dashboard',
      icon: Home,
      description: 'Overview with stats, recent tasks, and activity feed'
    },
    {
      name: 'Tasks',
      href: '/dashboard/tasks',
      icon: CheckSquare,
      description: 'Complete task management with filters and search'
    },
    {
      name: 'Projects',
      href: '/dashboard/projects',
      icon: BarChart3,
      description: 'Project overview with progress tracking and team info'
    },
    {
      name: 'Teams',
      href: '/dashboard/teams',
      icon: Users,
      description: 'Team member profiles and role management'
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      description: 'Account settings, notifications, and preferences'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Container className="py-16">
        <Stack spacing="lg" align="center">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Dashboard Structure Complete
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              The complete dashboard system has been built with responsive navigation, 
              authentication guards, and fully functional pages.
            </p>
          </div>

          <Grid cols={2} gap="lg" className="w-full max-w-4xl">
            {dashboardPages.map((page) => {
              const Icon = page.icon
              return (
                <Link key={page.href} href={page.href}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all hover:border-accent/50 group">
                    <Stack spacing="md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                          {page.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all ml-auto" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {page.description}
                      </p>
                    </Stack>
                  </div>
                </Link>
              )
            })}
          </Grid>

          <div className="text-center pt-8">
            <Stack spacing="md" align="center">
              <div className="text-sm text-muted-foreground">
                <p><strong>Note:</strong> Authentication is required to access dashboard pages.</p>
                <p>The dashboard includes responsive navigation, proper routing, and auth guards.</p>
              </div>
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="outline">← Back to Home</Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline">View Layout Demo</Button>
                </Link>
              </div>
            </Stack>
          </div>
        </Stack>
      </Container>
    </div>
  )
}