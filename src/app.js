import { ActivityType, Client, Collection } from "discord.js";
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
client.on("ready", () => {
  console.log("Test bot hazır!!!");
  const collection = new Collection();
  collection.set("a", 1);
  collection.set("b", 2);

  console.log(collection);

  // client.user.setStatus("idle");

  // const arr = [
  //   "Better Call Saul",
  //   "One Piece ",
  //   "Breaking Bad ",
  //   "Hunter X Hunter",
  // ];

  // setInterval(() => {
  //   const random = Math.floor(Math.random() * arr.length);
  //   client.user.setPresence({
  //     activities: [{ name: arr[random], type: ActivityType.Watching }],
  //   });
  // }, 10000);
});
// Env dosyasından Tokeni alıp giriş işlemini yapar
client.login(process.env.TOKEN);
