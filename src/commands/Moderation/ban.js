export default {
  name: "ban",
  permissions: "BanMembers",
  cooldown: 10,
  execute(message) {
    const { embed } = message.client;
    message.reply({ embeds: [embed("Kullanıcı banlandı!!")] });
  },
};
