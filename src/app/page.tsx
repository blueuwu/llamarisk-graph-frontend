'use client'

import PriceChart from '@/components/charts/PriceChart'

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(0,15,38)] text-[rgb(253,248,216)] px-2 md:px-8 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 px-2 md:px-1">
          <h1 className="text-3xl font-light mb-3">Real-time Prices</h1>
          <p className="text-base text-gray-400 tracking-wider">CRV • crvUSD • scrvUSD</p>
        </div>
        
        <div className="bg-gradient-to-br from-[rgba(13,25,45,0.8)] to-[rgba(13,25,45,0.6)] backdrop-blur-sm p-3 md:p-8 rounded-xl shadow-xl border border-[rgba(255,255,255,0.05)]">
          <PriceChart />
        </div>
      </div>
    </main>
  )
}