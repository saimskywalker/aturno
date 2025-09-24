/**
 * Custom hooks index file
 * Re-export all custom hooks for easy importing
 */

// Navigation hooks
export { useNavigation, useNavigationConfig } from './useNavigation'

// Example hooks that will be implemented later
// export { useAuth } from './use-auth'
// export { useLocalStorage } from './use-local-storage'
// export { useDebounce } from './use-debounce'
// export { useTasks } from './use-tasks'
// export { useProjects } from './use-projects'
// export { useTeams } from './use-teams'

// Placeholder for hooks to be implemented
export const HOOKS_TODO = [
  'useAuth - Authentication state management',
  'useLocalStorage - Local storage with type safety',
  'useDebounce - Debounced input handling',
  'useTasks - Task management operations',
  'useProjects - Project management operations', 
  'useTeams - Team management operations',
  'useNotifications - Real-time notifications',
  'useSheets - Google Sheets integration'
] as const