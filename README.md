# GG Frame

<img width="601" alt="Screenshot 2024-06-07 at 21 34 55" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/1ef11362-daea-4781-90a2-dd54e2315d0d">

## What is GG frame?

GG frame is a Farcaster Frame built to make it easier for users to donate to the Gitcoin Grant.

## Contracts

### Allo V2 Contract Address on Arbitrum

<a target="_blank" rel="noreferrer" href="https://arbiscan.io/address/0x1133eA7Af70876e64665ecD07C0A0476d09465a1">0x1133eA7Af70876e64665ecD07C0A0476d09465a1</a>

### Supported Strategy Contract

<a target="_blank" rel="noreferrer" href="https://arbiscan.io/address/0xE03a19f4921D69cddD37f54dFe814DC66AA92100">0xE03a19f4921D69cddD37f54dFe814DC66AA92100</a>

<a target="_blank" rel="noreferrer" href="https://arbiscan.io/address/0xDA3B55A9bCf58Bb2d9F673836Beab3aE47cA9184">0xDA3B55A9bCf58Bb2d9F673836Beab3aE47cA9184</a>

<a target="_blank" rel="noreferrer" href="https://github.com/tnkshuuhei/gg-frame-ponder/blob/main/ponder.config.ts">View Config on Indexer</a>

## Resources

- <a target="_blank" rel="noreferrer" href="https://gg-frame-three.vercel.app">Deployed Link</a>
- <a target="_blank" rel="noreferrer" href="https://github.com/tnkshuuhei/gg-frame">Frame implementation built with frog</a>
- <a target="_blank" rel="noreferrer" href="https://github.com/tnkshuuhei/gg-frame-ponder">Indexer built with ponder</a>
- **And follow shutanaka.eth** on <span><a target="_blank" rel="noreferrer" href="https://warpcast.com/shutanaka.eth">Warpcast</a></span> and <span><a target="_blank" rel="noreferrer" href="https://x.com/shutanaka_jp">X(Prev Twitter)</a></span>

## How to use GG frame?

### 1. Go to Gitcoin Grant Explore

From <a target="_blank" rel="noreferrer" href="https://explore.gitcoin.co/">Gitcoin Grant Explorer</a>, open the project page you want to encourage users to support.

Copy the two numbers after `https://explorer.gitcoin.co/#/round/42161/`. In this case it is `/25/156`

**Note:** The Gitcoin Grant is currently hosted on Arbitrum mainnet (chainId: 42161) and the GG frame only supports Arbitrum mainnet at this time.

![Screenshot 2024-06-07 at 21 01 44](https://github.com/tnkshuuhei/gg-frame/assets/67859510/572a42b3-17ca-4da8-8c1f-11caad5d45a6)

### 2. Go to Warpcast

Open <a target="_blank" rel="noreferrer" href="https://warpcast.com">warpcast</a>, and then paste the link with the numbers you copied before like below

`https://gg-frame-three.vercel.app/donate/25/156`

then, frame will be automatically created, and just cast it!

<img width="590" alt="Screenshot 2024-06-07 at 21 27 31" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/c7bccf18-136e-423f-b12a-618062e06f85">

<img width="354" alt="Screenshot 2024-06-07 at 21 27 58" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/d6f4c3a1-191d-4ae3-9f06-81a2f837431e">

## for builders

```
pnpm install && pnpm dev
```

Head to http://localhost:3000/api
