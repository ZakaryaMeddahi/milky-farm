const User = require('../models/User');
const { NotFoundError } = require('../utils/errors');

const findUsers = async (filterOptions) => {
  const users = await User.find(filterOptions);
  for (const user in users) {
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
  findUsers,
  findUser,
  updateUser,
  deleteUser,
};
