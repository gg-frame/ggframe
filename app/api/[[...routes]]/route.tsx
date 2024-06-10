/** @jsxImportSource frog/jsx */

import { allo } from "@/abis/Allo";
import { fetchGrant } from "@/hooks/useRegisteredEvent";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import GithubLogo from "@/public/github-mark/github-mark.png";
import XLogo from "@/public/x-logo/logo-white.png";

if (!process.env.IPFS_BASE_URL) {
  throw new Error("IPFS_BASE_URL is not defined");
}

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  imageOptions: {
    fonts: [
      {
        name: "Open Sans",
        weight: 700,
        source: "google",
      },
      {
        name: "Madimi One",
        source: "google",
      },
    ],
  },
});

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
          background: "linear-gradient(to right, #36D1DC, #5B86E5)",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontFamily: "Open Sans",
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
          Welcome to GG frame!
        </div>
        <div
          style={{
            color: "white",
            fontSize: 40,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          GG frame is a easiest way to donate to Gitcoin Grants.
        </div>
        <div
          style={{
            color: "white",
            fontSize: 50,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            marginTop: 20,
          }}
        >
          👇See more details on Github👇
        </div>
      </div>
    ),
    intents: [
      <Button.Link href="https://github.com/tnkshuuhei/gg-frame">
        Github 🔧
      </Button.Link>,
      <Button.Link href="https://warpcast.com/shutanaka.eth">
        follow me ❤️
      </Button.Link>,
      <Button.Link href="https://explorer.gitcoin.co/">
        Explore GG 🔍
      </Button.Link>,
    ],
  });
});

app.frame("/donate/:chainId/:poolId/:count/", async (c) => {
  const chainId = c.req.param("chainId");
  const count = c.req.param("count");
  const poolId = c.req.param("poolId");

  const data = await fetchGrant(Number(chainId), poolId!, count);
  const roundData = data.data?.rounds[0].applications[0];

  const status = roundData?.status;

  const metadata = roundData?.project.metadata;

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  const start = new Date(data.data.rounds[0].donationsStartTime);
  const end = new Date(data.data.rounds[0].donationsEndTime);
  const now = new Date();

  const isActivePool = now >= start && now <= end;

  if (!isActivePool) {
    return c.res({
      image: (
        <div
          style={{
            alignItems: "center",
            background: "red",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            fontFamily: "Open Sans",
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
            This round is not active
          </div>
        </div>
      ),
    });
  }

  if (status !== "APPROVED") {
    return c.res({
      image: (
        <div
          style={{
            alignItems: "center",
            background: "red",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            fontFamily: "Open Sans",
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
            This project is not approved
          </div>
        </div>
      ),
    });
  }
  // TODO: Display donated amount, donation counts
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: randomGradient,
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          fontFamily: "Open Sans",
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
            src={`${process.env.IPFS_BASE_URL}/ipfs/${metadata?.logoImg}`}
            alt="Project Logo"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
          <div
            style={{
              color: "white",
              fontSize: 70,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {metadata?.title}
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
              {metadata?.projectTwitter}
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
              {metadata?.projectGithub}
            </div>
          </div>
        </div>
      </div>
    ),

    intents: [
      <TextInput placeholder="Enter amount (ETH)" />,
      <Button.Transaction target={`/allocate/${roundData?.anchoreAddress}`}>
        Donate
      </Button.Transaction>,
      <Button.Link
        href={`https://explorer.gitcoin.co/#/round/42161/${poolId}/${count}`}
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
