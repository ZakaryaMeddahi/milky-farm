const router = require('express').Router();
const {
  getCows,
  getCow,
  createCow,
  updateCow,
  deleteCow,
} = require('../controllers/cows.controller');

router.route('/').get(getCows).post(createCow);
router.route('/:id').get(getCow).put(updateCow).delete(deleteCow);

module.exports = router;
