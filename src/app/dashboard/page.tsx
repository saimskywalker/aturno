import { 
  Container,
  Stack,
  Grid,
  GridItem,
  Section,
  DashboardLayout
} from '@/components/layout'
import { AuthGuard } from '@/features/auth'
import { Button } from '@/components/ui'
import { 
  Plus,
  BarChart3,
  CheckCircle2,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Active Tasks',
      value: '24',
      change: '+3 from yesterday',
      icon: CheckCircle2,
      color: 'text-blue-600'
    },
    {
      title: 'Completed',
      value: '156',
      change: '+12 this week',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: '8',
      change: '+2 new members',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Projects',
      value: '6',
      change: '2 active',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const recentTasks = [
    {
      id: 1,
      title: 'Review design mockups',
      project: 'Website Redesign',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Sarah Chen',
      dueDate: '2025-08-18'
    },
    {
      id: 2,
      title: 'Set up CI/CD pipeline',
      project: 'Mobile App',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'John Doe',
      dueDate: '2025-08-20'
    },
    {
      id: 3,
      title: 'User testing session',
      project: 'Dashboard v2',
      status: 'Completed',
      priority: 'High',
      assignee: 'Maria Garcia',
      dueDate: '2025-08-17'
    }
  ]

  const quickActions = [
    { label: 'New Task', icon: Plus, variant: 'default' as const },
    { label: 'New Project', icon: Zap, variant: 'outline' as const },
    { label: 'Schedule Meeting', icon: Calendar, variant: 'outline' as const },
    { label: 'View Reports', icon: BarChart3, variant: 'outline' as const }
  ]

  return (
    <AuthGuard>
      <DashboardLayout>
        <Container className="py-8">
          <Stack spacing="lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here&apos;s what&apos;s happening with your projects.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <Section>
              <Stack spacing="md">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button 
                        key={index}
                        variant={action.variant}
                        size="sm"
                        className="gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {action.label}
                      </Button>
                    )
                  })}
                </div>
              </Stack>
            </Section>

            {/* Stats Grid */}
            <Section>
              <Stack spacing="md">
                <h2 className="text-xl font-semibold">Overview</h2>
                <Grid cols={4} gap="md">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="p-6 bg-card border border-border rounded-lg">
                        <Stack spacing="sm">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <Icon className={`w-4 h-4 ${stat.color}`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                          </div>
                        </Stack>
                      </div>
                    )
                  })}
                </Grid>
              </Stack>
            </Section>

            {/* Main Content Grid */}
            <Grid cols={3} gap="lg">
              {/* Recent Tasks */}
              <GridItem span={2}>
                <div className="bg-card border border-border rounded-lg p-6">
                  <Stack spacing="md">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recent Tasks</h3>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                    <div className="space-y-4">
                      {recentTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium">{task.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{task.project}</span>
                              <span>•</span>
                              <span>{task.assignee}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.dueDate}
                              </span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 text-xs rounded-full ${
                            task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Stack>
                </div>
              </GridItem>

              {/* Activity Feed */}
              <GridItem>
                <div className="bg-card border border-border rounded-lg p-6">
                  <Stack spacing="md">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        {
                          action: 'Task completed',
                          detail: 'Review design mockups',
                          time: '2 hours ago',
                          user: 'Sarah Chen'
                        },
                        {
                          action: 'New comment',
                          detail: 'Mobile App project',
                          time: '4 hours ago',
                          user: 'John Doe'
                        },
                        {
                          action: 'Project created',
                          detail: 'Dashboard v2',
                          time: '1 day ago',
                          user: 'Maria Garcia'
                        },
                        {
                          action: 'Team member added',
                          detail: 'Alex Kumar joined',
                          time: '2 days ago',
                          user: 'Admin'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.detail}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time} • {activity.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Stack>
                </div>
              </GridItem>
            </Grid>
          </Stack>
        </Container>
      </DashboardLayout>
    </AuthGuard>
  )
}