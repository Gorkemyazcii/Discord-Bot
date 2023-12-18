import { Events } from "discord.js";
import cooldown_control from "../utils/cooldown_control.js";
import auto_complete from "../utils/event-utils/auto_complete.js";
import { t } from "i18next";
import { PermissionsBitField } from "discord.js";

export default (client) => {
  const { embed } = client;
  client.on(Events.InteractionCreate, (interaction) => {
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
    // const hasTruePermission = Object.keys(memberPermissions).some(
    //   (key) => key === command.data.permission
    // );

    // Permission Control
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
    // Cooldown Control
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

    // Execute command
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
