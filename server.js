const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Get one random quote
app.get('/api/quotes/random', (req, res) => {
  res.send({
    quote: getRandomElement(quotes)
  });
});

//Get all quotes or all quotes by specific author
app.get('/api/quotes', (req, res) => {
  if(req.query.person) {
    const quotesByAuthor = quotes.filter(quote => quote.person === req.query.person)
    res.send({
      quotes: quotesByAuthor
    });
  } else {
    res.send({
      quotes: quotes
    })
  }
})

//Add new quote
app.post('api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote, 
    person: req.query.person
  }
  if(newQuote.person && newQuote.quote) {
    quotes.push(newQuote)
    res.send({
      quote:newQuote
    }) 
    } else {
      res.status(400).send()
    }
})

app.listen(PORT, () => {
  `Server listening on port ${PORT}`
})