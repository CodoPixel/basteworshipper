# Baste Worshipper

This Discord Bot is meant to be a **joke**.

## How does it work?

Basically, the bot analyses the new messages to detect whether it repects our beloved teacher "Mr. Baste" or not. If the API detects a falicious message, the bot will warn the author with an objection.

## My Natural Language API (French only)

Source code in `/api/TextAnalyzer.js`.

When a message is sent, the clean content is examined in a particular order:

- First, we need to know if the message is a negation or not. I'm using a regular expression:

```javascript
function isNegative(input) {
  return /.+(?:n'|ne){1}.+(?:pas|guère|plus|jamais|ni|point){1}.*/mi.test(input);
}
```

- Then, we must know if the sentence is using falicious words like "ugly". In order for our program to know what words are bad, we must list all the bad words in French language. The dictionnary used in this project is `/bad-words-fr.txt`. A score is incremented every time the program detects a bad word.

- The program then returns a result as an object.

Now the algorithm:

- If the sentence is a negation **and** does not use bad words, it means the sentence is bad. For example: "Baste is not the best".

```javascript
{
  isNegative: true,
  score: 0,
}
```

- If the sentence is not a negation but uses bad words, it means the sentence is bad. For example: "Baste is ugly".

```javascript
{
  isNegative: false,
  score: 1, // or more than 1
}
```