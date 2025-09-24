/**
 * Provider components index file
 * Wrapper components for context providers and global state
 */

// Authentication provider
export { AuthProvider } from './auth-provider'

// Theme provider
export { ThemeProvider } from './theme-provider'

// Providers to be implemented
export const PROVIDERS_TODO = [
  'QueryProvider - React Query provider for server state management',
  'ToastProvider - Global toast notifications',
  'SheetsProvider - Google Sheets API provider'
] as const