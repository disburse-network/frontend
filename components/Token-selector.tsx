"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, Search, TrendingUp, TrendingDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { CryptoImage } from "@/components/ui/crypto-image"
import type { Token } from "@/lib/tokens"
import { getChainById } from "@/lib/tokens"
import { cn } from "@/lib/utils"

interface TokenSelectorProps {
  token: Token | null
  onSelect: (token: Token) => void
  availableTokens: Token[]
  placeholder?: string
  chainId: number
}

export function TokenSelector({
  token,
  onSelect,
  availableTokens,
  placeholder = "Select token",
  chainId,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const chain = getChainById(chainId)

  const filteredTokens = availableTokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase()),
  )

  const popularTokens = availableTokens.slice(0, 4)

  const handleSelect = (selectedToken: Token) => {
    onSelect(selectedToken)
    setOpen(false)
    setSearch("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center space-x-2 h-auto p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md",
            token
              ? "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              : "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-violet-200",
          )}
        >
          {token ? (
            <>
              <CryptoImage
                src={token.logoURI}
                alt={token.symbol}
                width={24}
                height={24}
                className="shadow-sm"
              />
              <span className="font-semibold">{token.symbol}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          ) : (
            <>
              <span className="font-semibold">{placeholder}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-xl" style={{ zIndex: 9999 }}>
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Select Token</span>
            {chain && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border">
                <CryptoImage
                  src={chain.logoURI}
                  alt={chain.name}
                  width={16}
                  height={16}
                />
                <span className="text-sm font-semibold text-gray-700">{chain.name}</span>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search name or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
            />
          </div>

          {/* Popular Tokens */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Tokens</h4>
            <div className="flex flex-wrap gap-2">
              {popularTokens.map((popularToken) => (
                <Button
                  key={`${popularToken.address}-${popularToken.chainId}`}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelect(popularToken)}
                  className="flex items-center space-x-2 h-9 px-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <CryptoImage
                    src={popularToken.logoURI}
                    alt={popularToken.symbol}
                    width={16}
                    height={16}
                  />
                  <span className="font-medium">{popularToken.symbol}</span>
                </Button>
              ))}
            </div>
          </div>

          <ScrollArea className="h-80">
            <div className="space-y-1">
              {filteredTokens.map((tokenItem) => (
                <Button
                  key={`${tokenItem.address}-${tokenItem.chainId}`}
                  variant="ghost"
                  onClick={() => handleSelect(tokenItem)}
                  className="w-full justify-between p-4 h-auto hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <CryptoImage
                      src={tokenItem.logoURI}
                      alt={tokenItem.symbol}
                      width={36}
                      height={36}
                      className="shadow-sm group-hover:shadow-md transition-shadow"
                    />
                    <div className="text-left">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {tokenItem.symbol}
                        {tokenItem.priceChange24h !== 0 && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs flex items-center gap-1",
                              tokenItem.priceChange24h > 0
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800",
                            )}
                          >
                            {tokenItem.priceChange24h > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {tokenItem.priceChange24h > 0 ? "+" : ""}
                            {tokenItem.priceChange24h.toFixed(2)}%
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">{tokenItem.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{tokenItem.balance}</div>
                    <div className="text-sm text-gray-500 font-medium">${tokenItem.price.toLocaleString()}</div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
