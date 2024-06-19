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

export function truncateText(
  description: string,
  maxLength: number = 100
): string {
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

export function extractRoundInfo(url: string): string {
  if (!url) return "";
  const match = url.match(/round\/(.*)/);
  return match ? match[1] : "";
}
