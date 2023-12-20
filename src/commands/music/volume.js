import { ChannelType } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import client from "../../app.js";
export const data = {
  name: "volume",
  description: "sesi belirler",
  async execute(interaction) {
    if (interaction.channel?.type == ChannelType.DM) return;
    const guild = client.guilds.cache.get(interaction.guildId);
    if (!guild) return;
    const member = guild.members.cache.get(interaction.member.user.id);

    if (!member) return;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel)
      return interaction.followUp({
        content: "You must be in a voice channel to execute music commands.",
      });
    const volume = interaction.options.getInteger("volume");

    try {
      client.distube.setVolume(voiceChannel, volume);
      return interaction.reply({
        content: `🔉 Volume has been set to ${volume}%.`,
      });
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
      name: "volume",
      description: "volume",
      type: 4,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
};
