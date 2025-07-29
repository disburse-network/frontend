"use client"
import { SwapInterface } from "@/components/Swap-interface"
import { FloatingTokens } from "@/components/Floating-tokents"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingTokens />
      <main className="relative z-10">
        <SwapInterface />
      </main>
    </div>
  )
}
