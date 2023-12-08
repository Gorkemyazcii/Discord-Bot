import { ActivityType, Client, Collection } from "discord.js";
import { readdirSync } from "fs";

import "dotenv/config";

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildBans",
    "GuildMembers",
  ],
  presence: {
    status: "idle",

    activities: [{ name: "Breaking Bad", type: ActivityType.Watching }],
  },
});
// Command Loader
client.commands = new Collection();
// Assignments emoji
client.emoji = (emojiName) =>
  client.guilds.cache
    .get(process.env.GUILD_ID)
    .emojis.cache.find((e) => e.name == emojiName) || "❤️";
//  Assignments Embed
client.embed = await import("./utils/bot/embed.js").then((m) => m.default);

// Event Loader
readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default); // m --> Module
  event(client);
});

// Command Loader
readdirSync("./commands").forEach((category) => {
  readdirSync(`./commands/${category}`).forEach(async (file) => {
    const command = await import(`./commands/${category}/${file}`);

    client.commands.set(command.data.name, command);
  });
});

// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
