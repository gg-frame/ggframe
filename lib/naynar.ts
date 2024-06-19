import { NeynarAPIClient } from "@neynar/nodejs-sdk";

if (!process.env.NAYNAR_API_KEY) {
  throw new Error("NAYNAR_API_KEY is not defined");
}

const NeynarClient = new NeynarAPIClient(process.env.NAYNAR_API_KEY!);

export const validateAction = async (msg: string) => {
  const validated = await NeynarClient.validateFrameAction(msg);

  return validated;
};
