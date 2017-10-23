require('dotenv').config();

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var google = require('./google')

var app = express();

// Set view engine to handlebars
app.engine('hbs', require('express-handlebars')({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Parse form data req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('home');
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

app.post('/googlesentiment', (req, res, next) => {
  let text = req.body.text;
  let getColor = (score) => {
    if (score >= 0.25) {
      return 'green'
    } else if (score >= -0.25 && score < 0.25) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  google.analyze(text)
    .then(results => {
      let score = results[0].documentSentiment.score;
      let magnitude = results[0].documentSentiment.magnitude;
      let color = getColor(score)
      res.render('home', {
        textinput: text,
        textresults: JSON.stringify(results),
        score,
        magnitude,
        color
      });
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})