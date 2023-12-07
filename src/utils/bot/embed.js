import { EmbedBuilder } from "discord.js";

export default (description, color = "#460FF7", title = " ") => {
  const response = new EmbedBuilder()
    .setDescription(description)
    .setColor(color)
    .setTitle(title);

  return response;
};
