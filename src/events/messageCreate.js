import cooldown_control from "../utils/cooldown_control.js";
import { EmbedBuilder } from "discord.js";

const prefix = process.env.prefix;

export default (client) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(prefix) == false) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    // Cooldown Control
    const cooldown = cooldown_control(command, message.member.id);
    if (cooldown)
      return message.reply({
        embeds: [
          client.embed(
            `Bu komutu tekrar kullanmak için \`${cooldown}\` saniye beklemen gerekiyor `
          ),
        ],
      });
    // Permission Control
    if (
      command.permissions &&
      !message.member.permissions.has(command.permissions)
    )
      return message.reply(
        `Bu komutu kullanmak için \`${command.permissions}\` Yetkisi gerekiyor`
      );

    try {
      command.execute(message);
    } catch (e) {
      console.log(e);
      message.reply("Bu komut hatalı");
    }
  });
};
