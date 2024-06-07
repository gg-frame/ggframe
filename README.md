# GG Frame

## What is GG frame?
GG frame is a Farcaster Frame built to make it easier for users to donate to the Gitcoin Grant.

## Resources
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

`https://gg-frame-three.vercel.app/donate/25/156`

then, frame will be automatically created, and just cast it!

That's all!

## for builders

```
pnpm install && pnpm dev
```

Head to http://localhost:3000/api
