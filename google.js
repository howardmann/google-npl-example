// ENV variables
require('dotenv').config();

let google = module.exports = {}

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Instantiates a client
const client = new language.LanguageServiceClient({
  credentials: {
    type: "service_account",
    project_id: "npl-demo",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR4qXbfzfqF319\nSV1/aQy2Hn1oaFcAjomLbcz9Xo7edujxzCsckAxqJ6xD4vBFOrfpUU+ZESapls8X\nNqBg+4Yn+EOLjb+u3Dve+Bk+kKJXedmKSEC1972l0QVRU5YhxxSGF4u/ZLObHh/b\nzWaAOdGiBsW4WBOj1E3gUJRwiFbJlaRNnbzbjWz/If82kLjBdlu29c7PPT2gTXK/\nKjAVP067NlOQr9jQK8l5dyEkmOGp2/Cq3HYQwLz+GGR/LgFbOuejjh6+z8VE4tMw\nJmsBpOUgs2uFGKv4txpp8YaQCv+d5BGNH8bOQw+3oSekWeYQXEXk89YW/8bTJGvC\noLGQC/N1AgMBAAECggEABMehGFUW3GVpjbNghjjJudIK8BhENvaICl1XSEPhhA54\nMp2AM9fR+I7rvOYLq7/xFUatReKem0kccT5ku6CuxvU/8IsrXNuWH3dN999KWyyi\nuCP6GUrJjl+qu9Xn+t/yRzV9EMBF2NgASLyuQ2hNrl9yHEchN19r4JplLwTj2RZd\nQi4e7eRGtQ95xbzWuEaU7ooi7gBQL2D9JWLM/FO/6PpVQ3zGKHNE1i+HSmOe2Q2A\nFn7w7SSTmnrt3Pm9LGq+Nt+ce5u/mavZ3iI3CA8J3PP5LFu7OlQiQrqYP9BDHexP\n359wM/lR031bSKJDkxVjCL7MQz5MKE5pCh2N1q+DsQKBgQD2ZztPKNpaKeD6M2sq\nxOObTjokBEpRhN/2/+k4AuDRRU+IrurJ4L2dMeIHBua2F7kuALUI5YHHTd6LPdEq\nZ1k+Snvrf9jchEUtYvF9JzGrTC/yW/jk7tFmjE9U8aFzs8siQwFmOWMmwFeJNSJW\n5ebEeAqcb5Ze9wQr6QQeFuIECQKBgQDaD1BQXYCg4hZAwH2Ny6MYuSqQGN1zJkol\nJhd7b/sjBzoGsF1C3mBQ6GjaUrZU9ti5O0IylDfijb52uyCb6+uAa15LvHsIaZNZ\nedTu1eSH9f0l6hr1xMv1aV1qlKIpV4rGpkJtYAqRb36opEutd076acRCpuMIj3Fo\nJ2HASSmHDQKBgQDps+nV38qR/+yJgmFftFSohd6xMHyIqv19mSXLYTd4ZUPVQQoh\npY5SXPCjd5E1HnUdw7/xCzU3Io00BdKwZEuJwD2elKjMJowySwj+ikEa1m0XctIz\n2Ks1l1jbGT7nrZy6B1F5cm6vX3jnA0VppC5nI+/0hgXaVnFXcG/eVhfSeQKBgA7Q\n/Y8IW2YTFpn9uko5LPLQGhFCb0GUt3MAvJW5jSHbKtkrgJq7i2XT9NPozNTHFQC5\nAw12vrlZEjj1DAksJYtLQFP7EY0Hx2hL++jiha2rTDEYUA6k+YrKRvun78DJXveS\ncm8GGJG7Nqr0xuOZeLdRGnHA7yo0vOrryhuLnRO9AoGABk2b+Sh6hXLVdL849UBD\nfvdiWKGBMwihU7GDVbI7ncxqPf5+YLH22FpkvLcXPr3Vzl43XODccF4WyaNHTLcK\nzaJY6VOFo2uIHwDvPvW0PU+J4BJUvNvSJP6dqQ0uaYAaJO9GF7d/g7qFMbCn76YG\n8rP8PPPu0poj2K1mpDth0Yw=\n-----END PRIVATE KEY-----\n",
    client_email: "cloudnatural2@npl-demo.iam.gserviceaccount.com",
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/cloudnatural2%40npl-demo.iam.gserviceaccount.com"
  }
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