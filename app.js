const express = require('express')
const cors = require('cors')
const mongoose = require('./db/db');
const app = express()
const port = 5000

const routes = require('./routes/routes')

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(cors())

app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
