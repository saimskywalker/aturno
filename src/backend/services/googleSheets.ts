import { sheets_v4 } from '@googleapis/sheets'
import { GoogleAuth, JWT } from 'google-auth-library'
import type { 
  GoogleSheetsConfig, 
  SheetData, 
  SheetRange, 
  SheetRowData, 
  SheetColumnMapping 
} from '@/types'
import { 
  handleSheetsError, 
  retryWithBackoff, 
  SheetsConfigError,
  validateSheetsConfig,
  validateSheetRange,
  sanitizeForSheets
} from '@/lib'

export class GoogleSheetsService {
  private auth: JWT
  private sheets: sheets_v4.Sheets
  private spreadsheetId: string

  constructor(config: GoogleSheetsConfig) {
    // Validate configuration
    const configErrors = validateSheetsConfig(config)
    if (configErrors.length > 0) {
      throw new SheetsConfigError(`Invalid configuration: ${configErrors.join(', ')}`)
    }

    this.spreadsheetId = config.spreadsheetId

    try {
      // Initialize authentication
      this.auth = new JWT({
        email: config.clientEmail,
        key: config.privateKey.replace(/\\n/g, '\n'),
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.readonly'
        ]
      })

      // Initialize Sheets API client
      this.sheets = new sheets_v4.Sheets({ auth: this.auth })
    } catch (error) {
      throw new SheetsConfigError(`Failed to initialize Google Sheets client: ${error}`)
    }
  }

  /**
   * Read data from a specific range in the spreadsheet
   */
  async readRange(range: string): Promise<SheetData> {
    if (!validateSheetRange(range)) {
      throw new Error(`Invalid range format: ${range}`)
    }

    try {
      return await retryWithBackoff(async () => {
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range,
          valueRenderOption: 'UNFORMATTED_VALUE',
          dateTimeRenderOption: 'FORMATTED_STRING'
        })

        return {
          range: response.data.range || range,
          values: response.data.values || []
        }
      })
    } catch (error) {
      throw handleSheetsError(error)
    }
  }

  /**
   * Write data to a specific range in the spreadsheet
   */
  async writeRange(range: string, values: unknown[][]): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values
        }
      })
    } catch (error) {
      throw new Error(`Failed to write to range ${range}: ${error}`)
    }
  }

  /**
   * Append data to the end of a sheet
   */
  async appendData(sheetName: string, values: unknown[][]): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:A`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values
        }
      })
    } catch (error) {
      throw new Error(`Failed to append data to ${sheetName}: ${error}`)
    }
  }

  /**
   * Clear data from a specific range
   */
  async clearRange(range: string): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range
      })
    } catch (error) {
      throw new Error(`Failed to clear range ${range}: ${error}`)
    }
  }

  /**
   * Get all sheet names in the spreadsheet
   */
  async getSheetNames(): Promise<string[]> {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      })

      return response.data.sheets?.map(sheet => 
        sheet.properties?.title || 'Unknown'
      ) || []
    } catch (error) {
      throw new Error(`Failed to get sheet names: ${error}`)
    }
  }

  /**
   * Convert sheet rows to objects using column mapping
   */
  mapRowsToObjects<T extends Record<string, unknown>>(
    data: SheetData, 
    columnMapping: SheetColumnMapping,
    hasHeaders = true
  ): T[] {
    if (!data.values || data.values.length === 0) {
      return []
    }

    const rows = hasHeaders ? data.values.slice(1) : data.values
    const headers = hasHeaders ? data.values[0] : Object.keys(columnMapping)

    return rows.map(row => {
      const obj = {} as T
      headers?.forEach((header, index) => {
        const propName = columnMapping[header as string] || header
        obj[propName as keyof T] = (row[index] ?? null) as T[keyof T]
      })
      return obj
    })
  }

  /**
   * Convert objects to sheet rows using column mapping
   */
  mapObjectsToRows<T extends Record<string, unknown>>(
    objects: T[],
    columnMapping: SheetColumnMapping,
    includeHeaders = true
  ): unknown[][] {
    if (objects.length === 0) {
      return includeHeaders ? [Object.keys(columnMapping)] : []
    }

    const headers = Object.keys(columnMapping)
    const rows = objects.map(obj => 
      headers.map(header => {
        const propName = columnMapping[header]
        return propName ? obj[propName] ?? null : null
      })
    )

    return includeHeaders ? [headers, ...rows] : rows
  }

  /**
   * Batch update multiple ranges
   */
  async batchUpdate(updates: Array<{ range: string; values: unknown[][] }>): Promise<void> {
    try {
      const data = updates.map(update => ({
        range: update.range,
        values: update.values
      }))

      await this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          valueInputOption: 'USER_ENTERED',
          data
        }
      })
    } catch (error) {
      throw new Error(`Failed to batch update: ${error}`)
    }
  }

  /**
   * Create a new sheet in the spreadsheet
   */
  async createSheet(sheetName: string): Promise<void> {
    try {
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      })
    } catch (error) {
      throw new Error(`Failed to create sheet ${sheetName}: ${error}`)
    }
  }

  /**
   * Search for data in a specific sheet
   */
  async searchInSheet(
    sheetName: string, 
    searchTerm: string, 
    columnMapping?: SheetColumnMapping
  ): Promise<SheetRowData[]> {
    try {
      const data = await this.readRange(`${sheetName}!A:Z`)
      const objects = columnMapping 
        ? this.mapRowsToObjects(data, columnMapping)
        : data.values?.slice(1).map((row, index) => {
            const obj: SheetRowData = {}
            row.forEach((cell, cellIndex) => {
              obj[`col_${cellIndex}`] = cell as string | number | boolean | null
            })
            return obj
          }) || []

      return objects.filter(obj => 
        Object.values(obj).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) as SheetRowData[]
    } catch (error) {
      throw new Error(`Failed to search in sheet ${sheetName}: ${error}`)
    }
  }
}

// Factory function to create Google Sheets service instance
export function createGoogleSheetsService(): GoogleSheetsService {
  const config: GoogleSheetsConfig = {
    spreadsheetId: process.env.SPREADSHEET_ID!,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL!,
    privateKey: process.env.GOOGLE_PRIVATE_KEY!,
    ...(process.env.GOOGLE_SHEETS_PROJECT_ID && { projectId: process.env.GOOGLE_SHEETS_PROJECT_ID })
  }

  // Validate required environment variables
  if (!config.spreadsheetId) {
    throw new Error('SPREADSHEET_ID environment variable is required')
  }
  if (!config.clientEmail) {
    throw new Error('GOOGLE_CLIENT_EMAIL environment variable is required')
  }
  if (!config.privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY environment variable is required')
  }

  return new GoogleSheetsService(config)
}