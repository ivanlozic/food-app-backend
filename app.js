const fs = require('fs').promises // Use fs.promises for async file operations
const express = require('express')
const app = express()
const port = 5000

const dataPath = `${__dirname}/data`
const menuFilePath = `${dataPath}/menu.json`
const ordersFilePath = `${dataPath}/orders.json`

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const readJsonFile = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath)
    return JSON.parse(fileData)
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error)
    throw error
  }
}

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error)
    throw error
  }
}

const getMenu = async (req, res) => {
  try {
    const menu = await readJsonFile(menuFilePath)
    res.status(200).json(menu)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch the menu.'
    })
  }
}

const createOrder = async (req, res) => {
  try {
    const orders = await readJsonFile(ordersFilePath)
    const newId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1
    const newOrder = { id: newId, ...req.body }

    orders.push(newOrder)
    await writeJsonFile(ordersFilePath, orders)

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create the order.'
    })
  }
}

app.route('/api/menu').get(getMenu)
app.route('/api/orders').post(createOrder)

app.listen(port, () => {
  console.log('Server is listening')
})
