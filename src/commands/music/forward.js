import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: t("forward.name"),
  description: t("forward.description"),
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
      return interaction.followUp({
        content: t("voiceChannel", {
          ns: "common",
          lng: interaction.locale,
        }),
      });
    try {
      const queue = await client.distube.getQueue(voiceChannel);

      if (!queue) {
        embed.setColor("Red").setDescription("There is no active queue.");
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      await queue.seek(queue.currentTime + seconds);
      embed
        .setColor("Blue")
        .setDescription(`⏩ Forwarded the song for \`${seconds}s\`.`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  name_localizations: {
    tr: t("forward.name", { lng: "tr" }),
  },
  description_localizations: {
    tr: t("forward.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("forward.forward_option.name"),
      description: t("forward.forward_option.description"),
      name_localizations: {
        tr: t("forward.forward_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("forward.forward_option.description", { lng: "tr" }),
      },
      type: 4,
      required: true,
      min_value: 0,
    },
  ],
};
