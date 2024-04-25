import { createConfig, mergeAbis } from "@ponder/core";
import { http } from "viem";
import { AlloABI } from "./abis/Allo";
import { StrategyABI } from "./abis/Strategy";

export default createConfig({
  networks: {
    arbitrum: {
      chainId: 42161,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    Allo: {
      network: "arbitrum",
      filter: {
        event: "PoolCreated",
      },
      abi: AlloABI,
      address: "0x1133eA7Af70876e64665ecD07C0A0476d09465a1",
      startBlock: 159700000,
    },
    AlloStrategy: {
      network: "arbitrum",
      filter: {
        event: "Registered",
      },
      abi: StrategyABI,
      address: "0xE03a19f4921D69cddD37f54dFe814DC66AA92100",
      startBlock: 202718849,
    },
  },
});
