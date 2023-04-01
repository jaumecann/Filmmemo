const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');


const getDayRecords = async (req, res, next) => {
    const dayRecords = await sqlquery(querystrings.getDayRecords);
    res.json(dayRecords.recordsets[0])
    return next();
}


exports.getDayRecords = getDayRecords; 