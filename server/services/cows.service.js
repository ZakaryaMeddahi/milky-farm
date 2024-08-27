const Cow = require('../models/Cow');
const { NotFoundError } = require('../utils/errors');

const createCow = async (cowCow) => {
  const newBirth = await Cow.create(cowCow);
  return newBirth;
};

const findCows = async (filterOptions) => {
  const cowCows = await Cow.find(filterOptions);
  return cowCows;
};

const findCow = async (id) => {
  const cowCow = await Cow.findById(id);
  if (!cowCow) {
    throw new NotFoundError('There is no cow record with this id');
  }
  return cowCow;
};

const updateCow = async (id, cow) => {
  const updatedCow = await Cow.update(id, cow);
  if (!cow) {
    throw new NotFoundError('There is no cow record with this id');
  }
  return updatedCow;
};

const deleteCow = async (id) => {
  const deletedCow = await Cow.delete(id);
  if (!deletedCow) {
    throw new NotFoundError('There is no cow record with this id');
  }
  return deletedCow;
};

module.exports = {
  createCow,
  findCows,
  findCow,
  updateCow,
  deleteCow,
};
