export default (client) => {
  client.on("messageCreate", (message) => {
    console.log(message);
  });
};
