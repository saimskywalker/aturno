/**
 * Application constants and configuration values
 */

// App metadata
export const APP_NAME = 'Aturno'
export const APP_DESCRIPTION = 'Modern task management platform for teams'
export const APP_VERSION = '1.0.0'

// Task statuses
export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress', 
  DONE: 'done',
  CANCELLED: 'cancelled'
} as const

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
  [TASK_STATUSES.DONE]: 'Done',
  [TASK_STATUSES.CANCELLED]: 'Cancelled'
}

// Task priorities
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high', 
  URGENT: 'urgent'
} as const

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITIES.LOW]: 'Low',
  [TASK_PRIORITIES.MEDIUM]: 'Medium',
  [TASK_PRIORITIES.HIGH]: 'High',
  [TASK_PRIORITIES.URGENT]: 'Urgent'
}

// Project statuses
export const PROJECT_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  ON_HOLD: 'on_hold'
} as const

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUSES.ACTIVE]: 'Active',
  [PROJECT_STATUSES.COMPLETED]: 'Completed', 
  [PROJECT_STATUSES.ARCHIVED]: 'Archived',
  [PROJECT_STATUSES.ON_HOLD]: 'On Hold'
}

// Team member roles
export const MEMBER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member'
} as const

export const MEMBER_ROLE_LABELS = {
  [MEMBER_ROLES.OWNER]: 'Owner',
  [MEMBER_ROLES.ADMIN]: 'Admin',
  [MEMBER_ROLES.MEMBER]: 'Member'
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  TEAMS: '/api/teams',
  PROJECTS: '/api/projects',
  TASKS: '/api/tasks',
  EXPENSES: '/api/expenses'
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
}

// Google Sheets configuration
export const SHEETS_CONFIG = {
  SCOPES: ['https://www.googleapis.com/auth/spreadsheets'],
  DISCOVERY_DOC: 'https://sheets.googleapis.com/$discovery/rest?version=v4'
}