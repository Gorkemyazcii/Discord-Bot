import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const data = {
  name: "avatar",
  description: "Kullanıcının avatarını döndürür",
  execute(interaction) {
    const { embed } = interaction.client;
    const target = interaction.options._hoistedOptions?.[0]?.member;
  },
};

export const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .addUserOption((option) =>
    option.setName("kullanıcı").setDescription("The user").setRequired(true)
  );
//   .addSubcommand((subcommand) =>
//     subcommand.addUserOption((option) =>
//       option.setName("Kullanıcı").setDescription("Lütfen kullanıcıyı giriniz")
//     )
// )
