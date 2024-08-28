const { StatusCodes } = require('http-status-codes');
const birthService = require('../services/births.service');

const createBirth = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { cowId } = req.params;
    const newBirth = await birthService.createBirth(parseInt(cowId), {
      ...req.body,
      insertedBy: userId,
    });
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Birth record created successfully',
      birth: newBirth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getBirths = async (req, res, next) => {
  try {
    const { cowId } = req.params;
    const births = await birthService.findBirths(parseInt(cowId), req.query);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Births record retrieved successfully',
      births,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getBirth = async (req, res, next) => {
  try {
    const { id, cowId } = req.params;
    const birth = await birthService.findBirth(parseInt(id), parseInt(cowId));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth record retrieved successfully',
      birth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateBirth = async (req, res, next) => {
  try {
    const { id, cowId } = req.params;
    const updatedBirth = await birthService.updateBirth(
      parseInt(id),
      parseInt(cowId),
      req.body
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth record updated successfully',
      birth: updatedBirth,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteBirth = async (req, res, next) => {
  try {
    const { id, cowId } = req.params;
    await birthService.deleteBirth(parseInt(id), parseInt(cowId));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Birth record deleted successfully',
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
