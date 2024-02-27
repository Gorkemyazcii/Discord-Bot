import client from "../../app.js";

export const data = {
  name: "reminder",
  description: "Girilen mesajı belli bir süre sonra hatırlatır",
  async execute(interaction) {
    const { embed, commands } = interaction.client;
    
};

export const slash_data = {
  name: data.name,
  description: data.description,
  options: [
    {
      name: "sayi",
      description: "kaç dakika sonra hatırlama istersiniz",

      type: 4,
      required: true,
      min_value: 0,
    },
  ],
};
