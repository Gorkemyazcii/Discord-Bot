import { EmbedBuilder } from "discord.js";
import { t } from "i18next";
export const data = {
  name: t("help.name"),
  description: t("help.description"),
  execute(interaction) {
    const { embed, commands } = interaction.client;

    const commandName = interaction?.options?._hoistedOptions[0]?.value;

    if (!commands.has(commandName)) {
      return interaction.reply({
        embeds: [embed(`\`${commandName}\` Adlı komut bulunamadı`, "Red")],
      });
    }

    const command = commands.get(commandName).data;

    const response = new EmbedBuilder().setColor("Navy").addFields(
      { name: "Komut adı", value: `${command.name}`, inline: true },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "Cooldown",
        value: `${command.cooldown || 5} Saniye`,
        inline: true,
      },
      { name: "Açıklama", value: `${command.description}` }
    );
    interaction.reply({ embeds: [response] });
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
  name_localizations: {
    tr: t("help.name", { lng: "tr" }),
  },
  description_localizations: {
    tr: t("help.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("help.help_option.name"),
      description: t("help.help_option.description"),
      name_localizations: {
        tr: t("help.help_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("help.help_option.description", { lng: "tr" }),
      },
      type: 3,
      autocomplete: true,
    },
  ],
};
