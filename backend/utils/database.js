const sql = require('mssql');

const dbquery = async (sql_query) => {

    let config = {
        user:'sa',
        password:'esoken',
        server:'DESKTOP-I70VC4F',
        database:'Filmmemo',
        trustServerCertificate: true,
        pool: {
            max:10,
            min:0,
        }
    };


   const conn = await sql.connect(config)

   const result = await conn.query(sql_query)
        // .then((conn) => {
        // conn.query(sql_query)
            // .then((recordset) => {return recordset; 
            //     // console.log(result.recordsets[0][222])
            // })
            //     .then(() => {
            //         conn.close(); 
            //     });

    // })
    return result;

}


module.exports = dbquery;