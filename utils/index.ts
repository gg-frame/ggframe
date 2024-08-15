export type chainConfig = {
  chainId: string;
  name: string;
  eip155: string;
  color?: string;
  icon?: string;
};

export const chainData: { [key: string]: chainConfig } = {
  "1": {
    chainId: "1",
    name: "Ethereum",
    eip155: "eip155:1",
  },
  "42161": {
    chainId: "42161",
    name: "Arbitrum",
    eip155: "eip155:42161",
  },
  "8453": {
    chainId: "8453",
    name: "Base",
    eip155: "eip155:8453",
  },
  "666666666": {
    chainId: "666666666",
    name: "Degen",
    eip155: "eip155:666666666",
  },
  "100": {
    chainId: "100",
    name: "Gnosis",
    eip155: "eip155:100",
  },
  "10": {
    chainId: "10",
    name: "Optimism",
    eip155: "eip155:10",
  },
  "7777777": {
    chainId: "7777777",
    name: "Zora",
    eip155: "eip155:7777777",
  },
  "42170": {
    chainId: "42170",
    name: "Arbitrum Sepolia",
    eip155: "eip155:42170",
  },
  "84532": {
    chainId: "84532",
    name: "Base Sepolia",
    eip155: "eip155:84532",
  },
};

export function getChainConfig(chainId: string): chainConfig | undefined {
  return chainData[chainId];
}

export const gradients = [
  "linear-gradient(to right, #FF7E5F, #FEB47B)",
  "linear-gradient(to right, #6A82FB, #FC5C7D)",
  "linear-gradient(to right, #36D1DC, #5B86E5)",
];

export const availableChainId = [
  "1",
  "42161",
  "8453",
  "666666666",
  "100",
  "10",
  "7777777",
  "42170",
  "84532",
];

export function truncateText(description: string, maxLength: number): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + "...";
}

export function getChainId(chainId: string) {
  switch (chainId) {
    // Mainnet
    case "1":
      return "eip155:1";
    // Arbitrum
    case "42161":
      return "eip155:42161";
    // Base
    case "8453":
      return "eip155:8453";
    // Degen
    case "666666666":
      return "eip155:666666666";
    // Gnosis
    case "100":
      return "eip155:100";
    // Optimism
    case "10":
      return "eip155:10";
    // Zora
    case "7777777":
      return "eip155:7777777";
    default:
      return "eip155:42161";
  }
}

export function extractRoundInfo(url: string): string[] | undefined {
  if (!url) return undefined;
  const match = url.match(/round\/(\d+)\/(\d+)\/(\d+)/);
  return match ? [match[1], match[2], match[3]] : [];
}
