import React from "react";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

interface Props {
  params: { poolId: string; count: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const count = params.count;
  const poolId = params.poolId;
  const frameTags = await getFrameMetadata(
    `https://gg-frame-three.vercel.app/api/donate/${poolId}/${count}`
    // `http://localhost:3000/api/donate/${count}`
  );

  return {
    other: frameTags,
  };
}
export default function Donate({ params }: Props) {
  return (
    <div>
      donate to poolId: {params.poolId}, recipientCount: {params.count}
    </div>
  );
}
