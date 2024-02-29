export const data = {
  name: "reminder",
  description: "Girilen mesajı belli bir süre sonra hatırlatır",
  async execute(interaction) {
    const { options, user } = interaction;
    const text = options.getString("text");
    const number = options.getInteger("number");
    const milisaniyeCinsindenSure = number * 60 * 1000;

    const userTag = `<@!${user.id}>`;

    // Yanıtı ertele, ancak hala geçerliyse
    if (!interaction.deferred) {
      await interaction.deferReply({ ephemeral: true });
    }

    setTimeout(async () => {
      await interaction.editReply({
        content: `${userTag} ${text} ${number}`,
        ephemeral: true,
      });
    }, milisaniyeCinsindenSure);
  },
  catch(error) {
    console.error(error);
  },
};

export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      type: 3,
      name: "text",
      description: "text",
    },
    {
      type: 4,
      name: "number",
      description: "number",
    },
  ],
};
