const {
  register,
  login,
  getMyAccount,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getMyAccount);

module.exports = router;
