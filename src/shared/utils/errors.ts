// Error handling utilities for Google Sheets integration

export class SheetsError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message)
    this.name = 'SheetsError'
  }
}

export class SheetsAuthError extends SheetsError {
  constructor(message: string, details?: unknown) {
    super(message, 'SHEETS_AUTH_ERROR', 401, details)
    this.name = 'SheetsAuthError'
  }
}

export class SheetsNotFoundError extends SheetsError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with ID '${id}' not found`
      : `${resource} not found`
    super(message, 'SHEETS_NOT_FOUND', 404)
    this.name = 'SheetsNotFoundError'
  }
}

export class SheetsValidationError extends SheetsError {
  constructor(message: string, field?: string) {
    super(message, 'SHEETS_VALIDATION_ERROR', 400, { field })
    this.name = 'SheetsValidationError'
  }
}

export class SheetsQuotaError extends SheetsError {
  constructor(message: string = 'Google Sheets API quota exceeded') {
    super(message, 'SHEETS_QUOTA_ERROR', 429)
    this.name = 'SheetsQuotaError'
  }
}

export class SheetsConfigError extends SheetsError {
  constructor(message: string) {
    super(message, 'SHEETS_CONFIG_ERROR', 500)
    this.name = 'SheetsConfigError'
  }
}

/**
 * Parse and handle Google Sheets API errors
 */
export function handleSheetsError(error: unknown): SheetsError {
  if (error instanceof SheetsError) {
    return error
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase()

    // Authentication errors
    if (message.includes('unauthorized') || message.includes('invalid credentials')) {
      return new SheetsAuthError('Invalid Google Sheets credentials', error)
    }

    // Quota errors
    if (message.includes('quota') || message.includes('rate limit')) {
      return new SheetsQuotaError('Google Sheets API quota exceeded')
    }

    // Not found errors
    if (message.includes('not found') || message.includes('does not exist')) {
      return new SheetsNotFoundError('Resource', '')
    }

    // Validation errors
    if (message.includes('invalid') || message.includes('malformed')) {
      return new SheetsValidationError(error.message)
    }

    // Generic error
    return new SheetsError(error.message, 'SHEETS_UNKNOWN_ERROR', 500, error)
  }

  // Unknown error type
  return new SheetsError(
    'An unknown error occurred with Google Sheets',
    'SHEETS_UNKNOWN_ERROR',
    500,
    error
  )
}

/**
 * Retry function with exponential backoff for transient errors
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      // Don't retry on certain error types
      if (error instanceof SheetsAuthError || 
          error instanceof SheetsConfigError ||
          error instanceof SheetsValidationError) {
        throw error
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error
      }

      // Wait before retrying with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}