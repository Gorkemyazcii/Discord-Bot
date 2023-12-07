import { ChannelType } from "discord.js";
export default {
  name: "delete",
  async execute(message) {
    if (message.channel.type == ChannelType.DM) return;
    const amount = message.content.slice(1).trim().split(/ +/)[1];

    const messages = parseInt(amount);
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
