import React from "react";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { poolId: string; chainId: string; count: string };
}): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `https://ggframe.xyz/api/api/donate/${params.chainId}/${params.poolId}/${params.count}`
  );

  return {
    other: frameTags,
  };
}
export default function Donate() {
  return <div />;
}
