const express = require('express')
const mongoose = require('./db/db')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());

const routes = require('./routes/routes')

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
