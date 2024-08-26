const fs = require('fs/promises');
const path = require('path');

const readDB = async () => {
  const db = JSON.parse(
    await fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8')
  );

  return db;
};

module.exports = readDB;
