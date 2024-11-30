import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/config/api'

export async function POST(request: Request) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API URL not configured');
    }

    const body = await request.json()
    
    const response = await fetch(`${API_BASE_URL}/api/simulate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `Failed to simulate (${response.status})`)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Simulation error:', error)
    
    const status = error instanceof Error && error.message.includes('not configured') 
      ? 503 
      : 500;
      
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred during simulation'
      },
      { status }
    )
  }
} 