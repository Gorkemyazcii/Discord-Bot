import { ChannelType } from "discord.js";
export default {
  name: "delete",
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
    // setTimeout(() => {
    //   msg.delete(del);
    // }, 5000);
  },
};
