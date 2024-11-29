'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FeatureInput } from '@/components/feature-input'
import { PredictionResultCard } from '@/components/prediction-result'
import { WaterShareResult } from '@/components/water-share-result'
import { MainLayout } from '@/components/layouts/main-layout'
import { useLifeExpectancy } from '@/hooks/useLifeExpectancy'
import { useWaterShare } from '@/hooks/useWaterShare'
import type { PredictionType } from '@/types'

export default function PredictPage() {
  const [predictionType, setPredictionType] = useState<PredictionType>('life-expectancy')
  const { isLoading: lifeLoading, error: lifeError, result: lifeResult, predict: predictLife } = useLifeExpectancy()
  const { isLoading: waterLoading, error: waterError, prediction: waterResult, predictWaterShare } = useWaterShare()

  const handlePredict = async (features: number[]) => {
    if (predictionType === 'life-expectancy' || predictionType === 'both') {
      await predictLife(features)
    }
    if (predictionType === 'water-share' || predictionType === 'both') {
      await predictWaterShare(features)
    }
  }

  return (
    <MainLayout 
      predictionType={predictionType}
      onPredictionTypeChange={setPredictionType}
    >
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {(lifeError || waterError) && (
            <Alert variant="destructive">
              <AlertDescription>
                {lifeError || waterError}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeatureInput 
              onPredict={handlePredict}
              isLoading={lifeLoading || waterLoading}
              predictionType={predictionType}
            />

            <div className="space-y-6">
              {(predictionType === 'life-expectancy' || predictionType === 'both') && 
                lifeResult && (
                  <PredictionResultCard result={lifeResult} />
                )
              }
              
              {(predictionType === 'water-share' || predictionType === 'both') && 
                waterResult && (
                  <WaterShareResult prediction={waterResult} />
                )
              }
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
} 