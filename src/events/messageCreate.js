import { EmbedBuilder } from "discord.js";

const prefix = process.env.prefix;

export default (client) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix) == false) return;

    const args = message.content.slice(1).trim().split(" ");
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      command.execute(message);
    } catch (e) {
      console.log(e);
      message.reply("Bu komut hatalı");
    }
  });
};
