const sqlquery = require('../utils/database');
const querystrings = require('../utils/sql-dark-corner');

const getWishList = async (req, res, next) =>{
    const lastFive = await sqlquery(querystrings.getWishList);
    res.json(lastFive.recordsets[0])
    return next();
    }

const insert = async (req, res, next) => {
    
    const {id} = req.body
    
    const query = `INSERT INTO Wishlist(filmId) VALUES ('${id}')`
     try {
            await sqlquery(query);
            res.sendStatus(200);
        }
        catch(e){
            return next(e);
        }
    }

exports.getWishList = getWishList