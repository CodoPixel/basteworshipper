const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Seigneur } = require('../../database/ToggleSeigneur.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getdatabase")
    .setDescription("Is database working?")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  async execute(interaction) {
    const guildId = interaction.guildId;
    const seigneurToggler = await Seigneur.findAll({
      where: {
        guildId,
      }
    });
    // ephemeral set to true means that the user that typed the command is the only one able to see the result
    interaction.reply({ content: "```json\n" + JSON.stringify(seigneurToggler) + "```", ephemeral: true })
  },
};