const express = require('express')
const mongoose = require('./db/db')
const cors = require('cors');
const app = express()
const port = 'https://fluffy-jay-peplum.cyclic.cloud' || 5000;

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

const routes = require('./routes/routes')

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log('Server is listening')
})
