const { StatusCodes } = require('http-status-codes');
const cowService = require('../services/cows.service');
const birthsService = require('../services/births.service');
const medicalCheckupService = require('../services/medical-checkups.service');

const createCow = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const newCow = await cowService.createCow({
      ...req.body,
      id: parseInt(req.body.id),
      insertedBy: userId,
    });
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
    const births = await birthsService.findBirths(parseInt(id));
    const medicalCheckups = await medicalCheckupService.findMedicalCheckups(
      parseInt(id)
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow record retrieved successfully',
      cow: { ...cow, births, medicalCheckups },
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
    await cowService.deleteCow(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Cow record deleted successfully',
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
