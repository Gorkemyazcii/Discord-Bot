import { EmbedBuilder } from "discord.js";
import { t } from "i18next";
export const data = {
  name: t("info.name"),
  execute(interaction) {
    const target = interaction.targetMember;
    const response = new EmbedBuilder()
      .setColor("White")
      .addFields(
        { name: `Kullanıcı Adı`, value: `${target.displayName}`, inline: true },
        { name: `ID`, value: `${target.id}`, inline: true },
        { name: `Roller`, value: `${target.roles.cache.size}`, inline: true }
      );
    interaction.reply({ embeds: [response] });
  },
};

export const slash_data = {
  name: data.name,
  name_localizations: {
    tr: t("info.name", { lng: "tr" }),
  },
  type: 2,
  dm_permission: false,
};
