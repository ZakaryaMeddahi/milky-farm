const { StatusCodes } = require('http-status-codes');
const medicalCheckupService = require('../services/medical-checkups.service');

const createMedicalCheckup = async (req, res, next) => {
  try {
    const newMedicalCheckup = await medicalCheckupService.createMedicalCheckup(
      req.body
    );
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Medical checkup record created successfully',
      medicalCheckup: newMedicalCheckup,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getMedicalCheckups = async (req, res, next) => {
  try {
    const medicalCheckups = await medicalCheckupService.findMedicalCheckups(
      req.query
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Medical checkup records retrieved successfully',
      medicalCheckups,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getMedicalCheckup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const medicalCheckup = await medicalCheckupService.findMedicalCheckup(
      parseInt(id)
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Medical checkup record retrieved successfully',
      medicalCheckup,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateMedicalCheckup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMedicalCheckup =
      await medicalCheckupService.updateMedicalCheckup(parseInt(id), req.body);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Medical checkup record updated successfully',
      medicalCheckup: updatedMedicalCheckup,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteMedicalCheckup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMedicalCheckup =
      await medicalCheckupService.deleteMedicalCheckup(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Medical checkup record deleted successfully',
      medicalCheckup: deletedMedicalCheckup,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createMedicalCheckup,
  getMedicalCheckups,
  getMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
};
