

const express = require('express');
const bodyParser = require('body-parser');

const data = require('./utils/fakeData');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
  });
  

app.get('/lastfive', (req, res, next) =>{
    res.json(data);
})

app.listen(5000);