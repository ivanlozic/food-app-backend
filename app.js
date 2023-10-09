const express = require('express')
const cors = require('cors')
const mongoose = require('./db/db')
const app = express()
const port = process.env.PORT || 5000;


app.use(cors())

const routes = require('./routes/routes')

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
