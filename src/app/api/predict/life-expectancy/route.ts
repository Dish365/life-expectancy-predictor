import { NextResponse } from 'next/server'
import { API_BASE_URL } from '@/config/api'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_BASE_URL}/api/predict/life-expectancy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to predict life expectancy')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to predict' },
      { status: 500 }
    )
  }
} 