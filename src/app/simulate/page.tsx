'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion } from "framer-motion"
import Link from 'next/link'
import { MainLayout } from '@/components/layouts/main-layout'
import { useLifeExpectancy } from '@/hooks/useLifeExpectancy'
import { useWaterShare } from '@/hooks/useWaterShare'
import { useSimulation } from '@/hooks/useSimulation'
import type { SimulationConfig, SimulationResult, PredictionType, WaterShareSimulation } from '@/types'
import dynamic from 'next/dynamic';

const WaterShareSimulation = dynamic(
  () => import('@/components/water-share-simulation').then(mod => mod.WaterShareSimulation),
  { ssr: false }
);

const LifeExpectancySimulation = dynamic(
  () => import('@/components/life-expectancy-simulation').then(mod => mod.LifeExpectancySimulation),
  { ssr: false }
);

export default function SimulatePage() {
  const [predictionType, setPredictionType] = useState<PredictionType>('life-expectancy')
  const [lifeResults, setLifeResults] = useState<SimulationResult[]>([])
  const [waterResults, setWaterResults] = useState<WaterShareSimulation['simulation_results']>([])
  const [config, setConfig] = useState<SimulationConfig>({
    initial_features: Array(25).fill(0),
    years: 10,
    interval: 1,
    baselineYear: new Date().getFullYear(),
    simulation_type: 'linear',
    change_rates: {}
  })

  const { 
    loading, 
    error, 
    baseValues, 
    loadBaseValues, 
    clearBaseValues,
    setLoading, 
    setError 
  } = useSimulation()
  
  const { simulate: simulateLife, error: lifeError } = useLifeExpectancy()
  const { simulateWaterShare, error: waterError } = useWaterShare()

  const handleSimulate = async () => {
    if (!baseValues?.features) {
      setError('No base values set')
      return
    }

    setLoading(true)
    try {
      if (predictionType === 'life-expectancy' || predictionType === 'both') {
        const lifeSimResults = await simulateLife(config)
        if (lifeSimResults) {
          console.log('Life expectancy simulation results:', lifeSimResults)
          setLifeResults(lifeSimResults)
        }
      }

      if (predictionType === 'water-share' || predictionType === 'both') {
        const waterSimResults = await simulateWaterShare(
          baseValues.features,
          config.years,
          config.simulation_type,
          config.change_rates || {},
          config.interval
        )
        if (waterSimResults) {
          console.log('Water share simulation results:', waterSimResults)
          setWaterResults(waterSimResults)
        }
      }
    } catch (err) {
      console.error('Simulation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to simulate')
    } finally {
      setLoading(false)
    }
  }

  const handleSetBaseValues = async () => {
    setLoading(true)
    try {
      const values = loadBaseValues()
      if (values) {
        setConfig(prev => ({
          ...prev,
          initial_features: values.features
        }))
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePredictionTypeChange = (type: PredictionType) => {
    setPredictionType(type)
    // Clear results and base values when changing type
    if (type !== 'both') {
      clearBaseValues()  // Clear base values
      setLifeResults([])
      setWaterResults([])
      setConfig(prev => ({
        ...prev,
        initial_features: Array(25).fill(0),
        change_rates: {}
      }))
    }
  }

  const handleReset = () => {
    clearBaseValues()
    setLifeResults([])
    setWaterResults([])
    setConfig({
      initial_features: Array(25).fill(0),
      years: 10,
      interval: 1,
      baselineYear: new Date().getFullYear(),
      simulation_type: 'linear',
      change_rates: {}
    })
  }

  return (
    <MainLayout 
      predictionType={predictionType}
      onPredictionTypeChange={handlePredictionTypeChange}
    >
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">
              {predictionType === 'both' 
                ? 'Life Expectancy & Water Share Simulator'
                : predictionType === 'water-share'
                ? 'Agricultural Water Share Simulator'
                : 'Life Expectancy Simulator'}
            </h1>
            {baseValues && (
              <Button 
                onClick={handleReset}
                variant="outline"
                className="text-gray-400 border-gray-600 hover:bg-white/10 hover:text-white hover:border-gray-400"
              >
                Reset Simulation
              </Button>
            )}
          </div>

          {(error || lifeError || waterError) && (
            <Alert variant="destructive">
              <AlertDescription className="text-white font-medium">
                {error || lifeError || waterError}
              </AlertDescription>
            </Alert>
          )}

          {!baseValues ? (
            <Card className="p-6 text-center bg-black/50 backdrop-blur-xl border-gray-800">
              <h2 className="text-2xl font-semibold mb-4 text-white">Set Base Values</h2>
              <p className="mb-4 text-gray-200">To run a simulation, you need to set base values first.</p>
              <div className="space-y-4">
                <Button 
                  onClick={handleSetBaseValues}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-medium"
                >
                  Use Last Prediction
                </Button>
                <div className="text-sm text-gray-300">or</div>
                <Link href="/?redirect=simulate">
                  <Button 
                    variant="outline" 
                    className="text-gray-400 border-gray-600 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-all"
                  >
                    Make New Prediction
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {(predictionType === 'water-share' || predictionType === 'both') && (
                <WaterShareSimulation
                  baseValues={baseValues}
                  config={config}
                  results={waterResults}
                  loading={loading}
                  onConfigChange={setConfig}
                  onSimulate={handleSimulate}
                />
              )}
              
              {(predictionType === 'life-expectancy' || predictionType === 'both') && (
                <LifeExpectancySimulation
                  baseValues={baseValues}
                  config={config}
                  results={lifeResults}
                  loading={loading}
                  onConfigChange={setConfig}
                  onSimulate={handleSimulate}
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  )
}

