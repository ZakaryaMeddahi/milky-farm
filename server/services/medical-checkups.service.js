const MedicalCheckup = require('../models/MedicalCheckup');
const { NotFoundError } = require('../utils/errors');

const createMedicalCheckup = async (medicalCheckup) => {
  const newMedicalCheckup = await MedicalCheckup.create(medicalCheckup);
  return newMedicalCheckup;
};

const findMedicalCheckups = async (filterOptions) => {
  const medicalCheckups = await MedicalCheckup.find(filterOptions);
  return medicalCheckups;
};

const findMedicalCheckup = async (id) => {
  const medicalCheckup = await MedicalCheckup.findById(id);
  if (!medicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return medicalCheckup;
};

const updateMedicalCheckup = async (id, medicalCheckup) => {
  const updatedMedicalCheckup = await MedicalCheckup.update(id, medicalCheckup);
  if (!medicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return updatedMedicalCheckup;
};

const deleteMedicalCheckup = async (id) => {
  const deletedMedicalCheckup = await MedicalCheckup.delete(id);
  if (!deletedMedicalCheckup) {
    throw new NotFoundError('There is no medical checkup with this id');
  }
  return deletedMedicalCheckup;
};

module.exports = {
  createMedicalCheckup,
  findMedicalCheckups,
  findMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
};
