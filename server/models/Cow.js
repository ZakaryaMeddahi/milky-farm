const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');
const { BREED } = require('../utils/db/constants');

class Cow extends Model {
  static modelName = 'cows';

  constructor(id, entryDate, breed, insertedBy) {
    super();
    this.id = id;
    this.entryDate = entryDate;
    this.breed = breed;
    this.birthsCounter = 0;
    this.insertedBy = insertedBy;
  }

  static async create(cow) {
    const { id, entryDate, breed, insertedBy } = cow;
    const newCow = await super.create(
      Cow.modelName,
      id,
      entryDate,
      breed,
      insertedBy
    );
    return newCow;
  }

  static async find(options) {
    const cows = await super.find(Cow.modelName, options);
    return cows;
  }

  static async findById(id) {
    const cow = await super.findById(Cow.modelName, id);
    return cow;
  }

  static async findOne(options) {
    const cow = await super.findOne(Cow.modelName, options);
    return cow;
  }

  static async update(id, cow) {
    const updateCow = await super.update(Cow.modelName, id, cow);
    return updateCow;
  }

  static async delete(id) {
    const deletedCow = await super.delete(Cow.modelName, id);
    return deletedCow;
  }
}

async function testCreate() {
  console.log('--------create cow--------');
  const cow = {
    id: 1,
    entryDate: '21/02/2024',
    breed: BREED.MONTEBILIARDE,
    insertedBy: 1,
  };

  for (let i = 0; i < 2; i++) {
    const newCow = await Cow.create(cow);
    console.log(newCow);
  }
}

async function testFind() {
  console.log('--------find cows--------');
  const cows = await Cow.find();
  console.log(cows);
}

async function testFindById() {
  console.log('--------find by id cow--------');
  const cow = await Cow.findById(1);
  console.log(cow);
}

async function testFindOne() {
  console.log('--------find one cow--------');
  const cow = await Cow.findOne({ entryDate: '21/02/2024' });
  console.log(cow);
}

async function testUpdate() {
  console.log('--------update cow--------');
  const cow = {
    id: 1,
    entryDate: '21/02/2024',
    breed: BREED.HOLSTEIN,
    insertedBy: 2,
  };

  const updatedCow = await Cow.update(1, cow);
  console.log(updatedCow);
}

async function testDelete() {
  console.log('--------delete cow--------');
  const deletedCow = await Cow.delete(1);
  console.log(deletedCow);
}

const runTest = async () => {
  await testCreate();
  await testFind();
  await testFindById();
  await testFindOne();
  await testUpdate();
  await testDelete();
};

// runTest();

module.exports = Cow;
