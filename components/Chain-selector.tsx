"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, CheckCircle } from "lucide-react"
import { CryptoImage } from "@/components/ui/crypto-image"
import { chains, getChainById, Chain } from "@/lib/tokens"
import { cn } from "@/lib/utils"

interface ChainSelectorProps {
  selectedChain: number
  onChainChange: (chainId: number) => void
  label?: string
  variant?: "from" | "to"
}

export function ChainSelector({ selectedChain, onChainChange, label, variant = "from" }: ChainSelectorProps) {
  const currentChain = getChainById(selectedChain)

  const gradientClasses = {
    from: "bg-gradient-to-br from-violet-100 via-violet-50 to-white hover:from-violet-200 hover:via-violet-100 hover:to-violet-50 border-violet-200 shadow-violet-100",
    to: "bg-gradient-to-br from-cyan-100 via-cyan-50 to-white hover:from-cyan-200 hover:via-cyan-100 hover:to-cyan-50 border-cyan-200 shadow-cyan-100",
  }

  return (
    <div className="flex-1">
      {label && (
        <div className="text-sm font-semibold text-gray-700 mb-3 text-center flex items-center justify-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", variant === "from" ? "bg-violet-500" : "bg-cyan-500")} />
          {label}
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full flex flex-col items-center space-y-3 p-6 h-auto rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
              gradientClasses[variant],
            )}
          >
            {currentChain && (
              <>
                <div className="relative">
                  <CryptoImage
                    src={currentChain.logoURI}
                    alt={currentChain.name}
                    width={40}
                    height={40}
                    className="shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ChevronDown className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900 text-base">{currentChain.name}</div>
                  <div className="text-sm text-gray-600 font-medium">{currentChain.symbol}</div>
                </div>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 p-2 shadow-2xl border-0 bg-white/95 backdrop-blur-xl"
          style={{ zIndex: 9999 }}
        >
          <div className="mb-2 px-3 py-2">
            <h4 className="font-semibold text-gray-900 text-sm">Select Network</h4>
            <p className="text-xs text-gray-500">Choose your preferred blockchain</p>
          </div>
          {chains.map((chain: Chain) => (
            <DropdownMenuItem
              key={chain.id}
              onClick={() => onChainChange(chain.id)}
              className="flex items-center justify-between p-4 cursor-pointer rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <CryptoImage
                    src={chain.logoURI}
                    alt={chain.name}
                    width={32}
                    height={32}
                    className="shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  {chain.id === selectedChain && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{chain.name}</div>
                  <div className="text-sm text-gray-500">{chain.symbol}</div>
                </div>
              </div>
              {chain.id === selectedChain && (
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-xs font-medium text-emerald-700">Active</span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
