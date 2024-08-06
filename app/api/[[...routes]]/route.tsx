/** @jsxImportSource frog/jsx */

import { allo } from "@/abis/Allo";
import { fetchGrant } from "@/hooks/useRegisteredEvent";
import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import GithubLogo from "@/public/github-mark/github-mark.png";
import XLogo from "@/public/x-logo/logo-white.png";
import { ethers } from "ethers";
import dollor from "@/public/circle-dollar-sign.png";
import human from "@/public/person-standing.png";
import {
  availableChainId,
  extractRoundInfo,
  getChainId,
  truncateText,
} from "@/utils";

if (!process.env.IPFS_BASE_URL) {
  throw new Error("IPFS_BASE_URL is not defined");
}

const app = new Frog({
  title: "GG Frame",
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
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
      <Button.Link href="https://warpcast.com/ggframe">
        follow ggframe ❤️
      </Button.Link>,
      <Button action="/create">Create Frame</Button>,
    ],
  });
});
app.frame("/create", (c) => {
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
            fontSize: 80,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          Create frame for your project!
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
          👇Paste project url below👇
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
          {`e.g. https://explorer.gitcoin.co/#/round/42161/25/156`}
        </div>
      </div>
    ),

    intents: [
      <TextInput placeholder="Paste your Project URL here!" />,
      <Button action="/cast">Next</Button>,
    ],
  });
});

app.frame("/cast", async (c) => {
  const { inputText } = c;

  const pjURL = inputText!;

  const roundInfo = extractRoundInfo(pjURL);

  if (!roundInfo) {
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
            Invalid URL
          </div>
        </div>
      ),
    });
  }

  const chainId = roundInfo[0];
  const poolId = roundInfo[1];
  const count = roundInfo[2];

  const data = await fetchGrant(Number(chainId), poolId!, count);

  const applicationData = data.data?.round.applications[0];

  const status = applicationData?.status;

  const metadata = applicationData?.project.metadata;

  const text = `Donate%20to%20${metadata?.title}%20on%20Gitcoin!`;

  const url = `https://warpcast.com/~/compose?text=${text}&embeds[]=https://ggframe.xyz/api/donate/${chainId}/${poolId}/${count}`;
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
          background: "linear-gradient(to right, #36D1DC, #5B86E5)",
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
            {truncateText(metadata?.title, 20)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
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
          {/* {metadata?.projectGithub && (
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
          )} */}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={dollor.src}
              alt="dollor"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
              }}
            >
              {`${applicationData?.totalAmountDonatedInUsd}`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={human.src}
              alt="human"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
              }}
            >
              {`${applicationData?.uniqueDonorsCount}`}
            </div>
          </div>
        </div>
        <div style={{ color: "white", fontSize: 30 }}>{`${truncateText(
          metadata?.description,
          250
        )}`}</div>
      </div>
    ),
    intents: [
      <Button.Reset>Back</Button.Reset>,
      <Button.Link href={url}>cast with frame</Button.Link>,
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

  const start = new Date(roundData.donationsStartTime);
  const end = new Date(roundData.donationsEndTime);
  const now = new Date();

  const isActivePool = now >= start && now <= end;

  const isSupportedStrategy =
    roundData.strategyName ===
    "allov2.DonationVotingMerkleDistributionDirectTransferStrategy";

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

  const intents =
    isActivePool && availableChainId.includes(chainId) && isSupportedStrategy
      ? [
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
        ]
      : [
          <Button.Link
            href={`https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${count}`}
          >
            🔍 View on Gitcoin Grant
          </Button.Link>,
        ];
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #36D1DC, #5B86E5)",
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
            {truncateText(metadata?.title, 20)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
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
          {/* {metadata?.projectGithub && (
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
          )} */}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={dollor.src}
              alt="dollor"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
              }}
            >
              {`${applicationData?.totalAmountDonatedInUsd}`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={human.src}
              alt="human"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <div
              style={{
                color: "white",
                fontSize: 40,
              }}
            >
              {`${applicationData?.uniqueDonorsCount}`}
            </div>
          </div>
        </div>
        <div style={{ color: "white", fontSize: 30 }}>{`${truncateText(
          metadata?.description,
          250
        )}`}</div>
      </div>
    ),
    intents: intents,
  });
});

app.transaction("/allocate/:chainId/:poolId/:recipientId/", async (c) => {
  const { inputText } = c;
  const { chainId, poolId, recipientId } = c.req.param();

  const chain = getChainId(chainId!);
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
    attribution: true,
    value: parseEther(inputText!),
  });
});

app.frame("/finish", (c) => {
  const { transactionId } = c;
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
          Your donation is complete!
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
          {`Transaction ID: ${transactionId}`}
        </div>
      </div>
    ),
    intents: [<Button.Reset>Back</Button.Reset>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
