import { Button } from '@/components/ui'
import { 
  Container, 
  Header, 
  HeaderContent, 
  Section, 
  Stack, 
  SidebarLayout,
  Sidebar,
  Responsive,
  ResponsiveGrid
} from '@/components/layout'
import { Home, Settings, Users, BarChart3, Menu } from 'lucide-react'

export default function DemoPage() {
  return (
    <SidebarLayout
      sidebar={
        <Sidebar>
          <Stack spacing="lg">
            <div className="flex items-center space-x-2 p-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold">A</span>
              </div>
              <Responsive hide="mobile">
                <span className="font-semibold">Aturno</span>
              </Responsive>
            </div>
            
            <Stack spacing="xs">
              {[
                { icon: Home, label: 'Dashboard' },
                { icon: BarChart3, label: 'Analytics' },
                { icon: Users, label: 'Teams' },
                { icon: Settings, label: 'Settings' }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="justify-start gap-3 h-10"
                  >
                    <Icon className="w-4 h-4" />
                    <Responsive hide="mobile">
                      <span>{item.label}</span>
                    </Responsive>
                  </Button>
                )
              })}
            </Stack>
          </Stack>
        </Sidebar>
      }
    >
      <div className="flex flex-col min-h-screen">
        <Header>
          <HeaderContent>
            <Stack direction="horizontal" spacing="md" align="center">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold">Layout System Demo</h1>
            </Stack>
            <Button>New Project</Button>
          </HeaderContent>
        </Header>

        <main className="flex-1 p-6">
          <Container>
            <Stack spacing="lg">
              {/* Responsive Grid Demo */}
              <Section>
                <Stack spacing="md">
                  <h2 className="text-2xl font-bold">Responsive Grid System</h2>
                  <ResponsiveGrid mobile={1} tablet={2} desktop={4} gap="md">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="p-4 bg-card border border-border rounded-lg">
                        <h3 className="font-semibold mb-2">Card {i + 1}</h3>
                        <p className="text-sm text-muted-foreground">
                          This card adapts to screen size automatically.
                        </p>
                      </div>
                    ))}
                  </ResponsiveGrid>
                </Stack>
              </Section>

              {/* Stack Demo */}
              <Section variant="muted">
                <Stack spacing="md">
                  <h2 className="text-2xl font-bold">Stack Layouts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-background rounded-lg border">
                      <h3 className="font-semibold mb-4">Vertical Stack</h3>
                      <Stack spacing="sm">
                        <Button variant="outline">Button 1</Button>
                        <Button variant="outline">Button 2</Button>
                        <Button variant="outline">Button 3</Button>
                      </Stack>
                    </div>
                    <div className="p-4 bg-background rounded-lg border">
                      <h3 className="font-semibold mb-4">Horizontal Stack</h3>
                      <Stack direction="horizontal" spacing="sm">
                        <Button variant="outline" size="sm">Save</Button>
                        <Button variant="outline" size="sm">Cancel</Button>
                        <Button size="sm">Submit</Button>
                      </Stack>
                    </div>
                  </div>
                </Stack>
              </Section>

              {/* Container Sizes Demo */}
              <Section>
                <Stack spacing="md">
                  <h2 className="text-2xl font-bold">Container Sizes</h2>
                  <Stack spacing="sm">
                    {['sm', 'md', 'lg', 'xl'].map((size) => (
                      <Container key={size} size={size as 'sm' | 'md' | 'lg' | 'xl'} className="bg-muted/30 p-4 rounded">
                        <p className="text-center">Container size: {size}</p>
                      </Container>
                    ))}
                  </Stack>
                </Stack>
              </Section>

              {/* Responsive Visibility Demo */}
              <Section variant="accent">
                <Stack spacing="md" align="center">
                  <h2 className="text-2xl font-bold">Responsive Visibility</h2>
                  <Stack direction="horizontal" spacing="md">
                    <Responsive show="mobile">
                      <div className="p-3 bg-red-500/20 text-red-800 rounded border border-red-500/50">
                        Mobile Only
                      </div>
                    </Responsive>
                    <Responsive show="tablet">
                      <div className="p-3 bg-yellow-500/20 text-yellow-800 rounded border border-yellow-500/50">
                        Tablet Only
                      </div>
                    </Responsive>
                    <Responsive show="desktop">
                      <div className="p-3 bg-green-500/20 text-green-800 rounded border border-green-500/50">
                        Desktop Only
                      </div>
                    </Responsive>
                  </Stack>
                  <p className="text-sm text-muted-foreground text-center">
                    Resize your browser to see different visibility states
                  </p>
                </Stack>
              </Section>
            </Stack>
          </Container>
        </main>
      </div>
    </SidebarLayout>
  )
}