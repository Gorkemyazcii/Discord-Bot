import { Client } from "discord.js";
const client = new Client({
  intents: ["Guilds"],
});
// "DIRECT_MESSAGES", , "GUILD_MEMBERS", "GUILD_MESSAGES"
client.on("ready", () => {
  console.log("Test bot hazır!!!");
});

client.login(
  "MTE4MDgxOTg0NzIxOTc3MzU2MQ.GUW8Ml.FTmgsKzinsr0wgETOEKxnsXpbO5mhXVMlQ88uY"
);
