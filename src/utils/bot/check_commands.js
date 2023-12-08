import register_commands from "./register_commands.js";

export default (client) => {
  client.guilds.cache.forEach(async (guild) => {
    const commands =
      (await guild.commands.fetch().catch(() => {})) || client.commands;

    if (commands.size != client.commands.size) register_commands(guild);
  });
};
