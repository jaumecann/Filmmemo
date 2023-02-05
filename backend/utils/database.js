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

/*    Al parecer en el request se pierde la conexion al hacer varias solicitudes a la vez. 
   Por lo cual en el constructor del Request debes colocar la conexión. 
   Si no la colocas tratará de adivinar la conexión abierta, 
   en ese momento puede que al hacer varias solicitudes escoge una conexión que está cerrada.
   https://es.stackoverflow.com/questions/146967/node-mssql-error-connection-is-closed-cuando-ejecuto-varias-consultas-a-la-v
   */

   let request = new sql.Request(conn)

   const result = await request.query(sql_query)

   conn.close()
   return result;

}


module.exports = dbquery;