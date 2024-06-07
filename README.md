# GG Frame
<img width="601" alt="Screenshot 2024-06-07 at 21 34 55" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/1ef11362-daea-4781-90a2-dd54e2315d0d">

## What is GG frame?
GG frame is a Farcaster Frame built to make it easier for users to donate to the Gitcoin Grant.

## Contracts

### Allo V2 Contract Address on Arbitrum
[0x1133eA7Af70876e64665ecD07C0A0476d09465a1](https://arbiscan.io/address/0x1133eA7Af70876e64665ecD07C0A0476d09465a1)

### Supported Strategy Contract
[poolId 25: 0xE03a19f4921D69cddD37f54dFe814DC66AA92100](https://arbiscan.io/address/0xE03a19f4921D69cddD37f54dFe814DC66AA92100)

[poolId 26: 0xDA3B55A9bCf58Bb2d9F673836Beab3aE47cA9184](https://arbiscan.io/address/0xDA3B55A9bCf58Bb2d9F673836Beab3aE47cA9184)

[View Config on Indexer](https://github.com/tnkshuuhei/gg-frame-ponder/blob/main/ponder.config.ts)

## Resources
- [Deployed Link](https://gg-frame-three.vercel.app)
- [Frame implementation built with frog](https://github.com/tnkshuuhei/gg-frame)
- [Indexer built with ponder](https://github.com/tnkshuuhei/gg-frame-ponder)
- **And follow me** on [Warpcast](https://warpcast.com/shutanaka.eth) and [X(Prev Twitter)](https://x.com/shutanaka_jp)

## How to use GG frame?

### 1. Go to Gitcoin Grant Explore
From the [Gitcoin Grant Explorer](https://explorer.gitcoin.co/), open the project page you want to encourage users to support.

Copy the two numbers after `https://explorer.gitcoin.co/#/round/42161/`. In this case it is `/25/156`

**Note:** The Gitcoin Grant is currently hosted on Arbitrum mainnet (chainId: 42161) and the GG frame only supports Arbitrum mainnet at this time.
   
![Screenshot 2024-06-07 at 21 01 44](https://github.com/tnkshuuhei/gg-frame/assets/67859510/572a42b3-17ca-4da8-8c1f-11caad5d45a6)

### 2. Go to [Warpcast](https://warpcast.com/) 
Open warpcast, and then paste the link with the numbers you copied before like below

`https://gg-frame-three.vercel.app/api/donate/25/156`

then, frame will be automatically created, and just cast it!

<img width="590" alt="Screenshot 2024-06-07 at 21 27 31" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/c7bccf18-136e-423f-b12a-618062e06f85">

<img width="354" alt="Screenshot 2024-06-07 at 21 27 58" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/d6f4c3a1-191d-4ae3-9f06-81a2f837431e">

### Error happens when...

Pool is not active

<img width="610" alt="Screenshot 2024-06-07 at 22 23 55" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/9d240b4c-0ea3-4a7a-84c3-029177c258aa">

Project is not approved

<img width="611" alt="Screenshot 2024-06-07 at 22 23 37" src="https://github.com/tnkshuuhei/gg-frame/assets/67859510/032460eb-580d-480b-b4c6-0efa63403723">

## for builders

```
pnpm install && pnpm dev
```

Head to http://localhost:3000/api
