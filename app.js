const express = require('express')
const mongoose = require('./db/db')
const cors = require('cors')
const app = express()
const port = 'https://fluffy-jay-peplum.cyclic.cloud' || 5000

app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization'
  )
  next()
})

const routes = require('./routes/routes')

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
