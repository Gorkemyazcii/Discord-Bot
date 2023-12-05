import { EmbedBuilder } from "discord.js";

export default {
  name: "ping",
  execute(message) {
    const dicord_ping = message.client.ws.ping;
    const bot_ping = Date.now() - message.createdTimestamp;

    const response = new EmbedBuilder()
      .setColor("Random")
      .addFields(
        { name: "Discord ping", value: `${dicord_ping} ms`, inline: true },
        { name: "Bot ping", value: `${bot_ping} ms`, inline: true }
      );
    message.reply({ embeds: [response] });
  },
};
