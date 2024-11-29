const sqlquery = require('../utils/database');
const querystrings = require('../utils/sql-dark-corner');

const getWishList = async (req, res, next) =>{
    const lastFive = await sqlquery(querystrings.getWishList);
    res.json(lastFive.recordsets[0])
    return next();
    }

exports.getWishList = getWishList