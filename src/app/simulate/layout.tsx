import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export const metadata: Metadata = {
  title: 'Simulation - Life Expectancy & Water Share Predictor',
  description: 'Simulate future predictions for life expectancy and agricultural water share',
}

export default function SimulateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 