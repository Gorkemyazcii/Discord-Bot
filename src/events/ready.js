import check_commands from "../utils/bot/check_commands.js";

export default (client) => {
  client.once("ready", () => {
    console.log("Test Bot hazır");

    check_commands(client);
  });
};
