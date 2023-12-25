import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: t("queue.name"),
  description: t("queue.description"),
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;
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
        return interaction.reply({
          content: t("no_queue", {
            ns: "common",
            lng: interaction.locale,
          }),
          ephemeral: true,
        });
      }

      embed
        .setColor("Purple")
        .setDescription(
          `${queue.songs.map(
            (song, id) =>
              `\n**${id + 1}.** ${song.name} -\`${song.formattedDuration}\``
          )}`
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
    tr: t("queue.description", { lng: "tr" }),
  },
};
