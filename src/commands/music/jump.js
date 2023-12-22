import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import client from "../../app.js";
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
      return interaction.followUp({
        content: "You must be in a voice channel to execute music commands.",
      });
    try {
      const queue = await client.distube.getQueue(voiceChannel);

      if (!queue) {
        embed.setColor("Red").setDescription("There is no active queue.");
        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      await queue.jump(number - 1);
      embed.setColor("Blue").setDescription(`⏩ Forwarded the song for `);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (err) {
      console.log(err);
    }
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "index",
      description: "gitmek istediğiniz müzik numarasını giriniz",
      type: 4,
      required: true,
      min_value: 0,
    },
  ],
};
