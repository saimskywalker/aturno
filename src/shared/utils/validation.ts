// Validation utilities for Google Sheets data

import type { Task, Project, TaskStatus, TaskPriority, ProjectStatus } from '@/types'

/**
 * Validate task data
 */
export function validateTask(data: Partial<Task>): string[] {
  const errors: string[] = []

  if (!data.project_id) {
    errors.push('Project ID is required')
  }

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Task title is required')
  }

  if (data.title && data.title.length > 500) {
    errors.push('Task title must be less than 500 characters')
  }

  if (data.description && data.description.length > 2000) {
    errors.push('Task description must be less than 2000 characters')
  }

  if (data.status && !isValidTaskStatus(data.status)) {
    errors.push('Invalid task status')
  }

  if (data.priority && !isValidTaskPriority(data.priority)) {
    errors.push('Invalid task priority')
  }

  if (data.due_date && !isValidDate(data.due_date)) {
    errors.push('Invalid due date format')
  }

  return errors
}

/**
 * Validate project data
 */
export function validateProject(data: Partial<Project>): string[] {
  const errors: string[] = []

  if (!data.team_id) {
    errors.push('Team ID is required')
  }

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Project name is required')
  }

  if (data.name && data.name.length > 200) {
    errors.push('Project name must be less than 200 characters')
  }

  if (data.description && data.description.length > 1000) {
    errors.push('Project description must be less than 1000 characters')
  }

  if (data.budget && (isNaN(Number(data.budget)) || Number(data.budget) < 0)) {
    errors.push('Budget must be a valid positive number')
  }

  if (data.status && !isValidProjectStatus(data.status)) {
    errors.push('Invalid project status')
  }

  if (data.color && !isValidHexColor(data.color)) {
    errors.push('Color must be a valid hex color')
  }

  return errors
}

/**
 * Validate Google Sheets configuration
 */
export function validateSheetsConfig(config: {
  spreadsheetId?: string
  clientEmail?: string
  privateKey?: string
}): string[] {
  const errors: string[] = []

  if (!config.spreadsheetId) {
    errors.push('Spreadsheet ID is required')
  }

  if (!config.clientEmail) {
    errors.push('Google Client Email is required')
  }

  if (!config.privateKey) {
    errors.push('Google Private Key is required')
  }

  if (config.clientEmail && !isValidEmail(config.clientEmail)) {
    errors.push('Invalid client email format')
  }

  if (config.privateKey && !config.privateKey.includes('BEGIN PRIVATE KEY')) {
    errors.push('Invalid private key format')
  }

  return errors
}

/**
 * Sanitize data for Google Sheets
 */
export function sanitizeForSheets(value: unknown): string | number | boolean | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    // Remove or escape characters that might cause issues in sheets
    return value
      .replace(/[\r\n\t]/g, ' ') // Replace line breaks and tabs with spaces
      .replace(/"/g, '""') // Escape quotes
      .trim()
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

/**
 * Validate sheet range format
 */
export function validateSheetRange(range: string): boolean {
  // Basic validation for sheet range format like "Sheet1!A1:B10" or "A1:B10"
  const rangePattern = /^([a-zA-Z0-9\s_-]+!)?[A-Z]+[0-9]+:[A-Z]+[0-9]+$|^([a-zA-Z0-9\s_-]+!)?[A-Z]+:[A-Z]+$/
  return rangePattern.test(range)
}

// Helper validation functions

function isValidTaskStatus(status: string): status is TaskStatus {
  return ['todo', 'in_progress', 'done', 'cancelled'].includes(status)
}

function isValidTaskPriority(priority: string): priority is TaskPriority {
  return ['low', 'medium', 'high', 'urgent'].includes(priority)
}

function isValidProjectStatus(status: string): status is ProjectStatus {
  return ['active', 'completed', 'archived', 'on_hold'].includes(status)
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

function isValidHexColor(color: string): boolean {
  const hexPattern = /^#[0-9A-Fa-f]{6}$/
  return hexPattern.test(color)
}

/**
 * Clean and validate spreadsheet ID
 */
export function extractSpreadsheetId(input: string): string {
  // If it's already just an ID, return it
  if (input.length === 44 && !input.includes('/')) {
    return input
  }

  // Extract from Google Sheets URL
  const match = input.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (match && match[1]) {
    return match[1]
  }

  // If no match, assume it's already an ID
  return input
}

/**
 * Validate required environment variables
 */
export function validateEnvironmentVariables(): string[] {
  const errors: string[] = []
  const required = [
    'SPREADSHEET_ID',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_PRIVATE_KEY'
  ]

  for (const envVar of required) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`)
    }
  }

  return errors
}