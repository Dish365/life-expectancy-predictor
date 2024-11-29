import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Predict - Life Expectancy & Water Share Predictor',
  description: 'Make predictions for life expectancy and agricultural water share based on food system indicators',
}

export default function PredictLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 