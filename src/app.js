import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { readdirSync } from "fs";
import i18next from "i18next";
import tranlationBackend from "i18next-fs-backend";
import mongoose from "mongoose";
import * as database from "./utils/database/mongoose_methods.js";
import "dotenv/config";
import { SpotifyPlugin } from "@distube/spotify";
import { DisTube } from "distube";

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
  presence: {
    status: "online",

    activities: [{ name: " ", type: ActivityType.Custom }],
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
// Distube
client.distube = new DisTube(client, {
  plugins: [new SpotifyPlugin()],
  emitNewSongOnly: true,
  leaveOnFinish: true,
  emitAddSongWhenCreatingQueue: false,
});
// Assigments Database
client.database = database;
// Initialize Database
await mongoose.connect("mongodb://localhost:27017/yazici").then(() => {
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
