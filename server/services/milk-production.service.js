const MilkProduction = require('../models/MilkProduction');
const { NotFoundError } = require('../utils/errors');

const createMilkProduction = async (data) => {
  const newMilkProduction = await MilkProduction.create(data);
  return newMilkProduction;
};

const findMilkProductions = async (options) => {
  const milkProductions = await MilkProduction.find(options);
  return milkProductions;
};

const findMilkProduction = async (id) => {
  const milkProduction = await MilkProduction.findById(id);
  if (!milkProduction) {
    throw new NotFoundError(`Milk production with id ${id} not found`);
  }
  return milkProduction;
};

const updateMilkProduction = async (id, data) => {
  const updatedMilkProduction = await MilkProduction.update(id, data);
  if (!updatedMilkProduction) {
    throw new NotFoundError(`Milk production with id ${id} not found`);
  }
  return updatedMilkProduction;
};

const deleteMilkProduction = async (id) => {
  const deletedMilkProduction = await MilkProduction.delete(id);
  if (!deletedMilkProduction) {
    throw new NotFoundError(`Milk production with id ${id} not found`);
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
