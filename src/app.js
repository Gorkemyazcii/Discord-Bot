import { ActivityType, Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import i18next from "i18next";
import tranlationBackend from "i18next-fs-backend";
import mongoose, { Mongoose } from "mongoose";
import DisTube from "distube";
import SpotifyPlugin from "@distube/spotify";
import "dotenv/config";

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildBans",
    "GuildMembers",
    "GuildVoiceStates",
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
//  Assignments Embed ?
client.embed = await import("./utils/bot/embed.js").then((m) => m.default);
// Initialize Database ?
await mongoose
  .connect("mongodb://localhost:27017/yazici?retrywrites=true&w=majority")
  .then(() => {
    console.log("Veritabanına başarıyla kaydedildi");
  });

// ▬ guilds (collection)
// → {guild_id: "12345" , moderation_log_channel_id: "456"} (document)

// Initialize multi language system
await i18next.use(tranlationBackend).init({
  ns: readdirSync("./src/locales/en-US").map((a) => a.replace(".json", "")),
  defaultNS: "commands",
  fallbackLng: "en-US",
  preload: readdirSync("./src/locales"),
  backend: { loadPath: "./src/locales/{{lng}}/{{ns}}.json" },
});
// Event Loader
readdirSync("./src/events").forEach(async (file) => {
  const event = await import(`../src/events/${file}`).then((m) => m.default); // m --> Module
  event(client);
});

// Command Loader
readdirSync("./src/commands").forEach((category) => {
  readdirSync(`./src/commands/${category}`).forEach(async (file) => {
    const command = await import(`../src/commands/${category}/${file}`);

    client.commands.set(command.data.name, command);
  });
});
export default client;
// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
