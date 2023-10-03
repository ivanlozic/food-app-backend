const path = require('path')
const fs = require('fs').promises

const ordersFilePath = path.join(__dirname, '../db/orders.json')

async function readJsonFile(filePath) {
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error) {
    throw error
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log('Data successfully written to file:', filePath)
  } catch (error) {
    throw error
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

const getOrders = async (req, res) => {
  try {
    const orders = await readJsonFile(ordersFilePath)

    res.status(200).json({
      status: 'success',
      data: {
        orders: orders
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve orders.'
    })
  }
}

module.exports = {
  createOrder,
  getOrders
}
