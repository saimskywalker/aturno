import { 
  Container,
  Stack,
  Grid,
  DashboardLayout
} from '@/components/layout'
import { AuthGuard } from '@/features/auth'
import { Button } from '@/components/ui'
import { 
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  UserPlus
} from 'lucide-react'

export default function TeamsPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      email: 'sarah.chen@aturno.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      joinDate: '2024-01-15',
      avatar: 'SC',
      status: 'Active',
      activeTasks: 8,
      completedTasks: 42,
      projects: ['Website Redesign', 'Dashboard v2']
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'Full Stack Developer',
      email: 'john.doe@aturno.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      joinDate: '2023-11-20',
      avatar: 'JD',
      status: 'Active',
      activeTasks: 12,
      completedTasks: 67,
      projects: ['Mobile App Development', 'API Documentation']
    },
    {
      id: 3,
      name: 'Maria Garcia',
      role: 'Product Manager',
      email: 'maria.garcia@aturno.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      joinDate: '2024-03-10',
      avatar: 'MG',
      status: 'Active',
      activeTasks: 6,
      completedTasks: 34,
      projects: ['Dashboard v2', 'Mobile App Development']
    },
    {
      id: 4,
      name: 'Alex Kumar',
      role: 'Backend Developer',
      email: 'alex.kumar@aturno.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      joinDate: '2023-09-05',
      avatar: 'AK',
      status: 'Active',
      activeTasks: 10,
      completedTasks: 89,
      projects: ['Mobile App Development', 'API Documentation']
    },
    {
      id: 5,
      name: 'Lisa Wong',
      role: 'QA Engineer',
      email: 'lisa.wong@aturno.com',
      phone: '+1 (555) 567-8901',
      location: 'Los Angeles, CA',
      joinDate: '2024-02-28',
      avatar: 'LW',
      status: 'Away',
      activeTasks: 4,
      completedTasks: 28,
      projects: ['Website Redesign', 'Mobile App Development']
    },
    {
      id: 6,
      name: 'Mike Johnson',
      role: 'Frontend Developer',
      email: 'mike.johnson@aturno.com',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      joinDate: '2023-12-12',
      avatar: 'MJ',
      status: 'Active',
      activeTasks: 7,
      completedTasks: 51,
      projects: ['Website Redesign']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Away':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Offline':
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
                <p className="text-muted-foreground">
                  Manage your team members and their roles.
                </p>
              </div>
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Invite Member
              </Button>
            </div>

            {/* Team Stats */}
            <Grid cols={4} gap="md">
              {[
                { title: 'Total Members', value: '6', icon: Users, color: 'text-blue-600' },
                { title: 'Active Members', value: '5', icon: CheckCircle2, color: 'text-green-600' },
                { title: 'Total Tasks', value: '47', icon: Clock, color: 'text-orange-600' },
                { title: 'Avg. Completion', value: '85%', icon: CheckCircle2, color: 'text-purple-600' }
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

            {/* Team Members */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Team Members</h2>
              <Grid cols={2} gap="md">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <Stack spacing="md">
                      {/* Member Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground font-semibold">{member.avatar}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-muted-foreground text-sm">{member.role}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full border mt-1 ${getStatusColor(member.status)}`}>
                              {member.status}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">•••</Button>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{member.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {member.joinDate}</span>
                        </div>
                      </div>

                      {/* Task Stats */}
                      <div className="flex justify-between text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-lg">{member.activeTasks}</p>
                          <p className="text-muted-foreground">Active Tasks</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-lg">{member.completedTasks}</p>
                          <p className="text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-lg">{member.projects.length}</p>
                          <p className="text-muted-foreground">Projects</p>
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <p className="text-sm font-medium mb-2">Current Projects</p>
                        <div className="flex flex-wrap gap-2">
                          {member.projects.map((project, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-muted rounded-md">
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Profile
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          Send Message
                        </Button>
                      </div>
                    </Stack>
                  </div>
                ))}
              </Grid>
            </div>

            {/* Team Roles */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Team Roles</h3>
              <Grid cols={3} gap="md">
                {[
                  { role: 'Developers', count: 3, description: 'Frontend & Backend development' },
                  { role: 'Designers', count: 1, description: 'UI/UX design and research' },
                  { role: 'Product', count: 1, description: 'Product management and strategy' },
                  { role: 'QA', count: 1, description: 'Quality assurance and testing' }
                ].map((roleGroup, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-2xl font-bold">{roleGroup.count}</p>
                    <p className="font-medium">{roleGroup.role}</p>
                    <p className="text-sm text-muted-foreground">{roleGroup.description}</p>
                  </div>
                ))}
              </Grid>
            </div>
          </Stack>
        </Container>
      </DashboardLayout>
    </AuthGuard>
  )
}