import { allo } from "@/abis/Allo";
import { StrategyABI } from "@/abis/Strategy";
import { ethers } from "ethers";

let url: string;

if (process.env.MODE === "dev") {
  url = "http://localhost:42069/";
} else if (process.env.MODE === "production") {
  url = process.env.PONDER!;
} else {
  throw new Error("api url not found");
}

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL! || "https://arb1.arbitrum.io/rpc"
);

export async function getPool(poolId: any) {
  const alloContract = new ethers.Contract(allo.address!, allo.abi!, provider);
  try {
    const pool = await alloContract.getPool(poolId);
    // struct Pool { bytes32 profileId; IStrategy strategy; address token; Metadata metadata; bytes32 managerRole; bytes32 adminRole; }
    // return strategy address
    return pool[1];
  } catch (error) {
    console.error("Error in getPool:", error);
    return null;
  }
}
export async function getStatus(
  poolId: `0x${string}`,
  recipientId: `0x${string}`
) {
  const strategyContract = new ethers.Contract(poolId, StrategyABI, provider);

  try {
    const status = await strategyContract.getRecipientStatus(recipientId);
    return status;
  } catch (error) {
    console.error("Error in getStatus:", error);
    return null;
  }
}

interface RegisteredEvent {
  recipientId: string;
  recipientAddress: string;
  recipientCount: bigint;
  metadata: string;
  sender: string;
  timeStamp: bigint;
}

export async function fetchIPFSData(cid: string) {
  const res = await fetch(`${process.env.IPFS_BASE_URL!}/ipfs/${cid}`);
  const data = await res.json();
  return data;
}

export async function fetchPonder(
  recipientCount: string
): Promise<RegisteredEvent> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query registerd{
				registeredEvents (orderBy :"timestamp" , orderDirection:"asc", where: {recipientCount: "${recipientCount}"} ){
					items{
						id
						recipientId
						recipientAddress
						recipientCount
						metadata
						sender
						timestamp
					}
				}
			}`,
    }),
  });
  const data = await res.json();

  return data.data.registeredEvents.items[0];
}
