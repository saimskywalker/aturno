// Core domain types for Aturno

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  last_login?: string
}

export interface Team {
  id: string
  name: string
  description?: string
  owner_id: string
  created_at: string
  settings?: TeamSettings
}

export interface TeamSettings {
  theme?: 'light' | 'dark' | 'system'
  notifications?: boolean
  public?: boolean
}

export interface TeamMember {
  team_id: string
  user_id: string
  role: MemberRole
  invited_by: string
  joined_at: string
  status: MemberStatus
}

export type MemberRole = 'owner' | 'admin' | 'member'
export type MemberStatus = 'active' | 'invited' | 'suspended'

export interface Project {
  id: string
  team_id: string
  name: string
  description?: string
  budget?: number
  created_by: string
  created_at: string
  status: ProjectStatus
  color?: string
  [key: string]: unknown
}

export type ProjectStatus = 'active' | 'completed' | 'archived' | 'on_hold'

export interface Task {
  id: string
  project_id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigned_to?: string
  due_date?: string
  created_by: string
  created_at: string
  updated_at: string
  labels?: string[]
  [key: string]: unknown
}

export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Expense {
  id: string
  project_id: string
  amount: number
  currency: string
  category: string
  description?: string
  created_by: string
  created_at: string
  receipt_url?: string
}

export interface Comment {
  id: string
  task_id: string
  user_id: string
  content: string
  created_at: string
  parent_id?: string // For threaded comments
  mentions?: string[] // User IDs mentioned in comment
}

export interface Activity {
  id: string
  user_id: string
  team_id: string
  action: ActivityAction
  target_type: ActivityTarget
  target_id: string
  metadata?: Record<string, unknown>
  created_at: string
}

export type ActivityAction = 
  | 'created' 
  | 'updated' 
  | 'deleted' 
  | 'assigned' 
  | 'completed' 
  | 'commented'

export type ActivityTarget = 
  | 'task' 
  | 'project' 
  | 'team' 
  | 'expense' 
  | 'comment'

// UI Component types
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FilterOptions {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  assignee?: string[]
  project?: string[]
  labels?: string[]
  search?: string
}

// Google Sheets integration types
export interface SheetRange {
  sheet: string
  range: string
}

export interface SheetData {
  range: string
  values: unknown[][]
}

export interface GoogleSheetsConfig {
  spreadsheetId: string
  clientEmail: string
  privateKey: string
  projectId?: string
}

export interface SheetRowData {
  [key: string]: string | number | boolean | null | undefined
}

export interface SheetColumnMapping {
  [sheetColumn: string]: string // maps sheet column to property name
}

// Re-export specialized types
export * from './api'
export * from './ui'