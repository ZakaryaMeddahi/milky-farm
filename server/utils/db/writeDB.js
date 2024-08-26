const fs = require('fs/promises');
const path = require('path');

const writeDB = async (data) => {
  await fs.writeFile(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(data, null, 2)
  );
};

module.exports = writeDB;