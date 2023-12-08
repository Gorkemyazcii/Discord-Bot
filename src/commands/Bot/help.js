import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
export const data = {
  name: "help",
  description: "Komutları gösterir",
  execute(interaction) {
    interaction.reply(" `!delete` `!ban` `!ping` ```Şimdilik olanlar```");
  },
};

export const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description);
