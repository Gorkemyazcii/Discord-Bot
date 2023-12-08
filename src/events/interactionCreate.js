import cooldown_control from "../utils/cooldown_control.js";

export default (client) => {
  const { embed } = client;
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Permission Control
    if (
      command.data.permission &&
      !interaction.member.permission.has(command.data.permission)
    )
      return interaction.reply({
        embeds: [
          embed(
            `Bu komutu kullanmak için \`${command.data.permission}\` Yetkisine sahip olman gerekiyor`,
            "Red"
          ),
        ],
      });
    // Cooldown Control
    const cooldown = cooldown_control(command, interaction.member.id);
    if (cooldown)
      return interaction.reply({
        embeds: [
          embed(
            `Bu komutu tekrar kullanmak için \`${cooldown}\` saniye beklemelisiniz`
          ),
        ],
      });

    // Execute command
    try {
      command.data.execute(interaction);
    } catch (e) {
      interaction.reply({
        embeds: [embed("Bu komutu kullanırken bir hata oluştu", "Red")],
      });
      console.log(e);
    }
  });
};
