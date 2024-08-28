const MilkProduction = require('../models/MilkProduction');
const { NotFoundError } = require('../utils/errors');

const createMilkProduction = async (data) => {
  const newMilkProduction = await MilkProduction.create(data);
  return newMilkProduction;
};

const findMilkProductions = async (filterOptions) => {
  const milkProductions = await MilkProduction.find();
  return milkProductions;
};

const findMilkProduction = async (id) => {
  const milkProduction = await MilkProduction.findById(id);
  if (!milkProduction) {
    throw new NotFoundError('There is no milk production record with this id');
  }
  return milkProduction;
};

const updateMilkProduction = async (id, data) => {
  const updatedMilkProduction = await MilkProduction.update(id, data);
  if (!updatedMilkProduction) {
    throw new NotFoundError('There is no milk production record with this id');
  }
  return updatedMilkProduction;
};

const deleteMilkProduction = async (id) => {
  const deletedMilkProduction = await MilkProduction.delete(id);
  if (!deletedMilkProduction) {
    throw new NotFoundError('There is no milk production record with this id');
  }
  return deletedMilkProduction;
};

module.exports = {
  createMilkProduction,
  findMilkProductions,
  findMilkProduction,
  updateMilkProduction,
  deleteMilkProduction,
};
