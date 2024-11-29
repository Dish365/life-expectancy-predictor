'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Activity, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="FS-ROAS Logo"
                width={40}
                height={40}
                className="h-8 w-8"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">FS-ROAS</span>
                <span className="text-xs text-muted-foreground">
                  Food System Rapid Overview Assessment through Scenarios
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <select
                className="bg-transparent text-sm focus:outline-none"
                defaultValue="en"
                aria-label="Select language"
              >
                <option value="en">English</option>
              </select>
              <Link href="/predict" className="text-sm hover:text-primary">
                Predictor
              </Link>
              <Link href="/simulate" className="text-sm hover:text-primary">
                Simulator
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-6xl font-serif italic text-white">
              Welcome
              <span className="block mt-2 text-4xl font-sans font-bold not-italic">
                to Food System Rapid Overview Assessment through Scenarios
              </span>
            </h1>
            <p className="text-xl text-blue-300 italic">
              A toolbox for exploring the ramifications of meeting environmental and health targets through 
              scenario construction using selected food system indicators
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                onClick={() => router.push('/predict')}
              >
                Predictor
              </Button>
              <Button 
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                onClick={() => router.push('/simulate')}
              >
                Simulator
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/world-map.png"
              alt="World Map"
              width={600}
              height={400}
              className="w-full"
              priority
            />
          </motion.div>
        </div>

        {/* How It Works Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-center text-white">How FS-ROAS Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="flex flex-col gap-8">
                {[
                  { step: "01", title: "Select a food system region of interest" },
                  { step: "02", title: "Define health and environmental targets" },
                  { step: "03", title: "Define endline year and run simulation" },
                  { step: "04", title: "Compare Stylized Scenarios with baselines" }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                        {item.step}
                      </div>
                      {index < 3 && (
                        <div className="absolute top-12 left-1/2 h-8 w-0.5 bg-blue-600 -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 p-4 rounded-lg border border-blue-200 bg-white">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Image
                src="/interface-preview.png"
                alt="Interface Preview"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="flex justify-end">
                <Link href="/predict">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Try Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-center text-white">Benefits of FS-ROAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Opportunity to design food system sustainability strategies through scenarios"
              },
              {
                icon: Activity,
                title: "Generate evidence to support commitment to sustainability strategies"
              },
              {
                icon: Users,
                title: "Initiate discourse with policymakers and key stakeholders"
              }
            ].map((benefit) => (
              <Card key={benefit.title} className="p-6 bg-white shadow-md">
                <div className="flex flex-col items-center text-center gap-4">
                  {React.createElement(benefit.icon, {
                    className: "w-8 h-8 text-blue-600"
                  })}
                  <p className="font-medium">{benefit.title}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Useful Links Section */}
        <section className="space-y-12">
          <h2 className="text-4xl font-bold text-center text-white">Useful links for Food System Evaluations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Circular BioStartKit",
                description: "It provides commodity specific technology with associated economic and environmental..."
              },
              {
                title: "LAPS System",
                description: "It provides commodity specific technology with associated economic and environmental..."
              },
              {
                title: "McGill DISH",
                description: "It provides commodity specific technology with associated economic and environmental..."
              }
            ].map((link) => (
              <Card key={link.title} className="bg-white/5 backdrop-blur-sm border-gray-800 p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">{link.title}</h3>
                  <p className="text-gray-300">{link.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 text-white border-white hover:bg-white hover:text-purple-900 transition-colors"
                  >
                    Learn more
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          All copyright reserved at Sustainable Food System Engineering (SFSE) Lab ©2024
        </div>
      </footer>
    </div>
  )
}

