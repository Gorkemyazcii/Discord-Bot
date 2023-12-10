import { EmbedBuilder } from "discord.js";
import { ContextMenuCommandBuilder } from "@discordjs/builders";

export const data = {
  name: "bilgi",
  execute(interaction) {
    const target = interaction.targetMember;
    const response = new EmbedBuilder()
      .setColor("White")
      .addFields(
        { name: `Kullanıcı Adı`, value: `${target.displayName}`, inline: true },
        { name: `ID`, value: `${target.id}`, inline: true },
        { name: `Roller`, value: `${target.roles.cache.size}`, inline: true }
      );
    interaction.reply({ embeds: [response] });
  },
};

export const slash_data = {
  name: data.name,
  type: 2,
};

// export const slash_data = new ContextMenuCommandBuilder()
//   .setName(data.name)
//   .setType(2);
