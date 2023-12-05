export default (client) => {
  client.once("ready", () => {
    console.log("Bot hazır");
  });
};
