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
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-[#2B4C6F]">Water Share Base Values</h3>
            {baseValues && (
              <div className="text-[#4A7198]">
                Initial Water Share: {baseValues.waterShare?.toFixed(2)}%
              </div>
            )}
          </div>
          
          <Tabs defaultValue="basic">
            <TabsList className="w-full bg-[#EDF3F8]">
              <TabsTrigger value="basic" className="flex-1 text-[#4A7198] data-[state=active]:text-[#2B4C6F] data-[state=active]:bg-white">
                Basic Settings
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1 text-[#4A7198] data-[state=active]:text-[#2B4C6F] data-[state=active]:bg-white">
                Change Rates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-[#2B4C6F] font-medium">Baseline Year</Label>
                  <Input 
                    type="number" 
                    value={config.baselineYear}
                    onChange={(e) => onConfigChange({
                      ...config,
                      baselineYear: parseInt(e.target.value)
                    })}
                    className="bg-white border-gray-200 text-[#2B4C6F] focus:border-[#2B4C6F]"
                  />
                </div>

                <div>
                  <Label className="text-[#2B4C6F] font-medium">Years to Simulate</Label>
                  <Input 
                    type="number" 
                    value={config.years}
                    onChange={(e) => onConfigChange({
                      ...config,
                      years: parseInt(e.target.value)
                    })}
                    className="bg-white border-gray-200 text-[#2B4C6F] focus:border-[#2B4C6F]"
                  />
                </div>

                <div>
                  <Label className="text-[#2B4C6F] font-medium">Interval (years)</Label>
                  <Input 
                    type="number"
                    value={config.interval}
                    onChange={(e) => onConfigChange({
                      ...config,
                      interval: parseInt(e.target.value)
                    })}
                    className="bg-white border-gray-200 text-[#2B4C6F] focus:border-[#2B4C6F]"
                  />
                </div>

                <div>
                  <Label htmlFor="simulation-type" className="text-[#2B4C6F] font-medium">
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
                    className="w-full p-2 bg-white border-gray-200 rounded-md text-[#2B4C6F]"
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
                  <Label className="text-[#2B4C6F] font-medium">
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
                    className="bg-white border-gray-200 text-[#2B4C6F] focus:border-[#2B4C6F]"
                  />
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <Button 
            className="w-full mt-6 bg-[#2B4C6F] hover:bg-[#1D3557] text-white" 
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
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium mb-2 text-[#4A7198]">{feature}</div>
                    <div className="text-2xl font-bold text-[#2B4C6F]">
                      {(results[results.length - 1]?.features[feature] ?? 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-[#4A7198]">
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