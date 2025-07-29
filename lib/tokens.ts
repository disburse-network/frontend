export interface Token {
    symbol: string
    name: string
    address: string
    decimals: number
    logoURI: string
    chainId: number
    balance: string
    price: number
    priceChange24h: number
  }
  
  export interface Chain {
    id: number
    name: string
    symbol: string
    logoURI: string
    rpcUrl: string
    blockExplorer: string
  }
  
  export const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    rpcUrl: "https://mainnet.infura.io/v3/",
    blockExplorer: "https://etherscan.io",
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    logoURI: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com",
  },
  {
    id: 42161,
    name: "Arbitrum",
    symbol: "ARB",
    logoURI: "https://assets.coingecko.com/coins/images/16547/small/arbitrum-arb-logo.png",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
  },
  {
    id: 10,
    name: "Optimism",
    symbol: "OP",
    logoURI: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
    rpcUrl: "https://mainnet.optimism.io",
    blockExplorer: "https://optimistic.etherscan.io",
  },
  {
    id: 56,
    name: "BSC",
    symbol: "BNB",
    logoURI: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
  },
  {
    id: 43114,
    name: "Avalanche",
    symbol: "AVAX",
    logoURI: "https://assets.coingecko.com/coins/images/12559/small/avalanche-avax-logo.png",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorer: "https://snowtrace.io",
  },
  {
    id: 1000,
    name: "Aptos",
    symbol: "APT",
    logoURI: "https://assets.coingecko.com/coins/images/26455/small/aptos_round.png",
    rpcUrl: "https://fullnode.mainnet.aptoslabs.com/v1",
    blockExplorer: "https://explorer.aptoslabs.com",
  },
  {
    id: 1001,
    name: "Sui",
    symbol: "SUI",
    logoURI: "https://cryptologos.cc/logos/sui-sui-logo.png?v=040",
    rpcUrl: "https://fullnode.mainnet.sui.io:443",
    blockExplorer: "https://suiexplorer.com",
  },
]
  
  export const tokens: Token[] = [
    // Ethereum tokens
    {
      symbol: "ETH",
      name: "Ethereum",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      chainId: 1,
      balance: "2.5431",
      price: 2345.67,
      priceChange24h: 2.34,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      address: "0xA0b86a33E6441b8435b662303c0f098C8c8c8c8c",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 1,
      balance: "1234.56",
      price: 1.0,
      priceChange24h: 0.01,
    },
    {
      symbol: "USDT",
      name: "Tether",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      chainId: 1,
      balance: "0.00",
      price: 1.0,
      priceChange24h: -0.02,
    },
    {
      symbol: "WBTC",
      name: "Wrapped Bitcoin",
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      decimals: 8,
      logoURI: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
      chainId: 1,
      balance: "0.00",
      price: 43210.12,
      priceChange24h: 1.23,
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
      chainId: 1,
      balance: "45.23",
      price: 6.78,
      priceChange24h: -0.45,
    },
    {
      symbol: "LINK",
      name: "Chainlink",
      address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
      chainId: 1,
      balance: "12.34",
      price: 14.56,
      priceChange24h: 1.87,
    },
    // Polygon tokens
    {
      symbol: "MATIC",
      name: "Polygon",
      address: "0x0000000000000000000000000000000000001010",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
      chainId: 137,
      balance: "156.78",
      price: 0.87,
      priceChange24h: 3.21,
    },
    {
      symbol: "USDC",
      name: "USD Coin (Polygon)",
      address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 137,
      balance: "892.34",
      price: 1.0,
      priceChange24h: 0.0,
    },
    {
      symbol: "WETH",
      name: "Wrapped Ethereum",
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      chainId: 137,
      balance: "0.5432",
      price: 2345.67,
      priceChange24h: 2.34,
    },
    // Arbitrum tokens
    {
      symbol: "ARB",
      name: "Arbitrum",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21-47-00.jpg",
      chainId: 42161,
      balance: "234.56",
      price: 1.23,
      priceChange24h: 5.67,
    },
    {
      symbol: "ETH",
      name: "Ethereum (Arbitrum)",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      chainId: 42161,
      balance: "1.2345",
      price: 2345.67,
      priceChange24h: 2.34,
    },
    {
      symbol: "USDC",
      name: "USD Coin (Arbitrum)",
      address: "0xA0b86a33E6441b8435b662303c0f098C8c8c8c8c",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 42161,
      balance: "567.89",
      price: 1.0,
      priceChange24h: 0.01,
    },
    // Optimism tokens
    {
      symbol: "OP",
      name: "Optimism",
      address: "0x4200000000000000000000000000000000000042",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
      chainId: 10,
      balance: "89.12",
      price: 2.45,
      priceChange24h: 4.32,
    },
    {
      symbol: "ETH",
      name: "Ethereum (Optimism)",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      chainId: 10,
      balance: "0.8765",
      price: 2345.67,
      priceChange24h: 2.34,
    },
    // BSC tokens
    {
      symbol: "BNB",
      name: "BNB",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
      chainId: 56,
      balance: "3.4567",
      price: 312.45,
      priceChange24h: 1.87,
    },
    {
      symbol: "CAKE",
      name: "PancakeSwap",
      address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo.png",
      chainId: 56,
      balance: "67.89",
      price: 2.34,
      priceChange24h: -1.23,
    },
    {
      symbol: "USDT",
      name: "Tether (BSC)",
      address: "0x55d398326f99059fF775485246999027B3197955",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      chainId: 56,
      balance: "123.45",
      price: 1.0,
      priceChange24h: -0.02,
    },
    // Avalanche tokens
    {
      symbol: "AVAX",
      name: "Avalanche",
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      logoURI: "https://assets.coingecko.com/coins/images/12559/small/avalanche-avax-red-white.png",
      chainId: 43114,
      balance: "12.3456",
      price: 34.56,
      priceChange24h: 2.87,
    },
        {
      symbol: "USDC",
      name: "USD Coin (Avalanche)",
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 43114,
      balance: "456.78",
      price: 1.0,
      priceChange24h: 0.0,
    },
    // Aptos tokens
    {
      symbol: "APT",
      name: "Aptos",
      address: "0x1::aptos_coin::AptosCoin",
      decimals: 8,
      logoURI: "https://assets.coingecko.com/coins/images/26455/small/aptos-logo.png",
      chainId: 1000,
      balance: "123.45",
      price: 8.76,
      priceChange24h: 2.34,
    },
    {
      symbol: "USDC",
      name: "USD Coin (Aptos)",
      address: "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 1000,
      balance: "234.56",
      price: 1.0,
      priceChange24h: 0.0,
    },
    {
      symbol: "USDT",
      name: "Tether (Aptos)",
      address: "0xacd3c5d8ca63fadc375e3cbc693f6bbb5a8e4e49cc1b2a3c3c9e4e4e4e4e4e4e::coin::T",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      chainId: 1000,
      balance: "89.12",
      price: 1.0,
      priceChange24h: -0.02,
    },
    // Sui tokens
    {
      symbol: "SUI",
      name: "Sui",
      address: "0x2::sui::SUI",
      decimals: 9,
      logoURI: "https://assets.coingecko.com/coins/images/26375/small/sui-logo.png",
      chainId: 1001,
      balance: "567.89",
      price: 1.23,
      priceChange24h: 5.67,
    },
    {
      symbol: "USDC",
      name: "USD Coin (Sui)",
      address: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::USDC",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      chainId: 1001,
      balance: "345.67",
      price: 1.0,
      priceChange24h: 0.0,
    },
    {
      symbol: "USDT",
      name: "Tether (Sui)",
      address: "0xc060006111016b8a00ad5b2ea1345ea6b5b1a0017e8dd158c7661f6f73a48bcb::coin::USDT",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      chainId: 1001,
      balance: "123.45",
      price: 1.0,
      priceChange24h: -0.02,
    },
]
  
  export function getTokensByChain(chainId: number): Token[] {
    return tokens.filter((token) => token.chainId === chainId)
  }
  
  export function getChainById(chainId: number): Chain | undefined {
    return chains.find((chain) => chain.id === chainId)
  }
  
  export function calculateSwapRate(
    fromToken: Token,
    toToken: Token,
    amount: string,
  ): {
    outputAmount: string
    priceImpact: number
    minimumReceived: string
    networkFee: string
  } {
    const inputAmount = Number.parseFloat(amount) || 0
    const rate = fromToken.price / toToken.price
    const outputAmount = inputAmount * rate
  
    // Simulate price impact (higher for larger trades)
    const priceImpact = Math.min((inputAmount * fromToken.price) / 100000, 5)
  
    // Apply slippage and price impact
    const slippage = 0.5 // 0.5% default slippage
    const minimumReceived = outputAmount * (1 - (slippage + priceImpact) / 100)
  
    // Simulate network fee based on chain
    const networkFees: { [key: number]: string } = {
      1: "$12.34", // Ethereum
      137: "$0.02", // Polygon
      42161: "$0.15", // Arbitrum
      10: "$0.25", // Optimism
      56: "$0.08", // BSC
      43114: "$0.12", // Avalanche
    }
  
    return {
      outputAmount: outputAmount.toFixed(6),
      priceImpact: Number.parseFloat(priceImpact.toFixed(2)),
      minimumReceived: minimumReceived.toFixed(6),
      networkFee: networkFees[fromToken.chainId] || "$0.10",
    }
  }
  