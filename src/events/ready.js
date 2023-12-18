import register_commands from "../utils/test/register_commands.js";
import { fetch, update } from "../utils/database/mongoose_methods.js";

export default (client) => {
  client.once("ready", async () => {
    console.log("Test Bot hazır");
    // register_commands(client, "global");
    console.log(await fetch("123"));
    await update("123", { $set: { test: "gorkem" } });
    console.log(await fetch("123"));
  });
};
