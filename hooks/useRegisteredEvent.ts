import { gql } from "graphql-request";

export async function fetchGrant(chainId: number, roundId: string, id: string) {
  try {
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await res.text();
      console.error(`Expected JSON, but received ${contentType}`);
      console.error("Error response:", errorText);
      throw new Error(`Expected JSON, but received ${contentType}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchProject(chainId: number, projectId: string) {
  try {
    const res = await fetch(
      "https://grants-stack-indexer-v2.gitcoin.co/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: projectQuery,
          variables: { chainId, id: projectId },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await res.text();
      console.error(`Expected JSON, but received ${contentType}`);
      console.error("Error response:", errorText);
      throw new Error(`Expected JSON, but received ${contentType}`);
    }

    const data = await res.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

const queryGrant = gql`
  query MyQuery($chainId: Int!, $roundId: String!, $id: String!) {
    round(chainId: $chainId, id: $roundId) {
      id
      chainId
      roundMetadata
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
const projectQuery = gql`
  query ProjectQuery($chainId: Int!, $id: String!) {
    project(chainId: $chainId, id: $id) {
      metadata
    }
  }
`;
