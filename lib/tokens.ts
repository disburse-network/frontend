export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  chainId: number;
  balance: string;
  price: number;
  priceChange24h: number;
}

export interface Chain {
  id: number;
  name: string;
  symbol: string;
  logoURI: string;
  rpcUrl: string;
  blockExplorer: string;
}

export const chains: Chain[] = [
  {
    id: 10,
    name: "Optimism",
    symbol: "OP",
    logoURI:
      "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
    rpcUrl: "https://mainnet.optimism.io",
    blockExplorer: "https://optimistic.etherscan.io",
  },
  {
    id: 1000,
    name: "Aptos",
    symbol: "APT",
    logoURI:
      "https://assets.coingecko.com/coins/images/26455/small/aptos_round.png",
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
];

export const tokens: Token[] = [
  // Optimism tokens
  {
    symbol: "OP",
    name: "Optimism",
    address: "0x4200000000000000000000000000000000000042",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
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
  {
    symbol: "USDC",
    name: "USD Coin (Optimism)",
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    chainId: 10,
    balance: "567.89",
    price: 1.0,
    priceChange24h: 0.01,
  },
  {
    symbol: "USDT",
    name: "Tether (Optimism)",
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    chainId: 10,
    balance: "123.45",
    price: 1.0,
    priceChange24h: -0.02,
  },
  // Aptos tokens
  {
    symbol: "APT",
    name: "Aptos",
    address: "0x1::aptos_coin::AptosCoin",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/26455/small/aptos-logo.png",
    chainId: 1000,
    balance: "123.45",
    price: 8.76,
    priceChange24h: 2.34,
  },
  {
    symbol: "USDC",
    name: "USD Coin (Aptos)",
    address:
      "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    chainId: 1000,
    balance: "234.56",
    price: 1.0,
    priceChange24h: 0.0,
  },
  {
    symbol: "USDT",
    name: "Tether (Aptos)",
    address:
      "0xacd3c5d8ca63fadc375e3cbc693f6bbb5a8e4e49cc1b2a3c3c9e4e4e4e4e4e4e::coin::T",
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
    logoURI:
      "https://assets.coingecko.com/coins/images/26375/small/sui-logo.png",
    chainId: 1001,
    balance: "567.89",
    price: 1.23,
    priceChange24h: 5.67,
  },
  {
    symbol: "USDC",
    name: "USD Coin (Sui)",
    address:
      "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    chainId: 1001,
    balance: "345.67",
    price: 1.0,
    priceChange24h: 0.0,
  },
  {
    symbol: "USDT",
    name: "Tether (Sui)",
    address:
      "0xc060006111016b8a00ad5b2ea1345ea6b5b1a0017e8dd158c7661f6f73a48bcb::coin::USDT",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    chainId: 1001,
    balance: "123.45",
    price: 1.0,
    priceChange24h: -0.02,
  },
];

export function getTokensByChain(chainId: number): Token[] {
  return tokens.filter((token) => token.chainId === chainId);
}

export function getChainById(chainId: number): Chain | undefined {
  return chains.find((chain) => chain.id === chainId);
}

export function calculateSwapRate(
  fromToken: Token,
  toToken: Token,
  amount: string,
): {
  outputAmount: string;
  priceImpact: number;
  minimumReceived: string;
  networkFee: string;
} {
  const inputAmount = Number.parseFloat(amount) || 0;
  const rate = fromToken.price / toToken.price;
  const outputAmount = inputAmount * rate;

  // Simulate price impact (higher for larger trades)
  const priceImpact = Math.min((inputAmount * fromToken.price) / 100000, 5);

  // Apply slippage and price impact
  const slippage = 0.5; // 0.5% default slippage
  const minimumReceived = outputAmount * (1 - (slippage + priceImpact) / 100);

  // Simulate network fee based on chain
  const networkFees: { [key: number]: string } = {
    10: "$0.25", // Optimism
    1000: "$0.05", // Aptos
    1001: "$0.08", // Sui
  };

  return {
    outputAmount: outputAmount.toFixed(6),
    priceImpact: Number.parseFloat(priceImpact.toFixed(2)),
    minimumReceived: minimumReceived.toFixed(6),
    networkFee: networkFees[fromToken.chainId] || "$0.10",
  };
}
