import { 
  Container,
  Stack,
  Grid,
  DashboardLayout,
  Breadcrumbs
} from '@/components/layout'
import { AuthGuard } from '@/features/auth'
import { Button } from '@/components/ui'
import { 
  Plus,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  User
} from 'lucide-react'

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: 'Review design mockups for homepage',
      description: 'Check the new homepage designs and provide feedback on the user experience flow.',
      project: 'Website Redesign',
      assignee: 'Sarah Chen',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2025-08-18',
      labels: ['Design', 'Review']
    },
    {
      id: 2,
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline for the mobile app.',
      project: 'Mobile App',
      assignee: 'John Doe',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '2025-08-20',
      labels: ['DevOps', 'Backend']
    },
    {
      id: 3,
      title: 'User testing session planning',
      description: 'Prepare test scenarios and recruit participants for usability testing.',
      project: 'Dashboard v2',
      assignee: 'Maria Garcia',
      priority: 'High',
      status: 'Completed',
      dueDate: '2025-08-17',
      labels: ['UX', 'Testing']
    },
    {
      id: 4,
      title: 'Database optimization',
      description: 'Optimize slow queries and implement caching for better performance.',
      project: 'Backend API',
      assignee: 'Alex Kumar',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2025-08-22',
      labels: ['Backend', 'Performance']
    },
    {
      id: 5,
      title: 'Mobile app store submission',
      description: 'Prepare app store listing and submit for review.',
      project: 'Mobile App',
      assignee: 'Lisa Wong',
      priority: 'Low',
      status: 'To Do',
      dueDate: '2025-08-25',
      labels: ['Mobile', 'Deployment']
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'In Progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'To Do':
        return <AlertCircle className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <Container className="py-8">
          <Stack spacing="lg">
            {/* Breadcrumbs */}
            <Breadcrumbs />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                <p className="text-muted-foreground">
                  Manage and track all your tasks across projects.
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Task
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <select className="px-3 py-2 border border-border rounded-md bg-background text-sm">
                  <option>All Status</option>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <select className="px-3 py-2 border border-border rounded-md bg-background text-sm">
                  <option>All Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{task.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Project:</span>
                          <span>{task.project}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {task.labels.map((label, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-muted rounded-md">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">•••</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Tasks</Button>
            </div>
          </Stack>
        </Container>
      </DashboardLayout>
    </AuthGuard>
  )
}