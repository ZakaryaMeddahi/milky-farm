const { StatusCodes } = require('http-status-codes');
const milkProductionService = require('../services/milk-production.service');

const createMilkProduction = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const newMilkProduction = await milkProductionService.createMilkProduction({
      ...req.body,
      insertedBy: userId,
    });
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Milk production record created successfully',
      milkProduction: newMilkProduction,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getMilkProductions = async (req, res, next) => {
  try {
    const milkProductions = await milkProductionService.findMilkProductions(
      req.query
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Milk production records retrieved successfully',
      milkProductions,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getMilkProduction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const milkProduction = await milkProductionService.findMilkProduction(
      parseInt(id)
    );
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Milk production record retrieved successfully',
      milkProduction,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateMilkProduction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMilkProduction =
      await milkProductionService.updateMilkProduction(parseInt(id), req.body);
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Milk production record updated successfully',
      milkProduction: updatedMilkProduction,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteMilkProduction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await milkProductionService.deleteMilkProduction(parseInt(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'Milk production record deleted successfully',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createMilkProduction,
  getMilkProductions,
  getMilkProduction,
  updateMilkProduction,
  deleteMilkProduction,
};
