const { StatusCodes } = require('http-status-codes');
const cowService = require('../services/cows.service');

const createCow = async (req, res, next) => {
  try {
    const newCow = await cowService.createCow(req.body);
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Cow record created successfully',
      cow: newCow,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getCows = async (req, res, next) => {
  try {
    const cows = await cowService.findCows(req.query);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow records retrieved successfully',
      cows,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getCow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cow = await cowService.findCow(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow record retrieved successfully',
      cow,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateCow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCow = await cowService.updateCow(parseInt(id), req.body);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow record updated successfully',
      cow: updatedCow,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteCow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCow = await cowService.deleteCow(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow record deleted successfully',
      cow: deletedCow,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createCow,
  getCows,
  getCow,
  updateCow,
  deleteCow,
};
