const express = require('express');
const filmControllers = require('../controllers/films-controllers')

const router = express.Router();

router.get('/lastfive', filmControllers.getLast5);


module.exports = router