import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: "loop",
  description: t("loop.description"),
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;

    const { member, options, guild } = interaction;
    const option = options.getString("options");
    const voiceChannel = member.voice.channel;

    const embed = new EmbedBuilder();

    if (!voiceChannel) {
      embed.setColor("Red").setDescription(
        t("voiceChannel", {
          ns: "common",
          lng: interaction.locale,
        })
      );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed
        .setColor("Red")
        .setDescription(
          `You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`
        );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

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

      let mode = null;

      switch (option) {
        case "off":
          mode = 0;
          break;
        case "song":
          mode = 1;
          break;
        case "queue":
          mode = 2;
          break;
      }

      mode = await queue.setRepeatMode(mode);

      mode = mode
        ? mode === 2
          ? t("loop.Repeat queue", { lng: interaction.locale })
          : t("loop.Repeat song", { lng: interaction.locale })
        : t("loop.Off", { lng: interaction.locale });

      embed.setColor("Orange").setDescription(
        t("loop.message", {
          ns: "commands",
          lng: interaction.locale,
          mode,
        })
      );
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.log(err);

      embed
        .setColor("Red")
        .setDescription(
          t("catch_err", { ns: "common", lng: interaction.locale })
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  description_localizations: {
    tr: t("loop.description", { lng: "tr" }),
  },
  options: [
    {
      type: 3,
      name: "options",
      description: t("loop.loop_option.description"),
      description_localizations: {
        tr: t("loop.loop_option.description", { lng: "tr" }),
      },
      choices: [
        { name: "off", value: "off" },
        { name: "song", value: "song" },
        { name: "queue", value: "queue" },
      ],
    },
  ],
};
