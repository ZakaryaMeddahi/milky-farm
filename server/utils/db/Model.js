const { v4: uuidv4 } = require('uuid');
const readDB = require('./readDB');
const writeDB = require('./writeDB');
const { ID_TYPE } = require('../../config/constants');

class Model {
  // private field
  static #lastId = 0;
  static #name = '';

  constructor(idType) {
    if (idType === ID_TYPE.INCREMENT) this.id = ++Model.#lastId;
    else if (idType === ID_TYPE.UUID) this.id = uuidv4();
  }

  static initializeModel(modelName) {
    Model.#name = modelName;
  }

  static async create(...args) {
    const newObject = new this(...args);
    const db = await readDB();
    const array = db[Model.#name];
    array.push(newObject);
    await writeDB(db);
    return newObject;
  }

  static async find(options) {
    const db = await readDB();
    const array = db[Model.#name];
    if (!options) {
      return array;
    }
    const objectEntries = Object.entries(options);
    return array.filter((element) => {
      return objectEntries.every(([key, value]) => element[key] === value);
    });
  }

  static async findById(id) {
    const db = await readDB();
    const array = db[Model.#name];
    const index = array.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    return array[index];
  }

  static async findOne(options) {
    const db = await readDB();
    const array = db[Model.#name];
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

  static async update(id, object) {
    const db = await readDB();
    const array = db[Model.#name];
    const index = array.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    array[index] = { ...array[index], ...object };
    await writeDB(db);
    return array[index];
  }

  static async delete(id) {
    const db = await readDB();
    const array = db[Model.#name];
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
