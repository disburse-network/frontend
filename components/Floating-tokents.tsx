"use client"

export function FloatingTokens() {
  const tokens = [
    {
      id: 1,
      color: "from-blue-400 to-blue-600",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      position: "top-20 left-4 sm:left-10",
      symbol: "ETH",
    },
    {
      id: 2,
      color: "from-green-400 to-green-600",
      size: "w-8 h-8 sm:w-12 sm:h-12",
      position: "top-32 right-4 sm:right-20",
      symbol: "USDC",
    },
    {
      id: 3,
      color: "from-yellow-400 to-yellow-600",
      size: "w-14 h-14 sm:w-20 sm:h-20",
      position: "top-40 left-16 sm:left-32",
      symbol: "BTC",
    },
    {
      id: 4,
      color: "from-purple-400 to-purple-600",
      size: "w-10 h-10 sm:w-14 sm:h-14",
      position: "top-60 right-8 sm:right-40",
      symbol: "UNI",
    },
    {
      id: 5,
      color: "from-blue-300 to-blue-500",
      size: "w-12 h-12 sm:w-18 sm:h-18",
      position: "bottom-40 left-6 sm:left-20",
      symbol: "LINK",
    },
    {
      id: 6,
      color: "from-teal-400 to-teal-600",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      position: "bottom-60 right-4 sm:right-16",
      symbol: "AAVE",
    },
    {
      id: 7,
      color: "from-orange-400 to-orange-600",
      size: "w-8 h-8 sm:w-12 sm:h-12",
      position: "top-80 right-12 sm:right-60",
      symbol: "COMP",
    },
    {
      id: 8,
      color: "from-pink-300 to-pink-500",
      size: "w-10 h-10 sm:w-14 sm:h-14",
      position: "bottom-32 left-12 sm:left-60",
      symbol: "SUSHI",
    },
    {
      id: 9,
      color: "from-indigo-400 to-indigo-600",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      position: "top-96 left-20 sm:left-80 hidden sm:block",
      symbol: "MKR",
    },
    {
      id: 10,
      color: "from-cyan-400 to-cyan-600",
      size: "w-8 h-8 sm:w-12 sm:h-12",
      position: "bottom-80 right-8 sm:right-32",
      symbol: "SNX",
    },
    {
      id: 11,
      color: "from-emerald-400 to-emerald-600",
      size: "w-12 h-12 sm:w-18 sm:h-18",
      position: "top-72 right-20 sm:right-80 hidden md:block",
      symbol: "CRV",
    },
    {
      id: 12,
      color: "from-amber-400 to-amber-600",
      size: "w-14 h-14 sm:w-20 sm:h-20",
      position: "bottom-20 right-24 sm:right-96 hidden lg:block",
      symbol: "YFI",
    },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {tokens.map((token) => (
        <div
          key={token.id}
          className={`absolute ${token.position} ${token.size} bg-gradient-to-br ${token.color} rounded-full opacity-60 blur-sm animate-pulse`}
          style={{
            animationDelay: `${token.id * 0.5}s`,
            animationDuration: `${3 + token.id * 0.2}s`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
            {token.symbol.slice(0, 2)}
          </div>
        </div>
      ))}
    </div>
  )
}
