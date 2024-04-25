const url = process.env.PONDER!;

if (!url) {
  throw new Error("PONDER environment variable is required");
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
  const res = await fetch(`https://ipfs.io/ipfs/${cid}`);
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
