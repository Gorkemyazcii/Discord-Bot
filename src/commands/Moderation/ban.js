export default {
  name: "ban",
  permissions: "BanMembers",
  cooldown: 10,
  execute(message) {
    message.reply("Kullanıcı yasaklandı!!!");
  },
};
