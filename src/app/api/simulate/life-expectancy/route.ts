import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/config/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_BASE_URL}/api/simulate/life-expectancy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to simulate life expectancy')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Simulation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to simulate' },
      { status: 500 }
    )
  }
} 