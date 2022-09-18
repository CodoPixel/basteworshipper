const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("isalive")
    .setDescription("Is bot working?")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  execute(interaction) {
    // ephemeral set to true means that the user that typed the command is the only one able to see the result
    interaction.reply({ content: "Yes, the bot is alive.", ephemeral: true })
  },
};