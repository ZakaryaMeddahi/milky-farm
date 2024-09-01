const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class MilkProduction extends Model {
  static lastId = 0;
  static modelName = 'milkProduction';

  constructor(productionDate, quantity, insertedBy) {
    super();
    this.id = ++MilkProduction.lastId;
    this.productionDate = productionDate;
    this.quantity = quantity;
    this.insertedBy = insertedBy;
  }

  static async create(milkProduction) {
    const { productionDate, quantity, insertedBy } = milkProduction;
    const newMilkProduction = await super.create(
      MilkProduction.modelName,
      productionDate,
      quantity,
      insertedBy
    );
    return newMilkProduction;
  }

  static async find(options) {
    const milkProductions = await super.find(MilkProduction.modelName, options);
    return milkProductions;
  }

  static async findById(id) {
    const milkProduction = await super.findById(MilkProduction.modelName, id);
    return milkProduction;
  }

  static async findOne(options) {
    const milkProduction = await super.findOne(MilkProduction.modelName, options);
    return milkProduction;
  }

  static async update(id, user) {
    const updatedMilkProduction = await super.update(MilkProduction.modelName, id, user);
    return updatedMilkProduction;
  }

  static async delete(id) {
    const deletedMilkProduction = await super.delete(MilkProduction.modelName, id);
    return deletedMilkProduction;
  }
}

async function testCreate() {
  console.log('--------create milk production--------');
  const milkProduction = {
    productionDate: '21/02/2024',
    quantity: 20,
    insertedBy: 1,
  };

  for (let i = 0; i < 2; i++) {
    console.log('--------create milk production--------');
    const newMilkProduction = await MilkProduction.create(milkProduction);
    console.log(newMilkProduction);
  }
}

async function testFind() {
  console.log('--------find milk production--------');
  const milkProductions = await MilkProduction.find();
  console.log(milkProductions);
}

async function testFindById() {
  console.log('--------find by id milk production--------');
  const milkProduction = await MilkProduction.findById(1);
  console.log(milkProduction);
}

async function testFindOne() {
  console.log('--------find one milk production--------');
  const milkProduction = await MilkProduction.findOne({ quantity: 20 });
  console.log(milkProduction);
}

async function testUpdate() {
  console.log('--------update milk production--------');
  const milkProduction = {
    productionDate: '21/02/2024',
    quantity: 21,
    insertedBy: 1,
  };

  const updatedMilkProduction = await MilkProduction.update(1, milkProduction);
  console.log(updatedMilkProduction);
}

async function testDelete() {
  console.log('--------delete milk production--------');
  const deletedMilkProduction = await MilkProduction.delete(1);
  console.log(deletedMilkProduction);
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

module.exports = MilkProduction;
