import { EmbedBuilder } from "discord.js";
import { t } from "i18next";

export const data = {
  name: t("ping.name"),
  description: t("ping.description"),
  execute(interaction) {
    const { emoji, ws } = interaction.client;

    const dicord_ping = ws.ping;
    const bot_ping = Date.now() - interaction.createdTimestamp;

    const response = new EmbedBuilder().setColor("Random").addFields(
      {
        name: `${emoji("discord_ico74")} ${t("ping.discord_latency", {
          lng: interaction.locale,
          ns: "commands",
        })}`,
        value: `${dicord_ping} ms `,
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: `${emoji("BOT")} ${t("ping.bot_latency", {
          lng: interaction.locale,
          ns: "commands",
        })}`,
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
  name_localizations: {
    tr: t("ping.name", { lng: "tr" }),
  },
  description_localizations: {
    tr: t("ping.description", { lng: "tr" }),
  },
};

// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description);
