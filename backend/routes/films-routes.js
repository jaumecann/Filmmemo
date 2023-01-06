const express = require('express');
const filmControllers = require('../controllers/films-controllers')

const router = express.Router();

router.get('/lastfive', filmControllers.getLast5);
router.get('/countries', filmControllers.getCountries);

router.post('/', filmControllers.insert)


module.exports = router