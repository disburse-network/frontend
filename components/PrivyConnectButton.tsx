"use client"

import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function PrivyConnectButton() {
  const { login, logout, authenticated, user, ready } = usePrivy()

  if (!ready) {
    return (
      <Button disabled className="bg-gray-300 text-gray-500 px-6">
        Loading...
      </Button>
    )
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.wallet?.address ? 
              `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` : 
              user.email?.address || "User"
            }
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-3 h-3" />
          <span>Disconnect</span>
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={login} 
      className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6"
    >
      Connect Wallet
    </Button>
  )
} 