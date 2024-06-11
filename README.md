# GG Frame

<img width="601" alt="Screenshot 2024-06-07 at 21 34 55" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/1ef11362-daea-4781-90a2-dd54e2315d0d">

## What is GG frame?

GG frame is a Farcaster Frame built to make it easier for users to donate to the Gitcoin Grant.

## Contracts

### Allo V2 Contract Address on Arbitrum

※Contract address is the same across all deployed chain! check [here](https://github.com/allo-protocol/allo-v2/tree/main/contracts)

[0x1133eA7Af70876e64665ecD07C0A0476d09465a1](https://arbiscan.io/address/0x1133eA7Af70876e64665ecD07C0A0476d09465a1)

## Resources

- [Deployed Link](https://ggframe.xyz)
- [Frame implementation built with frog](https://github.com/tnkshuuhei/gg-frame)
- **And follow me** on [Warpcast](https://warpcast.com/shutanaka.eth) and [X(Prev Twitter)](https://x.com/shutanaka_jp)

## How to use GG frame?

### 1. Go to Gitcoin Grant Explore

From the [Gitcoin Grant Explorer](https://explorer.gitcoin.co/), open the project page you want to encourage users to support.

Copy the two numbers after `https://explorer.gitcoin.co/#/round/`. In this case it is `/42161//25/156`

**Note:** The Gitcoin Grant is currently hosted on Arbitrum mainnet (chainId: 42161) and the GG frame only works on chains that farcaster supports.

![Screenshot 2024-06-07 at 21 01 44](https://github.com/tnkshuuhei/gg-frame/assets/67859510/572a42b3-17ca-4da8-8c1f-11caad5d45a6)

### 2. Go to [Warpcast](https://warpcast.com/)

Open warpcast, and then paste the link with the numbers you copied before like below

`https://ggframe.xyz/donate/42161/25/156`

then, frame will be automatically created, and just cast it!

<img width="582" alt="Screenshot 2024-06-10 at 22 17 54" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/e0836b1b-38dd-4b61-925b-ca67eaf7456f">

<img width="354" alt="Screenshot 2024-06-07 at 21 27 58" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/d6f4c3a1-191d-4ae3-9f06-81a2f837431e">

### Error happens when...

Project is not approved

<img width="611" alt="Screenshot 2024-06-07 at 22 23 37" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/032460eb-580d-480b-b4c6-0efa63403723">

## for builders

```
pnpm install && pnpm dev
```

Head to http://localhost:3000/api
