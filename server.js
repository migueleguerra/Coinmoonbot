const express = require('express');
const packageInfo = require('./package.json');

const app = express();

app.get('/', function(req, res) {
  res.json({ version: packageInfo.version });
});

// var PORT;
// if (process.env.NODE_ENV === 'production') PORT = process.env.PORT;

app.listen(process.env.PORT);
