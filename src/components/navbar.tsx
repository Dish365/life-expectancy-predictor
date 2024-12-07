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
    <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#2B4C6F]">
                Health & Environmental Indicators Predictor
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
                    'relative transition-colors hover:text-[#2B4C6F]',
                    pathname === href ? 'text-[#2B4C6F]' : 'text-gray-600'
                  )}
                >
                  {pathname === href && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-[#2B4C6F]"
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
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#2B4C6F] focus:border-[#2B4C6F] focus:outline-none"
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
