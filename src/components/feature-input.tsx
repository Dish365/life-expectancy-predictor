import { useState } from 'react'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Icons, IconKeys } from './icons'
import { FEATURE_CATEGORIES, PredictionType } from '@/types'
import { cn } from '@/lib/utils'

interface FeatureInputProps {
  onPredict: (features: number[]) => void
  isLoading: boolean
  predictionType: PredictionType
}

interface FeatureCategory {
  name: string
  icon: IconKeys
  description: string
  features: string[]
}

export function FeatureInput({ onPredict, isLoading, predictionType }: FeatureInputProps) {
  const [featureValues, setFeatureValues] = useState<Record<string, number>>({})
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleInputChange = (feature: string, value: string) => {
    setFeatureValues(prev => ({
      ...prev,
      [feature]: parseFloat(value) || 0
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const orderedFeatures = Object.values(FEATURE_CATEGORIES).flatMap(
      category => category.features
    ).map(feature => featureValues[feature] || 0)
    
    onPredict(orderedFeatures)
  }

  const renderPredictionTypeLabel = () => {
    switch (predictionType) {
      case 'life-expectancy':
        return 'Life Expectancy'
      case 'water-share':
        return 'Agricultural Water Share'
      case 'both':
        return 'Life Expectancy & Water Share'
      default:
        return 'Prediction'
    }
  }

  const renderIcon = (iconName: IconKeys) => {
    const Icon = Icons[iconName]
    return Icon ? <Icon className="h-5 w-5 text-blue-500" /> : null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          {renderPredictionTypeLabel()} Prediction
        </h2>
      </div>

      {Object.entries(FEATURE_CATEGORIES as Record<string, FeatureCategory>).map(([key, category]) => (
        <Card key={key} className="p-4 bg-gray-800/50 border-gray-700">
          <button
            type="button"
            className="flex items-center justify-between w-full text-left"
            onClick={() => setExpandedCategory(
              expandedCategory === key ? null : key
            )}
          >
            <div className="flex items-center space-x-3">
              {renderIcon(category.icon)}
              <span className="font-medium text-white">{category.name}</span>
            </div>
            <Icons.ChevronDown className={cn(
              "h-5 w-5 transition-transform text-gray-400",
              expandedCategory === key && "transform rotate-180"
            )} />
          </button>

          {expandedCategory === key && (
            <div className="mt-4 grid gap-4">
              <p className="text-sm text-gray-400">{category.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.features.map(feature => (
                  <div key={feature}>
                    <Label htmlFor={feature} className="text-gray-300">
                      {feature}
                    </Label>
                    <Input
                      id={feature}
                      type="number"
                      step="0.01"
                      value={featureValues[feature] || ''}
                      onChange={(e) => handleInputChange(feature, e.target.value)}
                      className="mt-1 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Predicting...
          </>
        ) : (
          <>
            <Icons.Brain className="mr-2 h-4 w-4" />
            Predict {renderPredictionTypeLabel()}
          </>
        )}
      </Button>
    </form>
  )
}

