"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Search, TrendingUp, TrendingDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CryptoImage } from "@/components/ui/crypto-image";
import type { Token } from "@/lib/tokens";
import { getChainById } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface TokenSelectorProps {
  token: Token | null;
  onSelect: (token: Token) => void;
  availableTokens: Token[];
  placeholder?: string;
  chainId: number;
}

export function TokenSelector({
  token,
  onSelect,
  availableTokens,
  placeholder = "Select token",
  chainId,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const chain = getChainById(chainId);

  const filteredTokens = availableTokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase()),
  );

  const popularTokens = availableTokens.slice(0, 4);

  const handleSelect = (selectedToken: Token) => {
    onSelect(selectedToken);
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center space-x-2 h-auto p-3 border-2 transition-all duration-300",
            token
              ? "bg-cyber-dark-lighter hover:bg-cyber-dark border-cyber-orange text-foreground"
              : "bg-cyber-orange hover:bg-cyber-orange-light border-cyber-orange text-cyber-dark cyber-glow",
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

      <DialogContent
        className="max-w-md shadow-2xl border-2 border-cyber-orange bg-cyber-dark"
        style={{ zIndex: 9999 }}
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">
              Select Token
            </span>
            {chain && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-cyber-dark-lighter border-2 border-cyber-orange">
                <CryptoImage
                  src={chain.logoURI}
                  alt={chain.name}
                  width={16}
                  height={16}
                />
                <span className="text-sm font-semibold text-foreground">
                  {chain.name}
                </span>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search name or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-cyber-dark-lighter border-cyber-orange focus:bg-cyber-dark"
            />
          </div>

          {/* Popular Tokens */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Popular Tokens
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularTokens.map((popularToken) => (
                <Button
                  key={`${popularToken.address}-${popularToken.chainId}`}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelect(popularToken)}
                  className="flex items-center space-x-2 h-9 px-3 border-2 border-cyber-orange hover:bg-cyber-orange hover:text-cyber-dark transition-all duration-200"
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
                  className="w-full justify-between p-4 h-auto hover:bg-cyber-dark-lighter border-2 border-transparent hover:border-cyber-orange transition-all duration-200 group"
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
                      <div className="font-bold text-foreground flex items-center gap-2">
                        {tokenItem.symbol}
                        {tokenItem.priceChange24h !== 0 && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs flex items-center gap-1 border-2",
                              tokenItem.priceChange24h > 0
                                ? "bg-success text-success-foreground border-success"
                                : "bg-destructive text-destructive-foreground border-destructive",
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
                      <div className="text-sm text-muted-foreground font-medium">
                        {tokenItem.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground">
                      {tokenItem.balance}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      ${tokenItem.price.toLocaleString()}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
