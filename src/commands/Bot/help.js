import { EmbedBuilder } from "discord.js";
export const data = {
  name: "help",
  description: "Yardım mesajı gönderir",
  execute(interaction) {
    const { embed, commands } = interaction.client;

    const commandName = interaction?.options?._hoistedOptions[0]?.value;

    if (!commands.has(commandName)) {
      return interaction.reply({
        embeds: [embed(`\`${commandName}\` Adlı komut bulunamadı`, "Red")],
      });
    }

    const command = commands.get(commandName).data;

    const response = new EmbedBuilder().setColor("Navy").addFields(
      { name: "Komut adı", value: `${command.name}`, inline: true },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "Cooldown",
        value: `${command.cooldown || 5} Saniye`,
        inline: true,
      },
      { name: "Açıklama", value: `${command.description}` }
    );
    interaction.reply({ embeds: [response] });
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "komut_adı",
      description: "Lütfen Bilgi almak istediğiniz komutun adını giriniz",
      type: 3,
    },
  ],
};
// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description)
//   .addStringOption((option) =>
//     option
//       .setName("komut_adı")
//       .setDescription("Lütfen Bilgi almak istediğiniz komutun adını giriniz")
//       .setAutocomplete(true)
//   );
