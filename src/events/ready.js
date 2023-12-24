import register_commands from "../utils/test/register_commands.js";

export default (client) => {
  client.once("ready", async () => {
    console.log("Test Bot hazır");
    register_commands(client, "global");
  });
};
