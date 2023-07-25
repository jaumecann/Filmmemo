const express = require('express');
const directorControllers = require('../controllers/directors-controllers')

const router = express.Router();

router.get('/alldirectors', directorControllers.getDirectors);
router.post('/', directorControllers.insert);
router.get('/best', directorControllers.getBest)


module.exports = router