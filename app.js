const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const menu = JSON.parse(fs.readFileSync(`${__dirname}/data/menu.json`))
const orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`))

const getMenu = (req, res) => {
  res.status(200).json(menu)
}

const createOrder = (req, res) => {
  // Check if orders array is empty
  console.log('Received request to create an order:', req.body);
  const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1
  const newOrder = Object.assign({ id: newId }, req.body)

  orders.push(newOrder)

  fs.writeFile(
    `${__dirname}/data/orders.json`,
    JSON.stringify(orders),
    (err) => {
      if (err) {
        console.error('Error writing to orders.json:', err)
        res.status(500).json({
          status: 'error',
          message: 'Failed to create the order.'
        })
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            order: newOrder
          }
        })
      }
    }
  )
}

app.route('/api/menu').get(getMenu)
app.route('/api/orders').post(createOrder)

const port = 5000
app.listen(port, () => {
  console.log('Server is listening')
})
