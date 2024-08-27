const { StatusCodes } = require('http-status-codes');
const birthService = require('../services/births.service');

const createBirth = async (req, res, next) => {
  try {
    const newBirth = await birthService.createBirth(req.body);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Birth created successfully',
      birth: newBirth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getBirths = async (req, res, next) => {
  try {
    const births = await birthService.findBirths(req.query);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Births retrieved successfully',
      births,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getBirth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const birth = await birthService.findBirth(id);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth retrieved successfully',
      birth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateBirth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBirth = await birthService.updateBirth(id, req.body);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth updated successfully',
      birth: updatedBirth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteBirth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBirth = await birthService.deleteBirth(id);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth deleted successfully',
      birth: deletedBirth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createBirth,
  getBirths,
  getBirth,
  updateBirth,
  deleteBirth,
};
