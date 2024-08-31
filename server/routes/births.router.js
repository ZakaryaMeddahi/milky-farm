const { getAllBirths } = require('../controllers/births.controller');

const router = require('express').Router();

router.route('/').get(getAllBirths);

module.exports = router;
