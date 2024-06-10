import { gql } from "graphql-request";

export async function fetchGrant(
  chainId: number,
  roundId: string,
  projectId: string
) {
  const res = await fetch(
    "https://grants-stack-indexer-v2.gitcoin.co/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryGrant,
        variables: { chainId, roundId, projectId },
      }),
    }
  );
  const data = await res.json();
  return data;
}

const query = gql`
  query registerd($recipientCount: String!, $pool: String!) {
    registeredEvents(
      orderBy: "timestamp"
      orderDirection: "asc"
      where: { recipientCount: $recipientCount, pool: $pool }
    ) {
      items {
        id
        pool
        recipientId
        recipientAddress
        recipientCount
        metadata
        sender
        timestamp
      }
    }
  }
`;

const queryGrant = gql`
  query MyQuery($chainId: Int!, $roundId: String!, $projectId: String!) {
    rounds(condition: { chainId: $chainId, id: $roundId }) {
      id
      chainId
      applications(filter: { id: { equalTo: $projectId } }) {
        project {
          name
          metadata
        }
        id
        status
        projectId
        totalAmountDonatedInUsd
        totalDonationsCount
        uniqueDonorsCount
      }
      strategyName
      donationsStartTime
      donationsEndTime
    }
  }
`;
