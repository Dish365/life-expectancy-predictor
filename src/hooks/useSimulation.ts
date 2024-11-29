import { useState } from 'react'
import { PredictionType } from '@/types'

interface BaseValues {
  features: number[]
  lifeExpectancy?: number
  waterShare?: number
  type: PredictionType
  timestamp: string
}

export const useSimulation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [baseValues, setBaseValues] = useState<BaseValues | null>(null)

  const loadBaseValues = () => {
    try {
      const lastPrediction = localStorage.getItem('lastPrediction')
      if (!lastPrediction) {
        throw new Error('No previous prediction found')
      }

      const parsed = JSON.parse(lastPrediction)
      if (!parsed.features) {
        throw new Error('Invalid prediction data')
      }

      const baseValues: BaseValues = {
        features: parsed.features,
        timestamp: parsed.timestamp,
        type: parsed.type || 'both',
        lifeExpectancy: parsed.lifeExpectancy || parsed.prediction,
        waterShare: parsed.waterShare
      }

      setBaseValues(baseValues)
      return baseValues
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load base values')
      return null
    }
  }

  const clearBaseValues = () => {
    setBaseValues(null)
    setError(null)
  }

  return {
    loading,
    error,
    baseValues,
    loadBaseValues,
    clearBaseValues,
    setLoading,
    setError
  }
} 