import { ChannelType } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: "volume",
  description: t("volume.description"),
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;
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
    const volume = interaction.options.getInteger("volume");

    try {
      client.distube.setVolume(voiceChannel, volume);
      return interaction.reply({
        content: t("volume.message", { lng: interaction.locale, volume }),
      });
    } catch (err) {
      console.log(err);
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  description_localizations: {
    tr: t("volume.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("volume.volume_option.name"),
      description: t("volume.volume_option.description"),
      name_localizations: {
        tr: t("volume.volume_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("volume.volume_option.description", { lng: "tr" }),
      },
      type: 4,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
};
