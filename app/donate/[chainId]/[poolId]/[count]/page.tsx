import React from "react";
import { getFrameMetadata } from "@airstack/frog/next";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { poolId: string; chainId: string; count: string };
}): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `http://localhost:3000/api/donate/${params.chainId}/${params.poolId}/${params.count}`
  );

  return {
    other: frameTags,
  };
}
export default function Donate() {
  return <div />;
}
