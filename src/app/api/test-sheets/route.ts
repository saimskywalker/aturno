import { NextRequest, NextResponse } from 'next/server'
import { createGoogleSheetsService, TaskSheetService, ProjectSheetService } from '@/services'
import { handleSheetsError } from '@/lib'

export async function GET(request: NextRequest) {
  try {
    // Check if required environment variables are present
    const requiredEnvVars = ['SPREADSHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY']
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing environment variables: ${missingVars.join(', ')}`,
        message: 'Please configure Google Sheets API credentials'
      }, { status: 400 })
    }

    // Initialize Google Sheets service
    const sheetsService = createGoogleSheetsService()
    
    // Test basic connectivity
    const sheetNames = await sheetsService.getSheetNames()
    
    // Initialize task and project services
    const taskService = new TaskSheetService(sheetsService)
    const projectService = new ProjectSheetService(sheetsService)

    // Initialize sheets if they don't exist
    await taskService.initializeSheet()
    await projectService.initializeSheet()

    // Test reading data (this will return empty arrays if sheets are new)
    const tasks = await taskService.getAllTasks()
    const projects = await projectService.getAllProjects()

    return NextResponse.json({
      success: true,
      data: {
        connection: 'successful',
        spreadsheetId: process.env.SPREADSHEET_ID,
        availableSheets: sheetNames,
        tasksCount: tasks.length,
        projectsCount: projects.length,
        sampleTasks: tasks.slice(0, 3), // Show first 3 tasks if any
        sampleProjects: projects.slice(0, 3) // Show first 3 projects if any
      },
      message: 'Google Sheets integration test successful'
    })

  } catch (error) {
    console.error('Google Sheets test error:', error)
    
    const sheetsError = handleSheetsError(error)
    
    return NextResponse.json({
      success: false,
      error: sheetsError.code,
      message: sheetsError.message,
      details: process.env.NODE_ENV === 'development' ? sheetsError.details : undefined
    }, { status: sheetsError.statusCode })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    const sheetsService = createGoogleSheetsService()
    const taskService = new TaskSheetService(sheetsService)
    const projectService = new ProjectSheetService(sheetsService)

    switch (action) {
      case 'create_sample_project':
        await projectService.createProject({
          team_id: 'team_sample',
          name: 'Sample Project',
          description: 'This is a test project created via Google Sheets API',
          status: 'active',
          created_by: 'api_test',
          budget: 5000,
          color: '#3B82F6'
        })
        
        return NextResponse.json({
          success: true,
          message: 'Sample project created successfully'
        })

      case 'create_sample_task':
        // First, let's get projects to use a real project ID
        const projects = await projectService.getAllProjects()
        const projectId = projects.length > 0 ? projects[0]?.id || 'proj_sample' : 'proj_sample'

        await taskService.createTask({
          project_id: projectId,
          title: 'Sample Task',
          description: 'This is a test task created via Google Sheets API',
          status: 'todo',
          priority: 'medium',
          created_by: 'api_test',
          labels: ['test', 'api']
        })

        return NextResponse.json({
          success: true,
          message: 'Sample task created successfully'
        })

      case 'get_stats':
        const taskStats = await taskService.getTaskStats()
        const projectStats = await projectService.getProjectStats()

        return NextResponse.json({
          success: true,
          data: {
            tasks: taskStats,
            projects: projectStats
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          message: 'Supported actions: create_sample_project, create_sample_task, get_stats'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Google Sheets test POST error:', error)
    
    const sheetsError = handleSheetsError(error)
    
    return NextResponse.json({
      success: false,
      error: sheetsError.code,
      message: sheetsError.message,
      details: process.env.NODE_ENV === 'development' ? sheetsError.details : undefined
    }, { status: sheetsError.statusCode })
  }
}