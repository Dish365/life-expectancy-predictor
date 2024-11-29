import { IconKeys } from '@/components/icons'

export interface PredictionResult {
    predicted_life_expectancy: number
    features_received: Record<string, number>
    confidence_score?: number
    model_version?: string
  }
  
  export interface SimulationConfig {
    initial_features: number[]
    years: number
    interval: number
    baselineYear: number
    simulation_type: 'linear' | 'exponential'
    change_rates?: Record<string, number>
  }
  
  export interface SimulationResult {
    year: number
    prediction: number
    features: Record<string, number>
  }
  
  export interface PredictionValues {
    features: number[]
    prediction: number
  }
  
  export interface FeatureCategory {
    name: string
    icon: IconKeys
    description: string
    features: string[]
  }
  
  export const FEATURE_CATEGORIES: Record<string, FeatureCategory> = {
    'Food Production': {
      name: 'Food Production',
      icon: 'Brain',
      description: 'Indicators related to food production and agriculture',
      features: ['FP index', 'LP index']
    },
    'Food Supply': {
      name: 'Food Supply',
      icon: 'Wheat',
      description: 'Food supply and consumption metrics',
      features: [
        'Vegetal Pds-FS',
        'Cereals -FS',
        'Starchy Rts-FS',
        'Pulses-FS',
        'Fruits -FS',
        'Meat-FS',
        'Fish-FS',
        'Sugar & Swt-FS',
        'Oils-FS',
        'Vegetables-FS',
        'Spices-FS',
        'Eggs-FS',
        'Milk-FS',
      ]
    },
    'Loss and Stock': {
      name: 'Loss and Stock',
      icon: 'Activity',
      description: 'Food loss and stock management indicators',
      features: [
        'Cereals-LSF',
        'Starchy Rts-LSF',
        'Pulses-LSF',
        'Meat-LSF',
        'Fish-LSF',
        'Cereals-LS',
        'Starchy-LS',
        'Fruits-LS',
      ]
    },
    'Energy': {
      name: 'Energy',
      icon: 'Flame',
      description: 'Energy consumption and sustainability metrics',
      features: ['Energy use', 'Renewable energy']
    }
  }
  
  export type PredictionType = 'life-expectancy' | 'water-share' | 'both';
  
  export interface WaterSharePrediction {
    predicted_water_share: number;
    features_received: Record<string, number>;
  }
  
  export type WaterShareSimulation = {
    simulation_results: {
      year: number;
      prediction: number;
      features: Record<string, number>;
    }[];
    metadata: {
      years: number;
      interval: number;
      simulation_type: string;
      feature_names: string[];
    };
  }
  
  export interface PredictionState {
    type: PredictionType;
    lifeExpectancy?: number;
    waterShare?: number;
    isLoading: boolean;
    error?: string;
  }
  
  export interface SimulationState {
    type: PredictionType;
    lifeExpectancyResults?: SimulationResult[];
    waterShareResults?: WaterShareSimulation['simulation_results'];
    isLoading: boolean;
    error?: string;
  }
  
  export interface BaseValues {
    features: number[];
    prediction: number;
  }
  
  