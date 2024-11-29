'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { PredictionType } from '@/types'

interface NavbarProps {
  predictionType: PredictionType;
  onPredictionTypeChange: (type: PredictionType) => void;
}

export const Navbar = ({
  predictionType,
  onPredictionTypeChange,
}: NavbarProps) => {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">
                Life Expectancy & Water Share Predictor
              </span>
            </Link>
            <nav className="flex gap-6">
              {[
                ['Predict', '/predict'],
                ['Simulate', '/simulate'],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className={cn(
                    'relative transition-colors hover:text-white',
                    pathname === href ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {pathname === href && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-blue-500"
                      layoutId="navbar-indicator"
                    />
                  )}
                  {name}
                </Link>
              ))}
            </nav>
          </div>
          <select
            aria-label="Prediction type selector"
            value={predictionType}
            onChange={(e) => onPredictionTypeChange(e.target.value as PredictionType)}
            className="rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="life-expectancy">Life Expectancy</option>
            <option value="water-share">Agricultural Water Share</option>
            <option value="both">Both Predictions</option>
          </select>
        </div>
      </nav>
    </div>
  )
}
