const sqlquery = require('../utils/database')
const querystrings = require('../utils/sql-dark-corner');


const getDayRecords = async (req, res, next) => {
    const dayRecords = await sqlquery(querystrings.getDayRecords);
    res.json(dayRecords.recordsets[0])
    return next();
}

const getDateInsights = async (req, res, next) => {
    const dateInsights = await sqlquery(querystrings.filmsPerDay)
    res.json(dateInsights.recordsets[0])
    return next();
}

const getTotalYears = async (req,res, next) => {
    const yearData = await sqlquery(querystrings.getTotalYears)
    res.json(yearData.recordsets[0])
    return next();
}


exports.getDayRecords = getDayRecords; 
exports.getDateInsights = getDateInsights;
exports.getTotalYears = getTotalYears;