import { ChannelType } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
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

    if (!voiceChannel) return;

    const distube = new DisTube(interaction.client, {
      plugins: [new SpotifyPlugin()],
    });
    await distube.play(
      voiceChannel,
      interaction.options.data[0].value?.toString() || " "
    );

    await interaction.followUp(
      t("play.message", { lng: interaction.locale, ns: "commands" })
    );
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  name_localizations: {
    tr: t("play.name", { lng: "tr" }),
  },
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

// export default new SlashCommandBuilder()
//     .setName("play")
//     .setDescription("Play a song.")
//     .addStringOption((option) =>
//       option
//         .setName("query")
//         .setDescription("Provide the name or url for the song.")
//         .setRequired(true)
//     ),
