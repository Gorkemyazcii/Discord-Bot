import cooldown_control from "../utils/cooldown_control.js";
import auto_complete from "../utils/event-utils/auto_complete.js";
import { t } from "i18next";

export default (client) => {
  const { embed } = client;
  client.on("interactionCreate", (interaction) => {
    if (interaction.isAutocomplete()) {
      return auto_complete(interaction);
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    const memberPermissions = interaction.member.permissions.serialize();
    const commandPermission = command.data.permission;
    const hasTruePermission =
      memberPermissions.hasOwnProperty(commandPermission) &&
      memberPermissions[commandPermission] === true;
    if (commandPermission && !hasTruePermission)
      return interaction.reply({
        embeds: [
          embed(
            t("missing_permissions", {
              ns: "common",
              lng: interaction.locale,
              permission: t(commandPermission, {
                ns: "permissions",
                lng: interaction.locale,
              }),
            }),
            "Red"
          ),
        ],
      });
    const cooldown = cooldown_control(command, interaction.member.id);
    if (cooldown)
      return interaction.reply({
        embeds: [
          embed(
            t("cooldown_error", {
              ns: "common",
              lng: interaction.locale,
              cooldown,
            }),
            "Red"
          ),
        ],
      });

    try {
      command.data.execute(interaction);
    } catch (e) {
      interaction.reply({
        embeds: [
          embed(
            t("unexpected_error", { ns: "common", lng: interaction.locale }),
            "Red"
          ),
        ],
      });
      console.log(e);
    }
  });
};
