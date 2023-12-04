import { ActivityType, Client, Collection } from "discord.js";
import { readdirSync } from "fs";

import "dotenv/config";

const client = new Client({
  intents: ["Guilds"],
  presence: {
    status: "idle",

    activities: [{ name: "Breaking Bad", type: ActivityType.Watching }],
  },
});
client.on("ready", () => {
  console.log("Yaşıyor");
});

readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default);
  console.log(event);
});

// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
