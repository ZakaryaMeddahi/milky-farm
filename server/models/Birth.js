const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class Birth extends Model {
  static lastId = 0;
  static modelName = 'births';

  constructor(birthDate, motherCowId, insertedBy) {
    super();
    this.id = ++Birth.lastId;
    this.birthDate = birthDate;
    this.motherCowId = motherCowId;
    this.insertedBy = insertedBy;
  }

  static async create(birth) {
    const { birthDate, motherCowId, insertedBy } = birth;
    const newBirth = await super.create(
      Birth.modelName,
      birthDate,
      motherCowId,
      insertedBy
    );
    return newBirth;
  }

  static async find(options) {
    const births = await super.find(Birth.modelName, options);
    return births;
  }

  static async findById(id) {
    const birth = await super.findById(Birth.modelName, id);
    return birth;
  }

  static async findOne(options) {
    const birth = await super.findOne(Birth.modelName, options);
    return birth;
  }

  static async update(id, birth) {
    const updateBirth = await super.update(Birth.modelName, id, birth);
    return updateBirth;
  }

  static async delete(id) {
    const deletedBirth = await super.delete(Birth.modelName, id);
    return deletedBirth;
  }
}

async function testCreate() {
  console.log('--------create birth--------');
  const birth = {
    birthDate: '21/02/2024',
    motherCowId: 1,
    insertedBy: 1,
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
    insertedBy: 2,
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
