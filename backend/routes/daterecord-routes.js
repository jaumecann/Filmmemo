const express = require('express');
const dayControllers = require('../controllers/daterecords-controllers')

const router = express.Router();

router.get('/dayrecords', dayControllers.getDayRecords);

module.exports = router