const Cow = require('../models/Cow');
const { NotFoundError } = require('../utils/errors');

const createCow = async (cow) => {
  const newBirth = await Cow.create(cow);
  return newBirth;
};

const findCows = async (filterOptions) => {
  const cows = await Cow.find();
  return cows;
};

const findCow = async (id) => {
  const cow = await Cow.findById(id);
  if (!cow) {
    throw new NotFoundError('There is no cow record with this id');
  }
  return cow;
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
