const express = require('express');
const filmControllers = require('../controllers/films-controllers')

const router = express.Router();

router.get('/lastfive', filmControllers.getLast5);
router.get('/countries', filmControllers.getCountries);
router.get('/getAll', filmControllers.getAll)
router.get('/getAllPlus', filmControllers.getAllWithNotSeen)
router.get('/getSisters', filmControllers.getSisters);
router.get('/getFilm', filmControllers.getFilm);
router.get('/getTops', filmControllers.getTop);
router.get('/getCountryCount', filmControllers.getCountryCount);

router.post('/', filmControllers.insert);
router.post('/update', filmControllers.update);



module.exports = router