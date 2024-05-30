import React from "react";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import styles from "./page.module.css";

interface Props {
  params: { count: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const count = params.count;
  const frameTags = await getFrameMetadata(
    `https://gg-frame-three.vercel.app/api/donate/${count}`
  );

  return {
    other: frameTags,
  };
}
export default function Donate({ params }: Props) {
  return <div>donate: {params.count}</div>;
}
