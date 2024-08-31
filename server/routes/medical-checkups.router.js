const { getAllMedicalCheckups } = require('../controllers/medical-checkups.controller');

const router = require('express').Router();

router.route('/').get(getAllMedicalCheckups);

module.exports = router;
