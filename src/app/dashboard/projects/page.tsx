import { 
  Container,
  Stack,
  Grid,
  GridItem,
  DashboardLayout
} from '@/components/layout'
import { AuthGuard } from '@/features/auth'
import { Button } from '@/components/ui'
import { 
  Plus,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  BarChart3,
  Folder,
  TrendingUp
} from 'lucide-react'

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX.',
      status: 'In Progress',
      progress: 65,
      teamMembers: ['Sarah Chen', 'Mike Johnson', 'Lisa Wong'],
      totalTasks: 24,
      completedTasks: 16,
      dueDate: '2025-09-15',
      budget: '$25,000',
      spent: '$16,250',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms.',
      status: 'In Progress',
      progress: 40,
      teamMembers: ['John Doe', 'Alex Kumar', 'Maria Garcia'],
      totalTasks: 32,
      completedTasks: 13,
      dueDate: '2025-10-30',
      budget: '$45,000',
      spent: '$18,000',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Dashboard v2',
      description: 'Enhanced dashboard with advanced analytics and reporting features.',
      status: 'Planning',
      progress: 15,
      teamMembers: ['Maria Garcia', 'Sarah Chen'],
      totalTasks: 18,
      completedTasks: 3,
      dueDate: '2025-08-30',
      budget: '$15,000',
      spent: '$2,250',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'API Documentation',
      description: 'Comprehensive API documentation and developer portal.',
      status: 'Completed',
      progress: 100,
      teamMembers: ['Alex Kumar', 'John Doe'],
      totalTasks: 12,
      completedTasks: 12,
      dueDate: '2025-07-15',
      budget: '$8,000',
      spent: '$7,500',
      color: 'bg-emerald-500'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <Container className="py-8">
          <Stack spacing="lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">
                  Overview of all your projects and their progress.
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </div>

            {/* Project Stats */}
            <Grid cols={4} gap="md">
              {[
                { title: 'Total Projects', value: '4', icon: Folder, color: 'text-blue-600' },
                { title: 'Active Projects', value: '3', icon: TrendingUp, color: 'text-green-600' },
                { title: 'Total Tasks', value: '86', icon: CheckCircle2, color: 'text-purple-600' },
                { title: 'Completed Tasks', value: '44', icon: BarChart3, color: 'text-orange-600' }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="p-6 bg-card border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                )
              })}
            </Grid>

            {/* Projects Grid */}
            <Grid cols={2} gap="lg">
              {projects.map((project) => (
                <div key={project.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <Stack spacing="md">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${project.color}`} />
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full border mt-1 ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">•••</Button>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm">{project.description}</p>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${project.color}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Stats */}
                    <Grid cols={2} gap="sm" className="text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                        <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Due {project.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{project.teamMembers.length} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                        <span>{project.spent} / {project.budget}</span>
                      </div>
                    </Grid>

                    {/* Team Members */}
                    <div>
                      <p className="text-sm font-medium mb-2">Team</p>
                      <div className="flex flex-wrap gap-2">
                        {project.teamMembers.map((member, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-muted rounded-md">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        Edit Project
                      </Button>
                    </div>
                  </Stack>
                </div>
              ))}
            </Grid>
          </Stack>
        </Container>
      </DashboardLayout>
    </AuthGuard>
  )
}