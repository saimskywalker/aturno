/**
 * Services index file
 * API services and external integrations
 */

// Google Sheets services
export * from './sheets'

// Main Google Sheets service
export { GoogleSheetsService, createGoogleSheetsService } from './googleSheets'

// Base API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Services to be implemented
export const SERVICES_TODO = [
  'authService - Authentication and user management',
  'teamsService - Team and member management',
  'expensesService - Budget and expense tracking',
  'notificationsService - Real-time notifications'
] as const