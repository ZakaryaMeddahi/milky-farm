const { v4: uuidv4 } = require('uuid');
const readDB = require('./readDB');
const writeDB = require('./writeDB');
const { ID_TYPE } = require('../../config/constants');

class Model {
  constructor() {}

  static async create(modelName, ...args) {
    const newObject = new this(...args);
    const db = await readDB();
    const array = db[modelName];
    array.push(newObject);
    await writeDB(db);
    return newObject;
  }

  static async find(modelName, options) {
    const db = await readDB();
    const array = db[modelName];
    if (!options) {
      return array;
    }
    const objectEntries = Object.entries(options);
    return array.filter((element) => {
      return objectEntries.every(([key, value]) => element[key] === value);
    });
  }

  static async findById(modelName, id) {
    const db = await readDB();
    const array = db[modelName];
    const index = array.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    return array[index];
  }

  static async findOne(modelName, options) {
    const db = await readDB();
    const array = db[modelName];
    const index = array.findIndex((element) => {
      for (const key in options) {
        if (element[key] !== options[key]) {
          return false;
        }
      }
      return true;
    });
    if (index === -1) {
      return null;
    }
    return array[index];
  }

  static async update(modelName, id, object) {
    const db = await readDB();
    const array = db[modelName];
    const index = array.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    array[index] = { ...array[index], ...object };
    await writeDB(db);
    return array[index];
  }

  static async delete(modelName, id) {
    const db = await readDB();
    const array = db[modelName];
    const index = array.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    const deletedObject = array.splice(index, 1);
    await writeDB(db);
    return deletedObject[0];
  }
}

module.exports = Model;
