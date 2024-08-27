const router = require('express').Router();

const {
  createMedicalCheckup,
  findMedicalCheckups,
  findMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
} = require('../services/medical-checkups.service');

router.route('/').get(findMedicalCheckups).post(createMedicalCheckup);
router
  .route('/:id')
  .get(findMedicalCheckup)
  .patch(updateMedicalCheckup)
  .delete(deleteMedicalCheckup);

module.exports = router;
