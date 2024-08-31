const Birth = require('../models/Birth');
const Cow = require('../models/Cow');
const { NotFoundError } = require('../utils/errors');

const createBirth = async (cowId, birth) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const newBirth = await Birth.create({ ...birth, motherCowId: cowId });
  await Cow.update(cowId, { ...cow, birthsCounter: cow.birthsCounter + 1 });
  return newBirth;
};

const findAllBirths = async () => {
  const births = await Birth.find();
  return births;
};

const findBirths = async (cowId, filterOptions) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const births = await Birth.find({ motherCowId: cowId });
  return births;
};

const findBirth = async (id, cowId) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const birth = await Birth.findOne({ id, motherCowId: cowId });
  if (!birth) {
    throw new NotFoundError('There is no birth with this id');
  }
  return birth;
};

const updateBirth = async (id, cowId, birth) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const updatedBirth = await Birth.update(id, birth);
  if (!birth) {
    throw new NotFoundError('There is no birth with this id');
  }
  return updatedBirth;
};

const deleteBirth = async (id, cowId) => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new NotFoundError('There is no cow with this id');
  }
  const deletedBirth = await Birth.delete(id);
  if (!deletedBirth) {
    throw new NotFoundError('There is no birth with this id');
  }
  await Cow.update(cowId, { ...cow, birthsCounter: cow.birthsCounter - 1 });
  return deletedBirth;
};

module.exports = {
  createBirth,
  findAllBirths,
  findBirths,
  findBirth,
  updateBirth,
  deleteBirth,
};
