const { analyze } = require('../../api/TextAnalyzer.js');
const { Seigneur } = require('../../database/ToggleSeigneur.js');

module.exports = {
  name: "messageCreate",
  on: true,
  async execute(interaction) {
    if (interaction.author.bot) {
      return;
    }
    const gif = "https://tenor.com/view/ace-attorney-phoenix-wright-objection-capcom-gif-20965907";
    const content = interaction.cleanContent;
    const guildId = interaction.guildId;
    const seigneurToggler = await Seigneur.findAll({
      where: {
        guildId,
      }
    });
    const isSeigneurEnabled = seigneurToggler.length > 0 ? seigneurToggler[0].value : true;
    const baste = /baste(?:[^\w]|$)/gi.test(content);
    if (baste) {
      const bastebastebaste = /baste baste baste/gi.test(content);
      if (bastebastebaste) {
        await interaction.reply("https://www.youtube.com/watch?v=atuFSv2bLa8");
      } else if (isSeigneurEnabled && content.indexOf('Mon Seigneur Baste') === -1) {
        await interaction.reply("Attention, notre dieu doit être préfixé de 'Mon Seigneur' ! Exemple : 'Mon Seigneur Baste'. Si ce message t'emmerde, utilise '/toggleseigneur' (si t'as les droits).");
      } else {
        const analysis = analyze(content);
        if ((analysis.score > 0 && !analysis.isNegative) || (analysis.isNegative && analysis.score === 0)) {
          interaction.reply("Ce message a été détecté comme négatif à l'encontre du grand Baste. Surveillez votre langage ! " + gif);
        }
      }
    }
  }
}

