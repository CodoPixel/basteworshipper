const { analyze } = require('../../api/TextAnalyzer.js');

module.exports = {
  name: "messageCreate",
  on: true,
  execute(message) {
    const config = require('../../config.json');
    const gif = "https://tenor.com/view/ace-attorney-phoenix-wright-objection-capcom-gif-20965907";
    const author = message.author.username;
    const content = message.cleanContent;
    if (author === config.name) {
      return;
    }
    const baste = content.toLowerCase().indexOf('baste') !== -1;
    if (baste) {
      const analysis = analyze(content);
      if ((analysis.score > 0 && !analysis.isNegative) || (analysis.isNegative && analysis.score === 0)) {
        message.reply("Ce message a été détecté comme négatif à l'encontre du grand Baste. Surveillez votre langage ! " + gif);
      }
    }
  }
}

