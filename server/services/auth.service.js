const { matchPassword, hashPassword } = require('../helpers/bcrypt.helper');
const { createJWT } = require('../helpers/jwt.helper');
const User = require('../models/User');
const { UnauthorizedError, BadRequestError } = require('../utils/errors');

const registerUser = async (data) => {
  const { email } = data;
  const user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError('Email already exists');
  }
  data.password = await hashPassword(data.password);
  const newUser = await User.create(data);
  return newUser;
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });

  if (!user) throw new UnauthorizedError('Email is incorrect');

  const validPassword = await matchPassword(password, user.password);

  if (!validPassword) throw new UnauthorizedError('Password is incorrect');

  const { id, name } = user;
  const token = createJWT({ id, name, email });

  return { ...user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
