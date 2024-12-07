import { WaterSharePrediction } from '@/types'
import { Card } from './ui/card'
import { Icons } from './icons'

interface WaterShareResultProps {
  prediction: WaterSharePrediction
}

export function WaterShareResult({ prediction }: WaterShareResultProps) {
  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Icons.Droplet className="h-6 w-6 text-[#2B4C6F]" />
          <h3 className="text-lg font-semibold text-[#2B4C6F]">
            Predicted Agricultural Water Share
          </h3>
        </div>

        <div className="text-3xl font-bold text-[#2B4C6F]">
          {prediction.predicted_water_share.toFixed(2)}%
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-[#4A7198] mb-2">
            Feature Values Used
          </h4>
          <div className="grid gap-2">
            {Object.entries(prediction.features_received).map(([feature, value]) => (
              <div key={feature} className="flex justify-between text-sm">
                <span className="text-[#4A7198]">{feature}</span>
                <span className="text-[#2B4C6F] font-medium">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 