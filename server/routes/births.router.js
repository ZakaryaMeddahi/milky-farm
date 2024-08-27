const router = require('express').Router();
const {
  getBirths,
  getBirth,
  createBirth,
  updateBirth,
  deleteBirth,
} = require('../controllers/births.controller');

router.route('/').get(getBirths).post(createBirth);
router.route('/:id').get(getBirth).put(updateBirth).delete(deleteBirth);

module.exports = router;