const { StatusCodes } = require('http-status-codes');
const { registerUser, loginUser } = require('../services/auth.service');
// const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors');

const register = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const err = new BadRequestError(errors.array().map((err) => err.msg));
    //   return next(err);
    // }
    const { body } = req;
    body.role = 'moderator';
    const { id, name, email, role } = await registerUser(body);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'User registered successfully',
      user: { id, name, email, role },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const err = new BadRequestError(errors.array().map((err) => err.msg));
    //   return next(err);
    // }
    const { body } = req;
    const user = await loginUser(body);
    const { id, name, email, role, token } = user;
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User logged in successfully',
      user: { id, name, email, role },
      token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getMyAccount = (req, res, next) => {
  try {
    const { id, name, email, role } = req.user;
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'User account retrieved successfully',
      user: { id, name, email, role },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMyAccount,
};
