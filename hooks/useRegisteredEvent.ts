import { gql } from "graphql-request";

export async function fetchGrant(chainId: number, roundId: string, id: string) {
  const res = await fetch(
    "https://grants-stack-indexer-v2.gitcoin.co/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryGrant,
        variables: { chainId, roundId, id },
      }),
    }
  );
  const data = await res.json();
  return data;
}

const queryGrant = gql`
  query MyQuery($chainId: Int!, $roundId: String!, $id: String!) {
    round(chainId: $chainId, id: $roundId) {
      id
      chainId
      applications(condition: { id: $id }) {
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
        anchorAddress
      }
      strategyName
      donationsStartTime
      donationsEndTime
    }
  }
`;
