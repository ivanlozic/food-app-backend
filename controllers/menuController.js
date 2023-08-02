const { readJsonFile } = require('../utils/fileUtils');

const getMenu = async (req, res) => {
  try {
    const dataPath = `${__dirname}/data`;
    const menuFilePath = `${dataPath}/menu.json`;
    const menu = await readJsonFile(menuFilePath);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch the menu.',
    });
  }
};

module.exports = {
  getMenu,
};
