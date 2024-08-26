const User = require('../models/User');
const { UnauthorizedError, BadRequestError } = require('../utils/errors');

const registerUser = async (data) => {
  const { email } = data;
  const user = await User.findOne({ email });
  if (user) {
    throw new BadRequestError('Email already exists');
  }
  const newUser = await User.create(data);
  return await newUser.save();
};

const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });

  if (!user) throw new UnauthorizedError('Email or Password is incorrect');

  const validPassword = await user.matchPassword(password);

  if (!validPassword)
    throw new UnauthorizedError('Email or Password is incorrect');

  const token = user.createJWT();

  return { ...user._doc, token };
};

module.exports = {
  registerUser,
  loginUser,
};
