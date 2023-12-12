export const data = {
  name: "sil",
  description: "Girilen sayıda mesajları siler",

  execute(interaction) {
    const { channel, guild } = interaction;
    const { embed } = interaction.client;

    const deleteNumber = interaction.options.getInteger("sayı");
    console.log(deleteNumber);
    channel.bulkDelete(deleteNumber).then((messages) => {
      return interaction
        .reply({
          embeds: [embed(`${messages.size} Adet Mesaj Silindi`)],
        })
        .then((msg) => setTimeout(() => msg.delete(), 5000));
    });
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "sayı",
      description: "Sileceğiniz sayı miktarını giriniz",
      type: 4,
      required: true,
      min_value: 1,
      max_value: 100,
    },
  ],
};
// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description);
