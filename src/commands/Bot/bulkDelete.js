import { ChannelType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
export const data = {
  name: "delete",
  description: "Toplu silme işlemi yapar",
  async execute(message) {
    if (message.channel.type == ChannelType.DM) return;
    const messages = parseInt(message.content.slice(1).trim().split(/ +/)[1]);

    await message.channel.bulkDelete(messages);
    const { embed } = message.client;
    message.channel
      .send({
        embeds: [embed(`\`${messages}\` tane mesaj silindi`)],
      })
      .then((msg) => setTimeout(() => msg.delete(), 5000));
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
};
// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description);
