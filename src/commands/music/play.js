import { ChannelType } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";

export const data = {
  name: t("play.name"),
  description: t("play.description"),
  async execute(interaction) {
    await interaction.deferReply();
    if (interaction.channel?.type == ChannelType.DM) return;
    const guild = client.guilds.cache.get(interaction.guildId);

    if (!guild) return;
    const member = guild.members.cache.get(interaction.member.user.id);

    if (!member) return;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel)
      return interaction.followUp({
        content: t("voiceChannel", {
          ns: "common",
          lng: interaction.locale,
        }),
      });
    let musicLink = interaction.options.getString("url");
    const searchString = "/intl-tr";
    if (musicLink.includes(searchString)) {
      musicLink = musicLink.replace(searchString, "");
    }
    await client.distube.play(voiceChannel, musicLink || " ");

    await interaction.followUp(
      t("play.message", { lng: interaction.locale, ns: "commands" })
    );
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  description_localizations: {
    tr: t("play.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("play.url_option.name"),
      description: t("play.url_option.description"),
      name_localizations: {
        tr: t("play.url_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("play.url_option.description", { lng: "tr" }),
      },
      type: 3,
      required: true,
    },
  ],
};
