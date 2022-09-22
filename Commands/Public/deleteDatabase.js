const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Seigneur } = require('../../database/ToggleSeigneur.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deletedatabase")
    .setDescription("Méthode de test qui est censée supprimer le contenu de la base de données.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  async execute(interaction) {
    try {
      await Seigneur.destroy();
      interaction.reply({ content: "deleted", ephemeral: true });
    } catch (e) {
      interaction.reply({ content: "A problem happened during deletion. Aborted.", ephemeral: true });
    }
  },
};