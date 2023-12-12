import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const data = {
  name: "ban",
  description: "Adam olmayanları banlar",
  permissions: "BanMembers",
  cooldown: 10,
  execute(interaction) {
    const { embed } = interaction.client;
    interaction.reply({ embeds: [embed("Kullanıcı banlandı!!")] });
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
};
// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description);
