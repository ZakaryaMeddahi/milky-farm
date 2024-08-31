const User = require('../models/User');
const { NotFoundError } = require('../utils/errors');
const { generatePassword } = require('../helpers/password.helper');
const { hashPassword } = require('../helpers/bcrypt.helper');

const createUser = async (data) => {
  const password = generatePassword();
  const hashedPassword = await hashPassword(password);
  const user = await User.create({ ...data, password: hashedPassword });
  delete user.password;
  return user;
};

const findUsers = async (filterOptions) => {
  const users = await User.find();
  for (const user of users) {
    delete user.password;
  }
  return users;
};

const findUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError('There is no user with this id');
  }
  delete user.password;
  return user;
};

const updateUser = async (id, user) => {
  const updatedUser = await User.update(id, user);
  if (!updatedUser) {
    throw new NotFoundError('There is no user with this id');
  }
  delete updatedUser.password;
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.delete(id);
  if (!deletedUser) {
    throw new NotFoundError('There is no user with this id');
  }
  delete deletedUser.password;
  return deletedUser;
};

module.exports = {
  createUser,
  findUsers,
  findUser,
  updateUser,
  deleteUser,
};
