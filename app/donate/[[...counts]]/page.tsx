import React from "react";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

interface Props {
  params: { counts: string[] };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [poolId, count] = params.counts;
  const baseUrl =
    process.env.MODE === "dev"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL!;

  const frameTags = await getFrameMetadata(
    `${baseUrl}/api/donate/${poolId}/${count}`
    // `http://localhost:3000/api/donate/${count}`
  );

  return {
    other: frameTags,
  };
}
export default function Donate({ params }: Props) {
  const [poolId, count] = params.counts;

  return (
    <div>
      donate to poolId: {poolId}, recipientCount: {count}
    </div>
  );
}
