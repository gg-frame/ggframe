/** @jsxImportSource frog/jsx */

import { allo } from "@/abis/Allo";
import { fetchIPFSData, fetchPonder } from "@/hooks/useRegisteredEvent";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame("/:chainId/:count", async (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  const chainId = c.req.param("chainId");
  const count = c.req.param("count");
  const recipientCount = Number(count);

  const data = await fetchPonder(count);

  const metadata = await fetchIPFSData(data.metadata);
  console.log("metadata", metadata.application.project.logoImg);
  console.log("metadata", metadata.application.project);

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ""}`
            : "Welcome!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter amount(ETH)" />,
      <Button.Transaction target={`/donate/${data.recipientId}`}>
        Donate
      </Button.Transaction>,
      <Button value="apples">Details</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.transaction("/donate/:recipientId", async (c) => {
  const { inputText } = c;
  const recipientId = c.req.param("recipientId");

  return c.contract({
    abi: allo.abi,
    chainId: "eip155:1",
    functionName: "allocate",
    to: allo.address,
    args: [parseEther(inputText!), recipientId as `0x${string}`],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
