'use client'

import { SimulationResult } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from "framer-motion"

interface SimulationChartProps {
  results: SimulationResult[]
  feature?: string
  type?: 'life-expectancy' | 'water-share'
}

export function SimulationChart({ results, feature, type = 'life-expectancy' }: SimulationChartProps) {
  const chartData = feature 
    ? results.map(r => ({
        year: r.year,
        value: r.features[feature] ?? 0,
        name: feature
      }))
    : results.map(r => ({
        year: r.year,
        value: r.prediction ?? 0,
        name: type === 'life-expectancy' ? 'Life Expectancy' : 'Water Share'
      }))

  // Calculate domain for y-axis based on type
  const getYDomain = () => {
    if (feature) {
      const values = chartData.map(d => d.value).filter(v => v !== undefined && v !== null)
      if (values.length === 0) return [0, 100]
      
      const min = Math.floor(Math.min(...values))
      const max = Math.ceil(Math.max(...values))
      const padding = (max - min) * 0.1
      return [min - padding, max + padding]
    }

    // Default ranges for each type
    if (type === 'life-expectancy') {
      return [65, 90] // Life expectancy range
    } else {
      return [10, 50] // Water share range (percentage)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-[#2B4C6F]">
            {feature || (type === 'life-expectancy' ? 'Life Expectancy Projection' : 'Water Share Projection')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(43, 76, 111, 0.1)" />
                <XAxis 
                  dataKey="year"
                  label={{ value: 'Year', position: 'bottom', offset: -10 }}
                  tick={{ fill: '#2B4C6F' }}
                  stroke="#2B4C6F"
                  tickFormatter={(value) => value.toString()}
                  interval={Math.ceil(results.length / 5)}
                />
                <YAxis
                  domain={getYDomain()}
                  label={{ 
                    value: feature ? 'Value' : (type === 'life-expectancy' ? 'Life Expectancy (years)' : 'Water Share (%)'),
                    angle: -90,
                    position: 'insideLeft',
                    offset: -10,
                    style: { fill: '#2B4C6F' }
                  }}
                  tick={{ fill: '#2B4C6F' }}
                  stroke="#2B4C6F"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid rgba(43, 76, 111, 0.2)',
                    borderRadius: '8px',
                    color: '#2B4C6F',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelFormatter={(value) => `Year: ${value}`}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)}${type === 'water-share' && !feature ? '%' : ''}`,
                    name
                  ]}
                />
                <Legend 
                  wrapperStyle={{ color: '#2B4C6F' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name={feature || (type === 'life-expectancy' ? 'Life Expectancy' : 'Water Share')}
                  stroke="#2B4C6F"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8, fill: '#2B4C6F' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
