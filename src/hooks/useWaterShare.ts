import { useState } from 'react';
import axios from 'axios';
import { WaterSharePrediction, WaterShareSimulation } from '../types';

export const useWaterShare = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<WaterSharePrediction | null>(null);
  const [simulation, setSimulation] = useState<WaterShareSimulation | null>(null);

  const predictWaterShare = async (features: number[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<WaterSharePrediction>('/api/predict/water-share', {
        features,
      });
      setPrediction(response.data);

      // Get existing prediction data if it exists
      const existingData = localStorage.getItem('lastPrediction')
      const parsedData = existingData ? JSON.parse(existingData) : {}
      
      // Update storage with water share prediction
      localStorage.setItem('lastPrediction', JSON.stringify({
        ...parsedData,
        features,
        type: 'water-share',
        waterShare: response.data.predicted_water_share,
        timestamp: new Date().toISOString()
      }));

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to predict water share');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const simulateWaterShare = async (
    initialFeatures: number[],
    years: number,
    simulationType: string,
    changeRates: Record<string, number>,
    interval: number = 1
  ): Promise<WaterShareSimulation['simulation_results'] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<WaterShareSimulation>('/api/simulate', {
        initial_features: initialFeatures,
        years,
        simulation_type: simulationType,
        change_rates: changeRates,
        interval,
        model_type: 'water_share'
      });

      // Store the complete simulation data
      setSimulation(response.data);
      
      // Return just the simulation results for the component
      return response.data.simulation_results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to simulate water share');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    prediction,
    simulation,
    predictWaterShare,
    simulateWaterShare,
  };
}; 