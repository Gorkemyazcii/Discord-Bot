import { EmbedBuilder } from "discord.js";

export const data = {
  name: "avatar",
  description: "Kullanıcının avatarını döndürür",
  execute(interaction) {
    const target =
      interaction.options._hoistedOptions?.[0]?.member || interaction.member;
    const avatar = target.displayAvatarURL({ dynamic: true, size: 512 });

    const responseEmbed = new EmbedBuilder()
      .setTitle(`${target.displayName} Adlı Kullanıcının Avatarı`)
      .setColor("DarkNavy")
      .setDescription(
        `[Buraya](${avatar}) Tıklayarak Avatar Bağlantısına ulaşabilirsiniz`
      )
      .setImage(avatar);
    interaction.reply({ embeds: [responseEmbed] });
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "kullanıcı",
      description: "Kullanıcı adını giriniz",
      type: 6,
      required: true,
    },
  ],
};

// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description)
//   .addUserOption((option) =>
//     option
//       .setName("kullanıcı")
//       .setDescription("Kullanıcı adı giriniz")
//       .setRequired(true)
//   );
// *****************************************************
//   .addSubcommand((subcommand) =>
//     subcommand.addUserOption((option) =>
//       option.setName("Kullanıcı").setDescription("Lütfen kullanıcıyı giriniz")
//     )
// )
