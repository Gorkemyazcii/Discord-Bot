import { EmbedBuilder } from "discord.js";

export default {
  name: "ping",
  execute(message) {
    const { emoji, ws } = message.client;

    const dicord_ping = ws.ping;
    const bot_ping = Date.now() - message.createdTimestamp;

    const response = new EmbedBuilder().setColor("Random").addFields(
      {
        name: `${emoji("discord_ico74")} Discord ping `,
        value: `${dicord_ping} ms `,
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: `${emoji("BOT")} Bot ping`,
        value: `${bot_ping} ms`,
        inline: true,
      }
    );
    message.reply({ embeds: [response] });
  },
};
