// ENV variables
require('dotenv').config();

let google = module.exports = {}

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
  keyFilename: './secrets/google.json'
});

// // The text to analyze
// const text = 'I love you so much happiness in the world, young love!';

// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };

// // Detects the sentiment of the text
// client
//   .analyzeSentiment({ document: document })
//   .then(results => {
//     const sentiment = results[0].documentSentiment;
//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

google.analyze = (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return new Promise ((resolve, reject) => {
    client
      .analyzeSentiment({ document: document })
      .then(results => {
        console.log('RESULTS:', results);
        resolve(results)
      })
      .catch(err => {
        console.error('ERROR:', err);
        reject(err)
      });
  })
}