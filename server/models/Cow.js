const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');
const { BREED } = require('../utils/db/constants');

class Cow extends Model {
  constructor(id, entryDate, breed) {
    super(ID_TYPE.CUSTOM);
    this.id = id;
    this.entryDate = entryDate;
    this.breed = breed;
  }

  static initializeModel() {
    super.initializeModel('cows');
  }

  static async create(cow) {
    this.initializeModel();
    const { id, entryDate, breed } = cow;
    const newCow = await super.create(id, entryDate, breed);
    return newCow;
  }

  static async find(options) {
    this.initializeModel();
    const cows = await super.find(options);
    return cows;
  }

  static async findById(id) {
    this.initializeModel();
    const cow = await super.findById(id);
    return cow;
  }

  static async findOne(options) {
    this.initializeModel();
    const cow = await super.findOne(options);
    return cow;
  }

  static async update(id, cow) {
    this.initializeModel();
    const updateCow = await super.update(id, cow);
    return updateCow;
  }

  static async delete(id) {
    this.initializeModel();
    const deletedCow = await super.delete(id);
    return deletedCow;
  }
}

async function testCreate() {
  console.log('--------create cow--------');
  const cow = {
    id: 1,
    entryDate: '21/02/2024',
    breed: BREED.MONTEBILIARDE,
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
