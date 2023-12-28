import client from "../../app.js";

export const data = {
  name: "set-avatar",
  description: "Botun resmi değişir",
  async execute(interaction) {
    const image = interaction.options.getAttachment("avatar");
    const avatar = image.attachment;
    if (interaction.user.id !== process.env.USER_ID)
      return await interaction.reply({ content: "Görkem olman lazım" });

    await interaction.deferReply({ content: "Lütfen bekle", ephemeral: true });

    await client.user.setAvatar(avatar);

    await interaction.editReply({ content: "Oldu mu bakalım" });
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "avatar",
      description: "resim yükle",
      type: 11,
      required: true,
    },
  ],
};

// export const slash_data = new SlashCommandBuilder()
//   .setName(data.name)
//   .setDescription(data.description)
//   .addUserOption((option) =>
//     option
//       .setName("kullanıcı")
//       .setDescription("Kullanıcı adı giriniz")
//       .setRequired(true)
//   );
// *****************************************************
//   .addSubcommand((subcommand) =>
//     subcommand.addUserOption((option) =>
//       option.setName("Kullanıcı").setDescription("Lütfen kullanıcıyı giriniz")
//     )
// )
