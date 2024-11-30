import { useState } from 'react'
import axios from 'axios'
import { PredictionResult, SimulationConfig, SimulationResult } from '@/types'
import { API_BASE_URL, handleApiError } from '@/config/api'

// Add request caching for similar predictions
const cache = new Map();

export const useLifeExpectancy = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const { message } = handleApiError(err);
      return message;
    }
    return 'An unexpected error occurred';
  }

  const predict = async (features: number[]) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post<PredictionResult>(
        `${API_BASE_URL}/api/predict/life-expectancy/`, 
        { features }
      )
      setResult(response.data)
      
      // Get existing prediction data if it exists
      const existingData = localStorage.getItem('lastPrediction')
      const parsedData = existingData ? JSON.parse(existingData) : {}
      
      // Store prediction with both values
      localStorage.setItem('lastPrediction', JSON.stringify({
        ...parsedData,
        features,
        prediction: response.data.predicted_life_expectancy, // Life expectancy
        lifeExpectancy: response.data.predicted_life_expectancy,
        timestamp: new Date().toISOString()
      }))
      
      return response.data
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      setResult(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getCacheKey = (config: SimulationConfig) => 
    JSON.stringify({
      features: config.initial_features,
      years: config.years,
      interval: config.interval,
      simulation_type: config.simulation_type
    });

  const simulate = async (config: SimulationConfig): Promise<SimulationResult[] | null> => {
    const cacheKey = getCacheKey(config);
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post<{ simulation_results: SimulationResult[] }>(
        `${API_BASE_URL}/api/simulate/`,
        {
          ...config,
          model_type: 'life_expectancy'
        }
      )
      // Extract simulation_results from the response
      const results = response.data.simulation_results
      cache.set(cacheKey, results);
      return results
    } catch (err) {
      const errorMessage = handleError(err)
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    result,
    predict,
    simulate
  }
}

