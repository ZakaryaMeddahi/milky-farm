const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class Birth extends Model {
  constructor(birthDate, motherCowId) {
    super(ID_TYPE.INCREMENT);
    this.birthDate = birthDate;
    this.motherCowId = motherCowId;
  }

  static initializeModel() {
    super.initializeModel('births');
  }

  static async create(birth) {
    this.initializeModel();
    const { birthDate, motherCowId } = birth;
    const newBirth = await super.create(birthDate, motherCowId);
    return newBirth;
  }

  static async find(options) {
    this.initializeModel();
    const births = await super.find(options);
    return births;
  }

  static async findById(id) {
    this.initializeModel();
    const birth = await super.findById(id);
    return birth;
  }

  static async findOne(options) {
    this.initializeModel();
    const birth = await super.findOne(options);
    return birth;
  }

  static async update(id, birth) {
    this.initializeModel();
    const updateBirth = await super.update(id, birth);
    return updateBirth;
  }

  static async delete(id) {
    this.initializeModel();
    const deletedBirth = await super.delete(id);
    return deletedBirth;
  }
}

async function testCreate() {
  console.log('--------create birth--------');
  const birth = {
    birthDate: '21/02/2024',
    motherCowId: 1,
  };

  for (let i = 0; i < 2; i++) {
    const newBirth = await Birth.create(birth);
    console.log(newBirth);
  }
}

async function testFind() {
  console.log('--------find births--------');
  const births = await Birth.find();
  console.log(births);
}

async function testFindById() {
  console.log('--------find by id birth--------');
  const birth = await Birth.findById(1);
  console.log(birth);
}

async function testFindOne() {
  console.log('--------find one birth--------');
  const birth = await Birth.findOne({ birthDate: '21/02/2024' });
  console.log(birth);
}

async function testUpdate() {
  console.log('--------update birth--------');
  const birth = {
    birthDate: '21/04/2024',
    motherCowId: 2,
  };

  const updatedBirth = await Birth.update(1, birth);
  console.log(updatedBirth);
}

async function testDelete() {
  console.log('--------delete birth--------');
  const deletedBirth = await Birth.delete(1);
  console.log(deletedBirth);
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

module.exports = Birth;
