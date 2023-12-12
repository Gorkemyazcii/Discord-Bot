export default (client, type = "global") => {
  const commands = client.commands.map((command) => command.slash_data);

  if (type == "global") {
    client.application.commands.set(commands).then(() => {
      console.log("Global komutlar kaydedildi");
    });
  } else if (type == "guild") {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    guild.commands.set(commands).then(() => {
      console.log("Guild komutlar kaydedildi");
    });
  }
};

// *********************************
// import { REST } from "@discordjs/rest";
// import { Routes } from "discord-api-types/v10";
// import { EmbedBuilder } from "discord.js";

// export default async (guild) => {
//   const { client } = guild;

//   const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

//   const body = client.commands.map((command) => command.slash_data);

//   try {
//     await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), {
//       body,
//     });
//   } catch (e) {
//     if (e.code == 50001) {
//       const embed = new EmbedBuilder()
//         .setColor("Red")
//         .setDescription(
//           "Komutlar başarılı bir şekilde kaydedilemedi!!! Lütfen Botu sunucudan atıp [Bu linke](https://discord.com/api/oauth2/authorize?client_id=1180819847219773561&permissions=8&scope=bot+applications.commands) Tıklayarak Tekrar Davet ediniz "
//         );
//       const owner = await interaction.guild.fetchOwner();
//       owner.send({ embeds: [embed] }).catch(() => {});
//     }
//   }
// };
