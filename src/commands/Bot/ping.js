import { EmbedBuilder } from "discord.js";

export const data = {
  name: "ping",
  description: "Botun ve Discord'un gecikmesini Gönderir",

  execute(interaction) {
    const { emoji, ws } = interaction.client;
    console.log(interaction);

    const dicord_ping = ws.ping;
    const bot_ping = Date.now() - interaction.createdTimestamp;

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
    interaction.reply({ embeds: [response], ephemeral: true });
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
};

// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description);
