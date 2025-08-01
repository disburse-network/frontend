"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function PrivyConnectButton() {
  const { login, logout, authenticated, user, ready } = usePrivy();

  if (!ready) {
    return (
      <Button
        disabled
        className="bg-cyber-dark-lighter text-muted-foreground px-6 border-2 border-cyber-dark-lighter"
      >
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cyber-orange flex items-center justify-center">
            <User className="w-4 h-4 text-cyber-dark" />
          </div>
          <span className="text-sm font-medium text-foreground">
            {user.wallet?.address
              ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
              : user.email?.address || "User"}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center space-x-1 border-2 border-cyber-orange text-cyber-orange hover:bg-cyber-orange hover:text-cyber-dark"
        >
          <LogOut className="w-3 h-3" />
          <span>Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={login}
      className="bg-cyber-orange hover:bg-cyber-orange-light text-cyber-dark px-6 border-2 border-cyber-orange cyber-glow"
    >
      Connect Wallet
    </Button>
  );
}
