"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDown, ArrowUpDown, Settings, Info, ArrowRight } from "lucide-react"
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

  // Update tokens when chains change
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

  // Calculate output amount when input changes
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

    // Simulate swap transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Reset form after successful swap
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight px-4">
          Swap anytime,
          <br />
          anywhere.
        </h1>
      </div>

      {/* Beautiful Multi-Chain Selector */}
      <div className="mb-8 w-full max-w-lg">
        <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-xl backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Select Networks</h3>
            <p className="text-sm text-gray-500">Choose source and destination chains</p>
          </div>

          {/* Chain Selectors */}
          <div className="flex items-center justify-between gap-4">
            <ChainSelector selectedChain={fromChain} onChainChange={setFromChain} label="From" variant="from" />

            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapChains}
                className="h-12 w-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ArrowRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            <ChainSelector selectedChain={toChain} onChainChange={setToChain} label="To" variant="to" />
          </div>

          {/* Cross-Chain Info */}
          {fromChain !== toChain && (
            <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 rounded-2xl border border-violet-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Multi-Chain Swap</span>
              </div>
              <div className="text-xs text-gray-600 text-center">Seamless cross-chain token swapping</div>
            </div>
          )}
        </div>
      </div>

      {/* Swap Interface */}
      <div className="w-full max-w-sm sm:max-w-md space-y-1 relative z-10">
        {/* Settings Button */}
        <div className="flex justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* From Token */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 text-sm font-medium">Sell</span>
            <span className="text-gray-500 text-sm">Balance: {fromToken.balance}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Input
              type="number"
              placeholder="0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-2xl sm:text-3xl md:text-4xl font-light border-0 p-0 h-auto bg-transparent focus-visible:ring-0 placeholder:text-gray-300 flex-1 min-w-0"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaxClick}
                className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 h-6 px-2 text-xs rounded-full"
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
          <div className="text-gray-400 text-sm mt-2">
            ${fromAmount ? (Number.parseFloat(fromAmount) * fromToken.price).toFixed(2) : "0.00"}
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center py-2 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapChains}
            className="h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full border-4 border-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {/* To Token */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600 text-sm font-medium">Buy</span>
            {toToken && <span className="text-gray-500 text-sm">Balance: {toToken.balance}</span>}
          </div>
          <div className="flex items-center justify-between gap-3">
            <Input
              type="number"
              placeholder="0"
              value={toAmount}
              readOnly
              className="text-2xl sm:text-3xl md:text-4xl font-light border-0 p-0 h-auto bg-transparent focus-visible:ring-0 placeholder:text-gray-300 flex-1 min-w-0"
            />
            <TokenSelector
              token={toToken}
              onSelect={setToToken}
              availableTokens={getTokensByChain(toChain)}
              placeholder="Select token"
              chainId={toChain}
            />
          </div>
          <div className="text-gray-400 text-sm mt-2">
            ${toAmount && toToken ? (Number.parseFloat(toAmount) * toToken.price).toFixed(2) : "0.00"}
          </div>
        </div>

        {/* Swap Details */}
        {swapData && (
          <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 rounded-xl space-y-3 border border-violet-100 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rate</span>
              <span className="font-medium">
                1 {fromToken.symbol} = {(fromToken.price / toToken!.price).toFixed(6)} {toToken!.symbol}
              </span>
            </div>
            {fromChain !== toChain && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cross-chain fee</span>
                <span className="font-medium">~$2.50</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
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
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Minimum received</span>
              <span className="font-medium">
                {swapData.minimumReceived} {toToken!.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Network fee</span>
              <span className="font-medium">{swapData.networkFee}</span>
            </div>
            {fromChain !== toChain && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated time</span>
                <span className="font-medium text-indigo-600">~2-5 minutes</span>
              </div>
            )}
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!canSwap || isSwapping}
          className={cn(
            "w-full h-16 text-lg font-semibold mt-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl",
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

      {/* Description */}
      <div className="text-center mt-8 sm:mt-12 md:mt-16 max-w-xs sm:max-w-md md:max-w-lg px-4">
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          The largest onchain marketplace. Buy and sell crypto on Ethereum and 12+ other chains.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-12 sm:mt-16 md:mt-20 text-center">
        <p className="text-gray-400 text-sm mb-2">Scroll to learn more</p>
        <ArrowDown className="w-4 h-4 text-gray-400 mx-auto animate-bounce" />
      </div>

      <SwapSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        slippage={slippage}
        onSlippageChange={setSlippage}
      />
    </div>
  )
}
