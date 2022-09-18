const CACHED_WORDS = [];

function analyze(input) {
  const isInputNegative = isNegative(input);
  const words = input.split(" ");
  const badWords = getWords("bad-words-fr.txt");
  let score = 0;
  for (let word of words) {
    if (badWords.includes(word)) {
      score++;
    }
  }
  return {
    isNegative: isInputNegative,
    score,
  }
}

function isNegative(input) {
  return /.+(?:n'|ne){1}.+(?:pas|guère|plus|jamais|ni|point){1}.*/mi.test(input);
}

function getWords(path) {
  if (CACHED_WORDS.length > 0) {
    return CACHED_WORDS;
  }
  const fs = require('fs');
  const file = fs.readFileSync(path, {encoding:'utf-8'});
  const words = [];
  file.split(/\r?\n/).forEach(line => words.push(line));
  return words;
}

module.exports = {
  analyze,
}