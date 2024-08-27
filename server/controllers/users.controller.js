const { StatusCodes } = require('http-status-codes');
const userService = require('../services/users.service');

const getUsers = async () => {
  try {
    const users = await userService.findUsers();
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Users retrieved successfully',
      users,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getUser = async () => {
  try {
    const { id } = req.params;
    const user = await userService.findUser(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User retrieved successfully',
      user,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateUser = async () => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(parseInt(id), req.body);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteUser = async () => {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id));
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
