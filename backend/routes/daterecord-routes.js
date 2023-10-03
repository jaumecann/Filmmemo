const express = require('express');
const dayControllers = require('../controllers/daterecords-controllers')

const router = express.Router();

router.get('/dayrecords', dayControllers.getDayRecords);
router.get('/dateinsight', dayControllers.getDateInsights)

module.exports = router