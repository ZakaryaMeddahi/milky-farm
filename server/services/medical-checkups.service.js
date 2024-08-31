const Cow = require('../models/Cow');
const MedicalCheckup = require('../models/MedicalCheckup');
const { NotFoundError } = require('../utils/errors');

const createMedicalCheckup = async (cowId, medicalCheckup) => {
  console.log(cowId);
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const newMedicalCheckup = await MedicalCheckup.create({
    ...medicalCheckup,
    cowId,
  });
  return newMedicalCheckup;
};

const findAllMedicalCheckups = async () => {
  const medicalCheckups = await MedicalCheckup.find();
  return medicalCheckups;
};

const findMedicalCheckups = async (cowId, filterOptions) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const medicalCheckups = await MedicalCheckup.find({ cowId });
  return medicalCheckups;
};

const findMedicalCheckup = async (id, cowId) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const medicalCheckup = await MedicalCheckup.findOne({ id, cowId });
  if (!medicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return medicalCheckup;
};

const updateMedicalCheckup = async (id, cowId, medicalCheckup) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const updatedMedicalCheckup = await MedicalCheckup.update(id, medicalCheckup);
  if (!medicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return updatedMedicalCheckup;
};

const deleteMedicalCheckup = async (id, cowId) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const deletedMedicalCheckup = await MedicalCheckup.delete(id);
  if (!deletedMedicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return deletedMedicalCheckup;
};

module.exports = {
  createMedicalCheckup,
  findAllMedicalCheckups,
  findMedicalCheckups,
  findMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
};
