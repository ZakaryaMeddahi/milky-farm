const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class MilkProduction extends Model {
  constructor(productionDate, quantity) {
    super(ID_TYPE.INCREMENT);
    this.productionDate = productionDate;
    this.quantity = quantity;
  }

  static initializeModel() {
    super.initializeModel('milkProduction');
  }

  static async create(milkProduction) {
    this.initializeModel();
    const { productionDate, quantity, cowId } = milkProduction;
    const newMilkProduction = await super.create(productionDate, quantity);
    return newMilkProduction;
  }

  static async find(options) {
    this.initializeModel();
    const milkProductions = await super.find(options);
    return milkProductions;
  }

  static async findById(id) {
    this.initializeModel();
    const milkProduction = await super.findById(id);
    return milkProduction;
  }

  static async findOne(options) {
    this.initializeModel();
    const milkProduction = await super.findOne(options);
    return milkProduction;
  }

  static async update(id, user) {
    this.initializeModel();
    const updatedMilkProduction = await super.update(id, user);
    return updatedMilkProduction;
  }

  static async delete(id) {
    this.initializeModel();
    const deletedMilkProduction = await super.delete(id);
    return deletedMilkProduction;
  }
}

async function testCreate() {
  console.log('--------create milk production--------');
  const milkProduction = {
    productionDate: '21/02/2024',
    quantity: 20,
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
