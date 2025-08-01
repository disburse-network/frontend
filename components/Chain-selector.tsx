"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CheckCircle } from "lucide-react";
import { CryptoImage } from "@/components/ui/crypto-image";
import { chains, getChainById, Chain } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface ChainSelectorProps {
  selectedChain: number;
  onChainChange: (chainId: number) => void;
  label?: string;
  variant?: "from" | "to";
}

export function ChainSelector({
  selectedChain,
  onChainChange,
  label,
  variant = "from",
}: ChainSelectorProps) {
  const currentChain = getChainById(selectedChain);

  const cyberClasses = {
    from: "bg-cyber-dark border-2 border-cyber-orange hover:bg-cyber-dark-lighter hover:border-cyber-orange-light cyber-glow",
    to: "bg-cyber-dark border-2 border-cyber-orange hover:bg-cyber-dark-lighter hover:border-cyber-orange-light cyber-glow",
  };

  return (
    <div className="flex-1">
      {label && (
        <div className="text-sm font-semibold text-cyber-orange mb-3 text-center flex items-center justify-center gap-2">
          <div
            className={cn(
              "w-2 h-2",
              variant === "from" ? "bg-cyber-orange" : "bg-cyber-orange",
            )}
          />
          {label}
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full flex items-center justify-between p-4 h-auto border-2 transition-all duration-300 transform hover:scale-105",
              cyberClasses[variant],
            )}
          >
            {currentChain && (
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <CryptoImage
                      src={currentChain.logoURI}
                      alt={currentChain.name}
                      width={32}
                      height={32}
                      className="shadow-md"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground text-base">
                      {currentChain.name}
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-cyber-orange" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 p-2 shadow-2xl border-2 border-cyber-orange bg-cyber-dark"
          style={{ zIndex: 9999 }}
        >
          <div className="mb-2 px-3 py-2">
            <h4 className="font-semibold text-foreground text-sm">
              Select Network
            </h4>
            <p className="text-xs text-muted-foreground">
              Choose your preferred blockchain
            </p>
          </div>
          {chains.map((chain: Chain) => (
            <DropdownMenuItem
              key={chain.id}
              onClick={() => onChainChange(chain.id)}
              className="flex items-center justify-between p-4 cursor-pointer border-2 border-transparent hover:border-cyber-orange hover:bg-cyber-dark-lighter transition-all duration-200 group"
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
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-success-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {chain.name}
                  </div>
                </div>
              </div>
              {chain.id === selectedChain && (
                <div className="flex items-center gap-1 px-2 py-1 bg-success border-2 border-success">
                  <div className="w-2 h-2 bg-success-foreground" />
                  <span className="text-xs font-medium text-success-foreground">
                    Active
                  </span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
