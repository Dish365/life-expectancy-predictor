import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/config/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Simulation request body:', body)
    
    const response = await fetch(`${API_BASE_URL}/api/simulate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log('Simulation response:', data)

    if (!response.ok) {
      throw new Error(data.error || 'Failed to simulate')
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