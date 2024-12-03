const express = require('express');
const wishControllers = require('../controllers/wish-controllers')

const router = express.Router();

router.get('/wishlist', wishControllers.getWishList);
router.post('/', wishControllers.insert);


module.exports = router