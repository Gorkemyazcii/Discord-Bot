import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
import { t } from "i18next";
export const data = {
  name: "jump",
  description: "Numarasını girdiğiniz şarkıya gider",
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;
    const number = interaction.options.getInteger("index");
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

      await queue.jump(number - 1);
      embed
        .setColor("Blue")
        .setDescription(t("jump.message", { lng: interaction.locale }));
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  description_localizations: {
    tr: t("jump.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("jump.jump_option.name"),
      description: t("jump.jump_option.description"),
      name_localizations: {
        tr: t("jump.jump_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("jump.jump_option.description", { lng: "tr" }),
      },
      type: 4,
      required: true,
      min_value: 0,
    },
  ],
};
