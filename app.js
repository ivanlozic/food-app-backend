const express = require('express')
const mongoose = require('./db/db')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

const routes = require('./routes/routes')
app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
