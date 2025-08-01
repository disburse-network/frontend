"use client";
import { PrivyConnectButton } from "@/components/PrivyConnectButton";

export function Header() {
  return (
    <header className="bg-cyber-dark border-b-2 border-cyber-orange sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-end">
          <PrivyConnectButton />
        </div>
      </div>
    </header>
  );
}
