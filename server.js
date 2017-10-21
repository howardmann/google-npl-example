require('dotenv').config();

var express = require('express');
var app = express();
var google = require('./google')

app.get('/', (req, res, next) => {
  res.send('harooo');
})

app.get('/analyze/:text', (req, res, next) => {
  google.analyze(req.params.text)
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.send(err)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})