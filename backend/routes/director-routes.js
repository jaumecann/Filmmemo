const express = require('express');
const directorControllers = require('../controllers/directors-controllers')

const router = express.Router();

router.get('/alldirectors', directorControllers.getDirectors);
router.post('/', directorControllers.insert);


module.exports = router