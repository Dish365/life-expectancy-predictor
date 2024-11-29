import { WaterSharePrediction } from '@/types'
import { Card } from './ui/card'
import { Icons } from './icons'

interface WaterShareResultProps {
  prediction: WaterSharePrediction
}

export function WaterShareResult({ prediction }: WaterShareResultProps) {
  return (
    <Card className="p-6 bg-gray-800/50 border-gray-700">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Icons.Droplet className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-white">
            Predicted Agricultural Water Share
          </h3>
        </div>

        <div className="text-3xl font-bold text-white">
          {prediction.predicted_water_share.toFixed(2)}%
        </div>

        <div className="pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-2">
            Feature Values Used
          </h4>
          <div className="grid gap-2">
            {Object.entries(prediction.features_received).map(([feature, value]) => (
              <div key={feature} className="flex justify-between text-sm">
                <span className="text-gray-400">{feature}</span>
                <span className="text-white font-medium">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 