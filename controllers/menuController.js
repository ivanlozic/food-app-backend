const path = require('path')
const fs = require('fs').promises

const menuFilePath = path.join(__dirname, '../db/menu.json')

async function readJsonFile(filePath) {
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error) {
    throw error
  }
}

const getMenu = async (req, res) => {
  try {
    const menu = await readJsonFile(menuFilePath)
    res.status(200).json(menu)
  } catch (error) {
    console.error('Error fetching menu:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch the menu.'
    })
  }
}

module.exports = {
  getMenu
}
