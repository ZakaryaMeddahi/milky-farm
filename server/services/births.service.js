const Birth = require('../models/Birth');
const { NotFoundError } = require('../utils/errors');

const createBirth = async (birth) => {
  const newBirth = await Birth.create(birth);
  return newBirth;
};

const findBirths = async (filterOptions) => {
  const births = await Birth.find(filterOptions);
  return births;
};

const findBirth = async (id) => {
  const birth = await Birth.findById(id);
  if (!birth) {
    throw new NotFoundError('There is no birth with this id');
  }
  return birth;
};

const updateBirth = async (id, birth) => {
  const updatedBirth = await Birth.update(id, birth);
  if (!birth) {
    throw new NotFoundError('There is no birth with this id');
  }
  return updatedBirth;
};

const deleteBirth = async (id) => {
  const deletedBirth = await Birth.delete(id);
  if (!deletedBirth) {
    throw new NotFoundError('There is no birth with this id');
  }
  return deletedBirth;
};

module.exports = {
  createBirth,
  findBirths,
  findBirth,
  updateBirth,
  deleteBirth,
};
