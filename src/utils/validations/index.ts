/**
 * Form validation schemas and utilities
 * Using Zod for runtime type validation
 */

// Note: Install zod when implementing validation schemas
// npm install zod

// Example validation schemas that will be implemented later
// export { loginSchema } from './auth-schemas'
// export { createTaskSchema, updateTaskSchema } from './task-schemas'
// export { createProjectSchema, updateProjectSchema } from './project-schemas'
// export { createTeamSchema, updateTeamSchema } from './team-schemas'

// Placeholder for validation schemas to be implemented
export const VALIDATION_SCHEMAS_TODO = [
  'authSchemas - Login, register, password reset validation',
  'taskSchemas - Task creation and update validation',
  'projectSchemas - Project management validation',
  'teamSchemas - Team and member validation',
  'expenseSchemas - Budget and expense validation',
  'profileSchemas - User profile validation'
] as const

// Basic validation utilities
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}