import type { Task, TaskStatus, TaskPriority } from '@/types'
import { GoogleSheetsService } from '../googleSheets'

export class TaskSheetService {
  private sheetsService: GoogleSheetsService
  private sheetName = 'Tasks'

  // Column mapping for the Tasks sheet
  private columnMapping = {
    'ID': 'id',
    'Project ID': 'project_id',
    'Title': 'title',
    'Description': 'description',
    'Status': 'status',
    'Priority': 'priority',
    'Assigned To': 'assigned_to',
    'Due Date': 'due_date',
    'Created By': 'created_by',
    'Created At': 'created_at',
    'Updated At': 'updated_at',
    'Labels': 'labels'
  }

  constructor(sheetsService: GoogleSheetsService) {
    this.sheetsService = sheetsService
  }

  /**
   * Get all tasks from the sheet
   */
  async getAllTasks(): Promise<Task[]> {
    try {
      const data = await this.sheetsService.readRange(`${this.sheetName}!A:L`)
      const tasks = this.sheetsService.mapRowsToObjects<Task>(data, this.columnMapping)
      
      return tasks.map(task => ({
        ...task,
        labels: typeof task.labels === 'string' 
          ? (task.labels as string).split(',').map(label => label.trim()).filter(Boolean)
          : Array.isArray(task.labels) ? task.labels : []
      }))
    } catch (error) {
      throw new Error(`Failed to get tasks: ${error}`)
    }
  }

  /**
   * Get tasks by project ID
   */
  async getTasksByProject(projectId: string): Promise<Task[]> {
    const allTasks = await this.getAllTasks()
    return allTasks.filter(task => task.project_id === projectId)
  }

  /**
   * Get tasks by status
   */
  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    const allTasks = await this.getAllTasks()
    return allTasks.filter(task => task.status === status)
  }

  /**
   * Get tasks assigned to a user
   */
  async getTasksByAssignee(userId: string): Promise<Task[]> {
    const allTasks = await this.getAllTasks()
    return allTasks.filter(task => task.assigned_to === userId)
  }

  /**
   * Create a new task
   */
  async createTask(taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const now = new Date().toISOString()
    const id = `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    
    const task: Task = {
      ...taskData,
      id,
      created_at: now,
      updated_at: now,
      labels: taskData.labels || []
    } as Task

    const rows = this.sheetsService.mapObjectsToRows([task], this.columnMapping, false)
    
    // Convert labels array back to string for storage
    const rowsWithStringLabels = rows.map(row => {
      const labelsIndex = Object.keys(this.columnMapping).indexOf('Labels')
      if (labelsIndex !== -1 && Array.isArray(row[labelsIndex])) {
        row[labelsIndex] = (row[labelsIndex] as string[]).join(', ')
      }
      return row
    })

    await this.sheetsService.appendData(this.sheetName, rowsWithStringLabels)
  }

  /**
   * Update an existing task
   */
  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const allTasks = await this.getAllTasks()
    const taskIndex = allTasks.findIndex(task => task.id === taskId)
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    const updatedTask: Task = {
      ...allTasks[taskIndex],
      ...updates,
      updated_at: new Date().toISOString()
    } as Task

    // Update the specific row (add 2 to account for header row and 0-based indexing)
    const rowNumber = taskIndex + 2
    const values = this.sheetsService.mapObjectsToRows([updatedTask], this.columnMapping, false)
    
    // Convert labels array to string
    const valuesWithStringLabels = values.map(row => {
      const labelsIndex = Object.keys(this.columnMapping).indexOf('Labels')
      if (labelsIndex !== -1 && Array.isArray(row[labelsIndex])) {
        row[labelsIndex] = (row[labelsIndex] as string[]).join(', ')
      }
      return row
    })

    await this.sheetsService.writeRange(`${this.sheetName}!A${rowNumber}:L${rowNumber}`, valuesWithStringLabels)
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string): Promise<void> {
    const allTasks = await this.getAllTasks()
    const taskIndex = allTasks.findIndex(task => task.id === taskId)
    
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    // Clear the specific row (add 2 to account for header row and 0-based indexing)
    const rowNumber = taskIndex + 2
    await this.sheetsService.clearRange(`${this.sheetName}!A${rowNumber}:L${rowNumber}`)
  }

  /**
   * Search tasks by title or description
   */
  async searchTasks(searchTerm: string): Promise<Task[]> {
    const results = await this.sheetsService.searchInSheet(this.sheetName, searchTerm, this.columnMapping)
    return results as unknown as Task[]
  }

  /**
   * Initialize the Tasks sheet with headers
   */
  async initializeSheet(): Promise<void> {
    try {
      const sheets = await this.sheetsService.getSheetNames()
      
      if (!sheets.includes(this.sheetName)) {
        await this.sheetsService.createSheet(this.sheetName)
      }

      // Add headers if the sheet is empty
      const data = await this.sheetsService.readRange(`${this.sheetName}!A1:L1`)
      if (!data.values || data.values.length === 0) {
        const headers = [Object.keys(this.columnMapping)]
        await this.sheetsService.writeRange(`${this.sheetName}!A1:L1`, headers)
      }
    } catch (error) {
      throw new Error(`Failed to initialize Tasks sheet: ${error}`)
    }
  }

  /**
   * Get task statistics
   */
  async getTaskStats(): Promise<{
    total: number
    byStatus: Record<TaskStatus, number>
    byPriority: Record<TaskPriority, number>
  }> {
    const allTasks = await this.getAllTasks()
    
    const byStatus = allTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {} as Record<TaskStatus, number>)

    const byPriority = allTasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<TaskPriority, number>)

    return {
      total: allTasks.length,
      byStatus,
      byPriority
    }
  }
}