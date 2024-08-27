const router = require('express').Router();
const {
  findUsers,
  findUser,
  updateUser,
  deleteUser,
} = require('../services/users.service');

router.route('/').get(findUsers);
router.route('/:id').get(findUser).patch(updateUser).delete(deleteUser);

module.exports = router;
