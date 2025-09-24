# Aturno Layout System

A comprehensive responsive layout system built with React and Tailwind CSS for the Aturno task management application.

## Components

### Container
Responsive container component with predefined max-widths.

```tsx
import { Container } from '@/components/layout'

<Container size="lg">
  Content goes here
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'lg')
- `className`: Additional CSS classes

### Grid & GridItem
Flexible grid system with responsive breakpoints.

```tsx
import { Grid, GridItem } from '@/components/layout'

<Grid cols={4} gap="md">
  <GridItem span={2}>
    Spans 2 columns
  </GridItem>
  <GridItem>
    Default span (1 column)
  </GridItem>
</Grid>
```

**Grid Props:**
- `cols`: 1 | 2 | 3 | 4 | 6 | 12 (default: 1)
- `gap`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')

**GridItem Props:**
- `span`: 1 | 2 | 3 | 4 | 6 | 12 (default: 1)

### Stack
Flexbox-based layout for arranging items vertically or horizontally.

```tsx
import { Stack } from '@/components/layout'

<Stack direction="horizontal" spacing="md" align="center">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

**Props:**
- `direction`: 'vertical' | 'horizontal' (default: 'vertical')
- `spacing`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `align`: 'start' | 'center' | 'end' | 'stretch' (default: 'stretch')
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' (default: 'start')

### Section
Wrapper component for page sections with consistent spacing.

```tsx
import { Section } from '@/components/layout'

<Section variant="muted" size="lg">
  Section content
</Section>
```

**Props:**
- `variant`: 'default' | 'muted' | 'accent' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')

### Header & HeaderContent
Header component with sticky positioning and backdrop blur.

```tsx
import { Header, HeaderContent } from '@/components/layout'

<Header variant="sticky">
  <HeaderContent>
    <Logo />
    <Navigation />
  </HeaderContent>
</Header>
```

**Header Props:**
- `variant`: 'default' | 'sticky' | 'floating' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')

### SidebarLayout & Sidebar
Layout for applications with sidebar navigation.

```tsx
import { SidebarLayout, Sidebar } from '@/components/layout'

<SidebarLayout
  sidebar={
    <Sidebar>
      <Navigation />
    </Sidebar>
  }
  sidebarWidth="md"
  collapsible
>
  <MainContent />
</SidebarLayout>
```

**SidebarLayout Props:**
- `sidebarWidth`: 'sm' | 'md' | 'lg' (default: 'md')
- `position`: 'left' | 'right' (default: 'left')
- `collapsible`: boolean (default: false)
- `collapsed`: boolean (default: false)

### PageLayout
High-level layout component for entire pages.

```tsx
import { PageLayout } from '@/components/layout'

<PageLayout
  header={<Header />}
  sidebar={<Sidebar />}
  footer={<Footer />}
  maxWidth="lg"
>
  <PageContent />
</PageLayout>
```

**Props:**
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (default: 'lg')
- `padding`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')

### Responsive & ResponsiveGrid
Components for responsive visibility and grid layouts.

```tsx
import { Responsive, ResponsiveGrid } from '@/components/layout'

<Responsive hide="mobile">
  Hidden on mobile
</Responsive>

<ResponsiveGrid mobile={1} tablet={2} desktop={4}>
  <Card />
  <Card />
  <Card />
  <Card />
</ResponsiveGrid>
```

**Responsive Props:**
- `hide`: 'mobile' | 'tablet' | 'desktop'
- `show`: 'mobile' | 'tablet' | 'desktop'

**ResponsiveGrid Props:**
- `mobile`: number (default: 1)
- `tablet`: number (default: 2)
- `desktop`: number (default: 3)
- `gap`: 'sm' | 'md' | 'lg' (default: 'md')

## Usage Examples

### Landing Page Layout
```tsx
<PageLayout
  header={
    <Header variant="sticky">
      <HeaderContent>
        <Logo />
        <AuthButtons />
      </HeaderContent>
    </Header>
  }
  footer={<Footer />}
>
  <Section size="xl">
    <Container>
      <Hero />
    </Container>
  </Section>
  
  <Section variant="muted">
    <Container>
      <ResponsiveGrid mobile={1} tablet={2} desktop={4}>
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </ResponsiveGrid>
    </Container>
  </Section>
</PageLayout>
```

### Dashboard Layout
```tsx
<SidebarLayout
  sidebar={
    <Sidebar>
      <Logo />
      <Navigation />
    </Sidebar>
  }
  collapsible
>
  <Header>
    <HeaderContent>
      <PageTitle />
      <UserMenu />
    </HeaderContent>
  </Header>
  
  <Container className="py-6">
    <Grid cols={3} gap="lg">
      <GridItem span={2}>
        <MainContent />
      </GridItem>
      <GridItem>
        <Sidebar />
      </GridItem>
    </Grid>
  </Container>
</SidebarLayout>
```

## Responsive Breakpoints

The layout system uses Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up

## Demo

Visit `/demo` to see all layout components in action with interactive examples.