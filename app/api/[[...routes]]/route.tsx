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
import { ethers } from "ethers";

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

const availableChainId = [
  "1",
  "42161",
  "8453",
  "666666666",
  "100",
  "10",
  "7777777",
  "42170",
  "84532",
];

function getChainId(chainId: string) {
  switch (chainId) {
    // Mainnet
    case "1":
      return "eip155:1";
    // Arbitrum
    case "42161":
      return "eip155:42161";
    // Base
    case "8453":
      return "eip155:8453";
    // Degen
    case "666666666":
      return "eip155:666666666";
    // Gnosis
    case "100":
      return "eip155:100";
    // Optimism
    case "10":
      return "eip155:10";
    // Zora
    case "7777777":
      return "eip155:7777777";
    default:
      return "eip155:42161";
  }
}

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
      <Button.Link href="https://explorer.gitcoin.co">
        Explore Gitcoin Grant 🔍
      </Button.Link>,
    ],
  });
});

app.frame("/donate/:chainId/:poolId/:count/", async (c) => {
  const { chainId, poolId, count } = c.req.param();

  const data = await fetchGrant(Number(chainId), poolId!, count);

  const applicationData = data.data?.round.applications[0];
  const roundData = data.data?.round;

  const status = applicationData?.status;

  const metadata = applicationData?.project.metadata;

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  const start = new Date(roundData.donationsStartTime);
  const end = new Date(roundData.donationsEndTime);
  const now = new Date();

  const isActivePool = now >= start && now <= end;

  if (!availableChainId.includes(chainId)) {
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
            {metadata?.projectTwitter && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={XLogo.src}
                  alt="X Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectTwitter}
                </div>
              </div>
            )}
            {metadata?.projectGithub && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={GithubLogo.src}
                  alt="Github Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectGithub}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 50,
                }}
              >
                {`$${applicationData?.totalAmountDonatedInUsd} donations from ${applicationData?.uniqueDonorsCount} donors`}
              </div>
            </div>
          </div>
        </div>
      ),
      intents: [
        <Button.Link
          href={`https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${count}`}
        >
          🔍 View Details
        </Button.Link>,
      ],
    });
  }
  if (
    roundData.strategyName !==
    "allov2.DonationVotingMerkleDistributionDirectTransferStrategy"
  ) {
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
            {metadata?.projectTwitter && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={XLogo.src}
                  alt="X Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectTwitter}
                </div>
              </div>
            )}
            {metadata?.projectGithub && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={GithubLogo.src}
                  alt="Github Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectGithub}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 50,
                }}
              >
                {`$${applicationData?.totalAmountDonatedInUsd} donations from ${applicationData?.uniqueDonorsCount} donors`}
              </div>
            </div>
          </div>
        </div>
      ),
      intents: [
        <Button.Link
          href={`https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${count}`}
        >
          🔍 View Details
        </Button.Link>,
      ],
    });
  }
  if (!isActivePool) {
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
            {metadata?.projectTwitter && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={XLogo.src}
                  alt="X Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectTwitter}
                </div>
              </div>
            )}
            {metadata?.projectGithub && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <img
                  src={GithubLogo.src}
                  alt="Github Logo"
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
                <div
                  style={{
                    color: "white",
                    fontSize: 40,
                  }}
                >
                  {metadata?.projectGithub}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 50,
                }}
              >
                {`$${applicationData?.totalAmountDonatedInUsd} donations from ${applicationData?.uniqueDonorsCount} donors`}
              </div>
            </div>
          </div>
        </div>
      ),
      intents: [
        <Button.Link
          href={`https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${count}`}
        >
          🔍 View Details
        </Button.Link>,
      ],
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
          {metadata?.projectTwitter && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <img
                src={XLogo.src}
                alt="X Logo"
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
              <div
                style={{
                  color: "white",
                  fontSize: 40,
                }}
              >
                {metadata?.projectTwitter}
              </div>
            </div>
          )}
          {metadata?.projectGithub && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <img
                src={GithubLogo.src}
                alt="Github Logo"
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
              <div
                style={{
                  color: "white",
                  fontSize: 40,
                }}
              >
                {metadata?.projectGithub}
              </div>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 50,
              }}
            >
              {`$${applicationData?.totalAmountDonatedInUsd} donations from ${applicationData?.uniqueDonorsCount} donors`}
            </div>
          </div>
        </div>
      </div>
    ),

    intents: [
      <TextInput placeholder="Enter amount (ETH)" />,
      <Button.Transaction
        target={`/allocate/${chainId}/${poolId}/${applicationData?.anchorAddress}`}
      >
        Donate
      </Button.Transaction>,
      <Button.Link
        href={`https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${count}`}
      >
        🔍 View Details
      </Button.Link>,
    ],
  });
});

app.transaction("/allocate/:chainId/:poolId/:recipientId", async (c) => {
  const { inputText } = c;
  const chainId = c.req.param("chainId");
  const recipientId = c.req.param("recipientId");
  const poolId = c.req.param("poolId");

  const chain = getChainId(chainId);
  const NATIVE = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();
  const permitType = 0; // None
  const encoder = new ethers.AbiCoder();

  const data = encoder.encode(
    [
      "address",
      "uint8", // PermitType permitType enum
      "tuple(tuple(tuple(address, uint256), uint256, uint256), string)",
    ],
    [
      recipientId, // recipientId as address
      permitType, // PermitType permitType enum
      // Permit2Data memory p2Data below
      [
        [
          [NATIVE, parseEther(inputText!)], // token, amount
          0, // nonce
          Math.floor(new Date().getTime() / 1000) + 1000, // deadline
        ],
        "", // signature, Native doesn't need signature
      ],
    ]
  );
  return c.contract({
    abi: allo.abi,
    chainId: chain,
    functionName: "allocate",
    to: allo.address,
    args: [BigInt(poolId), data as `0x${string}`],
    value: parseEther(inputText!),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
