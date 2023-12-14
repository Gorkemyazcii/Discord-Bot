import { ChannelType } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import client from "../../app.js";

export const data = {
  name: "play",
  description: "Play a song.",
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
    console.log(interaction.options.data[0].value?.toString());
    await distube.play(
      voiceChannel,
      interaction.options.data[0].value?.toString() || " "
    );

    await interaction.followUp("Müzik çalınıyor");
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "play",
      description: "play",
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
