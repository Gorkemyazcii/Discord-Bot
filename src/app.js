import { ActivityType, Client, Collection } from "discord.js";
import { readdirSync } from "fs"; // file system
import "dotenv/config";
const client = new Client({
  intents: ["Guilds"],
  presence: {
    status: "idle",
    // Ne yaptığını gösterir
    activities: [{ name: "Breaking Bad", type: ActivityType.Watching }],
  },
});
// "DIRECT_MESSAGES", , "GUILD_MEMBERS", "GUILD_MESSAGES" , "GuildPresences"

readdirSync("./src/events").forEach((file) => {
  const event = import(`./src/events/${file}`);
  console.log(event);
});

// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
