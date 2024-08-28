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

  if (!user) throw new UnauthorizedError('Invalid email');

  const validPassword = await matchPassword(password, user.password);

  if (!validPassword) throw new UnauthorizedError('Invalid password');

  const { id, name, role } = user;
  const token = createJWT({ id, name, email, role });

  return { ...user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
