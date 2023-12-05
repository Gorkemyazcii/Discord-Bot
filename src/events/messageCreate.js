import { EmbedBuilder } from "discord.js";

export default (client) => {
  client.on("messageCreate", (message) => {
    if (message.content == "Bilgi") {
      const response = new EmbedBuilder()
        .setTitle("Görkem Yazıcı")
        .setAuthor({
          name: "Software Developer",
          iconURL:
            "https://yt3.googleusercontent.com/ytc/APkrFKY_6HgdJPs74YbihU4h1nMKlypdpV_ocT8Vq8cFRg=s900-c-k-c0x00ffffff-no-rj",
          url: "https://www.youtube.com/watch?v=A23xx0O1jso",
        })
        .setDescription(
          "Görkem Yazıcı tarafından oluşturulmuş ne olduğu belirsiz bir bot"
        )
        .setColor("Gold")
        .setFooter({ text: "Saat" })
        .setTimestamp();

      message.channel.send({ content: "Test Bot", embeds: [response] });
    }
  });
};
