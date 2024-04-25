import { ponder } from "@/generated";

ponder.on("AlloStrategy:Registered", async ({ event, context }) => {
  const { RegisteredEvent } = context.db;

  await RegisteredEvent.create({
    id: event.log.id,
    data: {
      recipientId: event.args.recipientId,
      data: event.args.data,
      sender: event.args.sender,
    },
  });
});
