const Model = require('../utils/db/Model');
const { ID_TYPE } = require('../config/constants');

class MedicalCheckup extends Model {
  constructor(checkupDate, illness, cowId) {
    super(ID_TYPE.INCREMENT);
    this.checkupDate = checkupDate;
    this.illness = illness;
    this.cowId = cowId;
  }

  static initializeModel() {
    super.initializeModel('medicalCheckup');
  }

  static async create(medicalCheckup) {
    this.initializeModel();
    const { checkupDate, illness, cowId } = medicalCheckup;
    const newMedicalCheckup = await super.create(checkupDate, illness, cowId);
    return newMedicalCheckup;
  }

  static async find(options) {
    this.initializeModel();
    const medicalCheckups = await super.find(options);
    return medicalCheckups;
  }

  static async findById(id) {
    this.initializeModel();
    const medicalCheckup = await super.findById(id);
    return medicalCheckup;
  }

  static async findOne(options) {
    this.initializeModel();
    const medicalCheckup = await super.findOne(options);
    return medicalCheckup;
  }

  static async update(id, medicalCheckup) {
    this.initializeModel();
    const updateMedicalCheckup = await super.update(id, medicalCheckup);
    return updateMedicalCheckup;
  }

  static async delete(id) {
    this.initializeModel();
    const deletedMedicalCheckup = await super.delete(id);
    return deletedMedicalCheckup;
  }
}

async function testCreate() {
  console.log('--------create medicalCheckup--------');
  const medicalCheckup = {
    checkupDate: '30/04/2024',
    illness: 'cough',
    cowId: 1,
  };

  for (let i = 0; i < 2; i++) {
    const newMedicalCheckup = await MedicalCheckup.create(medicalCheckup);
    console.log(newMedicalCheckup);
  }
}

async function testFind() {
  console.log('--------find medicalCheckups--------');
  const medicalCheckups = await MedicalCheckup.find();
  console.log(medicalCheckups);
}

async function testFindById() {
  console.log('--------find by id medicalCheckup--------');
  const medicalCheckup = await MedicalCheckup.findById(1);
  console.log(medicalCheckup);
}

async function testFindOne() {
  console.log('--------find one medicalCheckup--------');
  const medicalCheckup = await MedicalCheckup.findOne({
    checkupDate: '21/02/2024',
  });
  console.log(medicalCheckup);
}

async function testUpdate() {
  console.log('--------update medicalCheckup--------');
  const medicalCheckup = {
    checkupDate: '21/04/2024',
    illness: 'cough',
    cowId: 2,
  };

  const updatedMedicalCheckup = await MedicalCheckup.update(1, medicalCheckup);
  console.log(updatedMedicalCheckup);
}

async function testDelete() {
  console.log('--------delete medicalCheckup--------');
  const deletedMedicalCheckup = await MedicalCheckup.delete(1);
  console.log(deletedMedicalCheckup);
}

const runTest = async () => {
  await testCreate();
  await testFind();
  await testFindById();
  await testFindOne();
  await testUpdate();
  await testDelete();
};

runTest();

module.exports = MedicalCheckup;
