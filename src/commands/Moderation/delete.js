import { t } from "i18next";
export const data = {
  name: t("delete.name"),
  description: t("delete.description"),
  permission: "Administrator",
  execute(interaction) {
    const { channel, guild } = interaction;
    const { embed } = interaction.client;

    const deleteNumber = interaction.options.getInteger("number");
    channel.bulkDelete(deleteNumber).then((messages) => {
      return interaction
        .reply({
          embeds: [
            embed(
              t("delete.messages_deleted", {
                lng: interaction.locale,
                ns: "commands",
                number: messages.size,
              })
            ),
          ],
        })
        .then((msg) => setTimeout(() => msg.delete(), 5000));
    });
  },
};
export const slash_data = {
  name: data.name,
  description: data.description,
  name_localizations: {
    tr: t("delete.name", { lng: "tr" }),
  },
  description_localizations: {
    tr: t("delete.description", { lng: "tr" }),
  },
  options: [
    {
      name: t("delete.number_option.name"),
      description: t("delete.number_option.description"),
      name_localizations: {
        tr: t("delete.number_option.name", { lng: "tr" }),
      },
      description_localizations: {
        tr: t("delete.number_option.description", { lng: "tr" }),
      },
      type: 4,
      required: true,
      min_value: 1,
      max_value: 100,
    },
  ],
};
