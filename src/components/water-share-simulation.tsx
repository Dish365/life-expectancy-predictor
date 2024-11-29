import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimulationConfig, type WaterShareSimulation } from "@/types"
import { SimulationChart } from './simulation-chart'

interface WaterShareSimulationProps {
  baseValues: { 
    features: number[]; 
    lifeExpectancy?: number;
    waterShare?: number;
  } | null;
  config: SimulationConfig;
  results: WaterShareSimulation['simulation_results'];
  loading: boolean;
  onConfigChange: (config: SimulationConfig) => void;
  onSimulate: () => void;
}

const keyWaterFeatures = [
  'FP index',
  'LP index',
  'Pulses-FS',
  'Fruits-FS',
  'Meat-FS',
  'Vegetables-FS',
  'Milk-FS',
  'Fruits-LS',
  'Energy use',
  'Renewable energy'
]

export function WaterShareSimulation({
  baseValues,
  config,
  results,
  loading,
  onConfigChange,
  onSimulate
}: WaterShareSimulationProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-xl border-gray-800">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-white">Water Share Base Values</h3>
            {baseValues && (
              <div className="text-gray-200">
                Initial Water Share: {baseValues.waterShare?.toFixed(2)}%
              </div>
            )}
          </div>
          
          <Tabs defaultValue="basic">
            <TabsList className="w-full bg-gray-800/50">
              <TabsTrigger value="basic" className="flex-1 text-gray-200 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                Basic Settings
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1 text-gray-200 data-[state=active]:text-white data-[state=active]:bg-gray-700">
                Change Rates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-200 font-medium">Baseline Year</Label>
                  <Input 
                    type="number" 
                    value={config.baselineYear}
                    onChange={(e) => onConfigChange({
                      ...config,
                      baselineYear: parseInt(e.target.value)
                    })}
                    className="bg-gray-900/80 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-gray-200 font-medium">Years to Simulate</Label>
                  <Input 
                    type="number" 
                    value={config.years}
                    onChange={(e) => onConfigChange({
                      ...config,
                      years: parseInt(e.target.value)
                    })}
                    className="bg-gray-900/80 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-gray-200 font-medium">Interval (years)</Label>
                  <Input 
                    type="number"
                    value={config.interval}
                    onChange={(e) => onConfigChange({
                      ...config,
                      interval: parseInt(e.target.value)
                    })}
                    className="bg-gray-900/80 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="simulation-type" className="text-gray-200 font-medium">
                    Simulation Type
                  </Label>
                  <select 
                    id="simulation-type"
                    value={config.simulation_type}
                    aria-label="Simulation Type"
                    onChange={(e) => onConfigChange({
                      ...config,
                      simulation_type: e.target.value as 'linear' | 'exponential'
                    })}
                    className="w-full p-2 bg-gray-900/80 border-gray-600 rounded-md text-white"
                  >
                    <option value="linear">Linear</option>
                    <option value="exponential">Exponential</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              {keyWaterFeatures.map((feature) => (
                <div key={feature}>
                  <Label className="text-gray-200 font-medium">
                    {feature} (% change per year)
                  </Label>
                  <Input
                    type="number"
                    value={config.change_rates?.[feature] || 0}
                    onChange={(e) => onConfigChange({
                      ...config,
                      change_rates: {
                        ...config.change_rates,
                        [feature]: parseFloat(e.target.value)
                      }
                    })}
                    className="bg-gray-900/80 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <Button 
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-medium" 
            onClick={onSimulate}
            disabled={loading}
          >
            {loading ? 'Simulating...' : 'Run Water Share Simulation'}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <>
          <SimulationChart 
            results={results}
            type="water-share"
          />
          <div className="grid grid-cols-2 gap-4">
            {keyWaterFeatures.map((feature) => (
              <div key={feature} className="space-y-4">
                <Card className="bg-black/50 backdrop-blur-xl border-gray-800">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium mb-2 text-gray-200">{feature}</div>
                    <div className="text-2xl font-bold text-white">
                      {(results[results.length - 1]?.features[feature] ?? 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-300">
                      Change: {(((results[results.length - 1]?.features[feature] ?? 0) - 
                                (results[0]?.features[feature] ?? 0)) / 
                                (results[0]?.features[feature] ?? 1) * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <SimulationChart 
                  results={results}
                  feature={feature}
                  type="water-share"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 