const fs = require('fs').promises;

const readJsonFile = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath);
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error);
    throw error;
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    throw error;
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
