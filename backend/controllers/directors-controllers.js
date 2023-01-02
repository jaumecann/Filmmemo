const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');

const getDirectors = async (req, res, next) =>{
    const alldirectors = await sqlquery(querystrings.alldirectors);
    res.json(alldirectors.recordsets[0])
    return next();
    }



exports.getDirectors = getDirectors;  
