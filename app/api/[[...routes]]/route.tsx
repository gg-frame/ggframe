/** @jsxImportSource frog/jsx */

import { allo } from "@/abis/Allo";
import {
  fetchIPFSData,
  fetchPonder,
  getPool,
  getStatus,
} from "@/hooks/useRegisteredEvent";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import GithubLogo from "@/public/github-mark/github-mark.png";
import XLogo from "@/public/x-logo/logo-white.png";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// TODO: check if the recipient is approved
// TODO: get poolId, recipientCount from params

const gradients = [
  "linear-gradient(to right, #FF7E5F, #FEB47B)",
  "linear-gradient(to right, #6A82FB, #FC5C7D)",
  "linear-gradient(to right, #36D1DC, #5B86E5)",
];

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
app.frame("/", async (c) => {
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "black",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontFamily: "Inter",
          fontWeight: 500,
          padding: "20px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 100,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          Welcome to gg frame
        </div>
      </div>
    ),
  });
});

// TODO: get param 'donate/:poolId/:count'
// TODO: get pool address, and validate if status is approved
// TODO: return blank page if status is not approved, or round has ended(allocationEndTime from strategy contract)
app.frame("/donate/:poolId/:count", async (c) => {
  const count = c.req.param("count");
  const poolId = c.req.param("poolId");
  const poolAddress = await getPool(poolId!);

  const data = await fetchPonder(poolAddress!, count!);

  const metadataCid = data.metadata;

  const metadata = await fetchIPFSData(metadataCid);

  if (!metadata) {
    console.error("Failed to fetch metadata from IPFS");
  } else {
    console.log("Fetched metadata:", metadata);
  }
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: metadata?.application?.project?.bannerImg
            ? `url(${process.env.IPFS_BASE_URL}/ipfs/${metadata.application.project.bannerImg})`
            : randomGradient,
          backgroundSize: metadata?.application?.project?.bannerImg
            ? "cover"
            : "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontFamily: "Inter",
          fontWeight: 500,
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            padding: "0 120px",
            gap: "20px",
          }}
        >
          <img
            src={`${process.env.IPFS_BASE_URL}/ipfs/${metadata.application.project.logoImg}`}
            alt="Project Logo"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
          <div
            style={{
              color: "white",
              fontSize: 100,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {metadata?.application?.project.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={XLogo.src}
              alt="X Logo"
              style={{ width: 80, height: 80, marginBottom: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
                fontStyle: "normal",
              }}
            >
              {metadata?.application?.project?.projectTwitter}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={GithubLogo.src}
              alt="Github Logo"
              style={{ width: 80, height: 80, marginBottom: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
                fontStyle: "normal",
              }}
            >
              {metadata?.application?.project?.projectGithub}
            </div>
          </div>
        </div>
      </div>
    ),

    intents: [
      <TextInput placeholder="Enter amount (ETH)" />,
      <Button.Transaction target={`/allocate/${data.recipientId}`}>
        Donate
      </Button.Transaction>,
      <Button.Link
        href={`https://explorer.gitcoin.co/#/round/42161/${poolId}/${
          Number(count) - 1
        }`}
      >
        🔍 View Details
      </Button.Link>,
    ],
  });
});

app.transaction("/allocate/:recipientId", async (c) => {
  const { inputText } = c;
  const recipientId = c.req.param("recipientId");

  return c.contract({
    abi: allo.abi,
    chainId: "eip155:42161",
    functionName: "allocate",
    to: allo.address,
    args: [parseEther(inputText!), recipientId as `0x${string}`],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
