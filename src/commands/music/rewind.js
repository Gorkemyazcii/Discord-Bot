import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: "rewind",
  description: t("rewind.description"),
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;
    const seconds = interaction.options.getInteger("seconds");
    const embed = new EmbedBuilder();

    const guild = client.guilds.cache.get(interaction.guildId);
    if (!guild) return;
    const member = guild.members.cache.get(interaction.member.user.id);

    if (!member) return;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel)
      return interaction.reply({
        content: t("voiceChannel", {
          ns: "common",
          lng: interaction.locale,
        }),
      });
    try {
      const queue = await client.distube.getQueue(voiceChannel);

      if (!queue) {
        embed.setColor("Red").setDescription(
          t("no_queue", {
            ns: "common",
            lng: interaction.locale,
          })
        );
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      await queue.seek(queue.currentTime - seconds);
      embed
        .setColor("Blue")
        .setDescription(
          t("rewind.message", { lng: interaction.locale, seconds })
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.log(err);

      embed
        .setColor("Red")
        .setDescription(t("catch_err", { ns: "common", lng: location.locale }));

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  description_localizations: {
    tr: t("rewind.description", { lng: "tr" }),
  },
  options: [
    {
      name: "seconds",
      description: "the seconds you want to fast rewind",
      name_localizations: {
        tr: t("rewind.rewind_options.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("rewind.rewind_options.description", { lng: "tr" }),
      },
      type: 4,
      required: true,
      min_value: 0,
    },
  ],
};
