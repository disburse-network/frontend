"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowUpDown, Info } from "lucide-react"
import { TokenSelector } from "@/components/token-selector"
import { ChainSelector } from "@/components/Chain-selector"
import { SwapSettings } from "@/components/Swap-settings"
import { tokens, getTokensByChain, calculateSwapRate, type Token } from "@/lib/tokens"
import { cn } from "@/lib/utils"

export function SwapInterface() {
  const [fromChain, setFromChain] = useState(1) // Ethereum
  const [toChain, setToChain] = useState(137) // Polygon
  const [fromToken, setFromToken] = useState<Token>(tokens.find((t) => t.symbol === "ETH" && t.chainId === 1)!)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState("0.5")

  useEffect(() => {
    const fromChainTokens = getTokensByChain(fromChain)
    if (fromChainTokens.length > 0) {
      setFromToken(fromChainTokens[0])
    }
  }, [fromChain])

  useEffect(() => {
    const toChainTokens = getTokensByChain(toChain)
    if (toChainTokens.length > 0 && !toToken) {
      setToToken(toChainTokens[0])
    }
    setFromAmount("")
    setToAmount("")
  }, [toChain, toToken])

  useEffect(() => {
    if (fromToken && toToken && fromAmount && Number.parseFloat(fromAmount) > 0) {
      const result = calculateSwapRate(fromToken, toToken, fromAmount)
      setToAmount(result.outputAmount)
    } else {
      setToAmount("")
    }
  }, [fromToken, toToken, fromAmount])

  const handleSwapChains = () => {
    const tempChain = fromChain
    const tempToken = fromToken
    setFromChain(toChain)
    setToChain(tempChain)
    // Find equivalent token on the new chain or default to first token
    const newFromChainTokens = getTokensByChain(toChain)
    const newToChainTokens = getTokensByChain(tempChain)
    if (toToken) {
      setFromToken(toToken)
    } else if (newFromChainTokens.length > 0) {
      setFromToken(newFromChainTokens[0])
    }
    if (newToChainTokens.length > 0) {
      setToToken(newToChainTokens[0])
    }
    setFromAmount(toAmount)
    setToAmount("")
  }

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount || Number.parseFloat(fromAmount) <= 0) return
    setIsSwapping(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setFromAmount("")
    setToAmount("")
    setIsSwapping(false)
  }

  const handleMaxClick = () => {
    setFromAmount(fromToken.balance)
  }

  const swapData =
    fromToken && toToken && fromAmount && Number.parseFloat(fromAmount) > 0
      ? calculateSwapRate(fromToken, toToken, fromAmount)
      : null

  const canSwap =
    fromToken &&
    toToken &&
    fromAmount &&
    Number.parseFloat(fromAmount) > 0 &&
    Number.parseFloat(fromAmount) <= Number.parseFloat(fromToken.balance)

  const getSwapButtonText = () => {
    if (isSwapping) return "Swapping..."
    if (!fromToken || !toToken) return "Select tokens"
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) return "Enter amount"
    if (Number.parseFloat(fromAmount) > Number.parseFloat(fromToken.balance)) return "Insufficient balance"
    return `Swap ${fromToken.symbol} for ${toToken.symbol}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-[#a18aff] to-[#e0c3fc]">
      <div className="w-full max-w-md mx-auto rounded-3xl bg-white/90 shadow-2xl p-6 md:p-8 relative">
        {/* Chain selectors row */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <ChainSelector selectedChain={fromChain} onChainChange={setFromChain} label="From" variant="from" />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapChains}
            className="h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300 mx-2"
            aria-label="Swap chains"
          >
            <ArrowRight className="w-5 h-5 text-violet-600" />
          </Button>
          <ChainSelector selectedChain={toChain} onChainChange={setToChain} label="To" variant="to" />
        </div>

        {/* Amount and token selector row (FROM) */}
        <div className="mb-8">
          <div className="flex items-center border-none bg-transparent outline-none shadow-none">
            <Input
              type="number"
              placeholder="0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="appearance-none [appearance:textfield] focus:outline-none border-0 ring-0 focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:border-0 rounded-none shadow-none bg-transparent text-4xl font-light p-0 h-auto placeholder:text-gray-300 flex-1 min-w-0 !border-0 !bg-transparent !ring-0 !shadow-none"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMaxClick}
              className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 h-6 px-2 text-xs rounded-full ml-2"
            >
              MAX
            </Button>
            <TokenSelector
              token={fromToken}
              onSelect={setFromToken}
              availableTokens={getTokensByChain(fromChain)}
              chainId={fromChain}
            />
          </div>
        </div>

        {/* To token display (TO) */}
        <div className="mb-8">
          <div className="flex items-center border-none bg-transparent outline-none shadow-none">
            <Input
              type="number"
              placeholder="0"
              value={toAmount}
              readOnly
              className="appearance-none [appearance:textfield] focus:outline-none border-0 ring-0 focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:border-0 rounded-none shadow-none bg-transparent text-4xl font-light p-0 h-auto placeholder:text-gray-300 flex-1 min-w-0 !border-0 !bg-transparent !ring-0 !shadow-none"
            />
            <TokenSelector
              token={toToken}
              onSelect={setToToken}
              availableTokens={getTokensByChain(toChain)}
              placeholder="Select token"
              chainId={toChain}
            />
          </div>
        </div>

        {/* Swap details and action button */}
        {swapData && (
          <div className="mb-4 p-4 bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 rounded-xl border border-violet-100 shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Rate</span>
              <span className="font-medium">
                1 {fromToken.symbol} = {(fromToken.price / toToken!.price).toFixed(6)} {toToken!.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 flex items-center">
                Price Impact
                <Info className="w-3 h-3 ml-1" />
              </span>
              <span
                className={cn(
                  "font-medium",
                  swapData.priceImpact > 3
                    ? "text-red-600"
                    : swapData.priceImpact > 1
                      ? "text-amber-600"
                      : "text-emerald-600",
                )}
              >
                {swapData.priceImpact}%
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Minimum received</span>
              <span className="font-medium">
                {swapData.minimumReceived} {toToken!.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Network fee</span>
              <span className="font-medium">{swapData.networkFee}</span>
            </div>
          </div>
        )}
        <Button
          onClick={handleSwap}
          disabled={!canSwap || isSwapping}
          className={cn(
            "w-full h-14 text-lg font-semibold mt-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl",
            canSwap
              ? fromChain === toChain
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 hover:from-violet-600 hover:via-indigo-600 hover:to-cyan-600 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed",
          )}
        >
          <div className="flex items-center gap-2">
            {isSwapping && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {getSwapButtonText()}
          </div>
        </Button>
      </div>

      {/* Notification/Info Bar (optional) */}
      <div className="w-full max-w-md mx-auto mt-6">
        <div className="flex items-center gap-3 p-4 bg-violet-100 rounded-xl shadow text-violet-800 text-sm">
          <Info className="w-5 h-5" />
          <span>Relay bridges are here! Bridge via Relay for more direct routes between chains!</span>
        </div>
      </div>

      {/* Settings Modal */}
      <SwapSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        slippage={slippage}
        onSlippageChange={setSlippage}
      />
    </div>
  )
}
