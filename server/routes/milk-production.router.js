const router = require('express').Router();
const {
  createMilkProduction,
  findMilkProductions,
  findMilkProduction,
  updateMilkProduction,
  deleteMilkProduction,
} = require('../services/milk-production.service');

router.route('/').get(findMilkProductions).post(createMilkProduction);
router
  .route('/:id')
  .get(findMilkProduction)
  .patch(updateMilkProduction)
  .delete(deleteMilkProduction);

module.exports = router;
