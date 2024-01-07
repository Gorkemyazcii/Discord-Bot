import { EmbedBuilder } from "discord.js";
import { t } from "i18next";
// import client from "../../app.js";

export const data = {
  name: t("avatar.name"),
  description: t("avatar.description"),
  execute(interaction) {
    const target =
      interaction.options._hoistedOptions?.[0]?.member || interaction.member;
    let avatar = target.displayAvatarURL({ dynamic: true, size: 512 });
    // console.log(avatar);
    // console.log(client.user.avatar);
    // client.user.setAvatar = "(../../../7d568313f6ac2fbfb565ff62ed38f38f.webp)";

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
  name_localizations: {
    tr: t("avatar.name", { lng: "tr" }),
  },
  description_localizations: {
    tr: t("avatar.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("avatar.user_option.name"),
      description: t("avatar.user_option.description"),
      name_localizations: {
        tr: t("avatar.user_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("avatar.user_option.description", { lng: "tr" }),
      },
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
