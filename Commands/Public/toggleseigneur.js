const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Seigneur } = require('../../database/ToggleSeigneur.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toggleseigneur")
    .setDescription("Active/arrête le préfixe obligatoire 'Mon Seigneur' devant 'Baste'.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  async execute(interaction) {
    const guildId = interaction.guildId;
    let isEnabled = false;
    const seigneurToggler = await Seigneur.findAll({
      where: {
        guildId,
      }
    });
    if (seigneurToggler.length > 0) {
      isEnabled = !seigneurToggler[0].value;
      await Seigneur.update({ value: isEnabled }, { where: { guildId } });
    } else {
      await Seigneur.create({
        guildId,
        value: false,
      });
    }
    interaction.reply({ content: isEnabled ? 'Enabled' : 'Disabled', ephemeral: true });
  },
};