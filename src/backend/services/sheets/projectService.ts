import type { Project, ProjectStatus } from '@/types'
import { GoogleSheetsService } from '../googleSheets'

export class ProjectSheetService {
  private sheetsService: GoogleSheetsService
  private sheetName = 'Projects'

  // Column mapping for the Projects sheet
  private columnMapping = {
    'ID': 'id',
    'Team ID': 'team_id',
    'Name': 'name',
    'Description': 'description',
    'Budget': 'budget',
    'Created By': 'created_by',
    'Created At': 'created_at',
    'Status': 'status',
    'Color': 'color'
  }

  constructor(sheetsService: GoogleSheetsService) {
    this.sheetsService = sheetsService
  }

  /**
   * Get all projects from the sheet
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      const data = await this.sheetsService.readRange(`${this.sheetName}!A:I`)
      const projects = this.sheetsService.mapRowsToObjects<Project>(data, this.columnMapping)
      
      return projects.map(project => ({
        ...project,
        budget: typeof project.budget === 'string' 
          ? parseFloat(project.budget) || 0
          : project.budget || 0
      }))
    } catch (error) {
      throw new Error(`Failed to get projects: ${error}`)
    }
  }

  /**
   * Get projects by team ID
   */
  async getProjectsByTeam(teamId: string): Promise<Project[]> {
    const allProjects = await this.getAllProjects()
    return allProjects.filter(project => project.team_id === teamId)
  }

  /**
   * Get projects by status
   */
  async getProjectsByStatus(status: ProjectStatus): Promise<Project[]> {
    const allProjects = await this.getAllProjects()
    return allProjects.filter(project => project.status === status)
  }

  /**
   * Get project by ID
   */
  async getProjectById(projectId: string): Promise<Project | null> {
    const allProjects = await this.getAllProjects()
    return allProjects.find(project => project.id === projectId) || null
  }

  /**
   * Create a new project
   */
  async createProject(projectData: Omit<Project, 'id' | 'created_at'>): Promise<void> {
    const now = new Date().toISOString()
    const id = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    
    const project: Project = {
      ...projectData,
      id,
      created_at: now
    } as Project

    const rows = this.sheetsService.mapObjectsToRows([project], this.columnMapping, false)
    await this.sheetsService.appendData(this.sheetName, rows)
  }

  /**
   * Update an existing project
   */
  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const allProjects = await this.getAllProjects()
    const projectIndex = allProjects.findIndex(project => project.id === projectId)
    
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${projectId} not found`)
    }

    const updatedProject: Project = {
      ...allProjects[projectIndex],
      ...updates
    } as Project

    // Update the specific row (add 2 to account for header row and 0-based indexing)
    const rowNumber = projectIndex + 2
    const values = this.sheetsService.mapObjectsToRows([updatedProject], this.columnMapping, false)
    await this.sheetsService.writeRange(`${this.sheetName}!A${rowNumber}:I${rowNumber}`, values)
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    const allProjects = await this.getAllProjects()
    const projectIndex = allProjects.findIndex(project => project.id === projectId)
    
    if (projectIndex === -1) {
      throw new Error(`Project with ID ${projectId} not found`)
    }

    // Clear the specific row (add 2 to account for header row and 0-based indexing)
    const rowNumber = projectIndex + 2
    await this.sheetsService.clearRange(`${this.sheetName}!A${rowNumber}:I${rowNumber}`)
  }

  /**
   * Search projects by name or description
   */
  async searchProjects(searchTerm: string): Promise<Project[]> {
    const results = await this.sheetsService.searchInSheet(this.sheetName, searchTerm, this.columnMapping)
    return results as unknown as Project[]
  }

  /**
   * Initialize the Projects sheet with headers
   */
  async initializeSheet(): Promise<void> {
    try {
      const sheets = await this.sheetsService.getSheetNames()
      
      if (!sheets.includes(this.sheetName)) {
        await this.sheetsService.createSheet(this.sheetName)
      }

      // Add headers if the sheet is empty
      const data = await this.sheetsService.readRange(`${this.sheetName}!A1:I1`)
      if (!data.values || data.values.length === 0) {
        const headers = [Object.keys(this.columnMapping)]
        await this.sheetsService.writeRange(`${this.sheetName}!A1:I1`, headers)
      }
    } catch (error) {
      throw new Error(`Failed to initialize Projects sheet: ${error}`)
    }
  }

  /**
   * Get project statistics
   */
  async getProjectStats(): Promise<{
    total: number
    byStatus: Record<ProjectStatus, number>
    totalBudget: number
    averageBudget: number
  }> {
    const allProjects = await this.getAllProjects()
    
    const byStatus = allProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {} as Record<ProjectStatus, number>)

    const totalBudget = allProjects.reduce((sum, project) => sum + (project.budget || 0), 0)
    const averageBudget = allProjects.length > 0 ? totalBudget / allProjects.length : 0

    return {
      total: allProjects.length,
      byStatus,
      totalBudget,
      averageBudget
    }
  }
}