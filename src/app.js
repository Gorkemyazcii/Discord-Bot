import { ActivityType, Client, Collection } from "discord.js";
import { readdirSync } from "fs";

import "dotenv/config";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
  presence: {
    status: "idle",

    activities: [{ name: "Breaking Bad", type: ActivityType.Watching }],
  },
});

readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default); // m --> Module
  event(client);
});

// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
