const express = require('express');
const app = express();
const port = 5000;

const routes = require('./routes/routes');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', routes);

app.listen(port, () => {
  console.log('Server is listening');
});
