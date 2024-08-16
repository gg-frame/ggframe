// /** @jsxImportSource @airstack/frog/jsx */

import { getFrameMetadata } from "@airstack/frog/next";
import type { Metadata } from "next";

import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(`http://localhost:3000/api`);
  return {
    other: frameTags,
  };
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p>
            Get started by exploring&nbsp;
            <code className={styles.code}>Gitcoin Grant</code>
          </p>
          <p>
            Head to{" "}
            <a
              href="/api/dev"
              style={{ display: "inline", fontWeight: "semibold" }}
            >
              <code className={styles.code}>localhost:3000/api</code>
            </a>{" "}
            for your frame endpoint.
          </p>
        </div>
        <div>
          <a
            href="https://warpcast.com/shutanaka.eth"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <div>shutanaka.eth</div>
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.title}>ggframe.xyz</div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://ggframe.notion.site/GG-Frame-Farcaster-Frame-for-Gitcoin-Grant-a6ecd9c9368a447490c4bb18a761cb6e?pvs=4"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Learn how to use GG Frame to promote your project.</p>
        </a>

        <a
          href="https://github.com/tnkshuuhei/gg-frame"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Github <span>-&gt;</span>
          </h2>
          <p>Dig into the source code of GG Frame.</p>
        </a>

        <a
          href="https://warpcast.com/ggframe.eth"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Warpcast <span>-&gt;</span>
          </h2>
          <p>
            Follow the official GG Frame Warpcast account for updates and more.
          </p>
        </a>

        <a
          href="https://x.com/ggframe_xyz"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            X(Twitter) <span>-&gt;</span>
          </h2>
          <p>
            Follow the official GG Frame Twitter account for updates and more.
          </p>
        </a>
      </div>
    </main>
  );
}
