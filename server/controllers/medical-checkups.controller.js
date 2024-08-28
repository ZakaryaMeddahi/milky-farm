const { StatusCodes } = require('http-status-codes');
const medicalCheckupService = require('../services/medical-checkups.service');

const createMedicalCheckup = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { cowId } = req.params;
    const newMedicalCheckup = await medicalCheckupService.createMedicalCheckup(
      parseInt(cowId),
      {
        ...req.body,
        insertedBy: userId,
      }
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
    const { cowId } = req.params;
    const medicalCheckups = await medicalCheckupService.findMedicalCheckups(
      parseInt(cowId),
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
    const { id, cowId } = req.params;
    const medicalCheckup = await medicalCheckupService.findMedicalCheckup(
      parseInt(id),
      parseInt(cowId)
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
    const { id, cowId } = req.params;
    const updatedMedicalCheckup =
      await medicalCheckupService.updateMedicalCheckup(
        parseInt(id),
        parseInt(cowId),
        req.body
      );
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
    const { id, cowId } = req.params;
    await medicalCheckupService.deleteMedicalCheckup(
      parseInt(id),
      parseInt(cowId)
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Medical checkup record deleted successfully',
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
