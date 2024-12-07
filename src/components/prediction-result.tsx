import { motion } from "framer-motion"
import { Activity } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { PredictionResult } from "@/types"

interface PredictionResultCardProps {
  result: PredictionResult
}

export function PredictionResultCard({ result }: PredictionResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full bg-[#EDF3F8] p-3 border border-[#2B4C6F]/20">
              <Activity className="w-6 h-6 text-[#2B4C6F]" />
            </div>
            
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-[#2B4C6F]">
                Predicted Life Expectancy
              </h2>
              <p className="text-[#4A7198]">Based on the provided factors</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-7xl md:text-8xl font-bold text-[#2B4C6F]">
                {result.predicted_life_expectancy.toFixed(2)}
              </div>
              <div className="text-2xl text-[#4A7198] mt-2">years</div>
            </div>

            <div className="w-full max-w-md border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-[#4A7198]">Confidence Score</div>
                  <div className="text-2xl font-semibold text-[#2B4C6F]">
                    {result.confidence_score}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[#4A7198]">Model Version</div>
                  <div className="text-2xl font-semibold text-[#2B4C6F]">
                    {result.model_version}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

