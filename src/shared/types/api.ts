// API-specific types

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
  details?: Record<string, unknown>
}

export interface ApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
  error?: ApiError
}

export interface PaginatedApiResponse<T = unknown> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  success: boolean
  message?: string
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number | boolean>
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface GoogleSheetsCredentials {
  client_id: string
  client_secret: string
  refresh_token: string
  access_token?: string
}

export interface WebhookPayload {
  event: string
  data: Record<string, unknown>
  timestamp: string
  signature: string
}