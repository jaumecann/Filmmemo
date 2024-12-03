const sqlquery = require('../utils/database');
const querystrings = require('../utils/sql-dark-corner');

const getWishList = async (req, res, next) =>{
    const lastFive = await sqlquery(querystrings.getWishList);
    res.json(lastFive.recordsets[0])
    return next();
    }

const insert = async (req, res, next) => {
    
    const {id, isAdding} = req.body
    let query = '';
    if (isAdding){
    query = `IF EXISTS (SELECT 1 FROM Wishlist WHERE filmId = '${id}')
BEGIN
    UPDATE Wishlist SET deactivateDate = NULL WHERE filmId = '${id}'
END
ELSE
BEGIN
    INSERT INTO Wishlist (filmId, deactivateDate) VALUES ('${id}', NULL)
END`
    } else {
       query = `UPDATE Wishlist SET deactivateDate = GETDATE() WHERE filmId='${id}'`
    }

     try {
            await sqlquery(query);
            res.sendStatus(200);
        }
        catch(e){
            return next(e);
        }
    }

exports.getWishList = getWishList
exports.insert = insert 