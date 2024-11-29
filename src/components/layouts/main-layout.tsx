'use client'

import { Navbar } from '@/components/navbar'
import { PredictionType } from '@/types'

interface MainLayoutProps {
  children: React.ReactNode
  predictionType: PredictionType
  onPredictionTypeChange: (type: PredictionType) => void
}

export function MainLayout({ 
  children, 
  predictionType, 
  onPredictionTypeChange 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar 
        predictionType={predictionType}
        onPredictionTypeChange={onPredictionTypeChange}
      />
      {children}
    </div>
  )
} 