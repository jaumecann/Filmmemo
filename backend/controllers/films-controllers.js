const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');

const getLast5 = async (req, res, next) =>{
    const lastFive = await sqlquery(querystrings.last5);
    res.json(lastFive.recordsets[0])
    return next();
    }

const getCountries = async (freq,res, next) => {
    const countries = await sqlquery(querystrings.countries)
    res.json(countries.recordsets[0])
    return next();
}


exports.getLast5 = getLast5;  
exports.getCountries = getCountries