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
// Event Loader
readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default); // m --> Module
  event(client);
});

// Command Loader
client.commands = new Collection();

readdirSync("./commands").forEach((category) => {
  readdirSync(`./commands/${category}`).forEach(async (file) => {
    const command = await import(`./commands/${category}/${file}`).then(
      (c) => c.default
    ); // c --> command
    client.commands.set(command.name, command);
  });
});

// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
