import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  RegisteredEvent: p.createTable({
    id: p.string(),
    recipientId: p.hex(),
    data: p.hex(),
    sender: p.hex(),
  }),
}));
