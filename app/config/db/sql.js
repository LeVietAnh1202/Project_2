const http = require('http');
const sql = require('mssql');

require("msnodesqlv8");
var config = {
    // domain: "sql.bsite.net",
    user: "levietanh1202_classfund",
    password: "IoTtainangK18",
    server: "sql.bsite.net\\MSSQL2016",
    database: "levietanh1202_classfund",
    driver: "msnodesqlv8",
    parseJSON: true,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    authentication: {
        // type: "azure-active-directory-password"
    }
};

async function connectionPool() {
    try {
        console.time('time connect db')
        //let pool = await sql.connect('Data Source=DESKTOP-7KGCO11\\SQLEXPRESS;Initial Catalog=pva;User ID=sa;Password=minhdoanh08;')
        //let pool = await sql.connect('Server=DESKTOP-7KGCO11\\SQLEXPRESS;Database=pva;User Id=sa;Password=minhdoanh08;Encrypt=true')
        // var pool = await sql.connect('Data Source=sql.bsite.net\\MSSQL2016;Initial Catalog=levietanh1202_classfund;User ID=levietanh1202_classfund;Password=IoTtainangK18;Persist Security Info=True;MultipleActiveResultSets=True;trustServerCertificate=true;parseJSON: true')
        var pool = await sql.connect(config);


        //let pool = await sql.connect('Data Source=ClassFundDemo1.mssql.somee.com;Initial Catalog=ClassFundDemo1;User ID=vietanh1202_SQLLogin_1;Password=ysq4e2cvhk;Persist Security Info=True;MultipleActiveResultSets=True;trustServerCertificate=true')

        // let result1 = await pool.request()
        //     // .input('input_parameter', sql.Int, value)
        //     // .query('select * from mytable where id = @input_parameter')
        //     .query('select * from [user]')

        // console.dir(result1)
        console.timeEnd('time connect db')
        return pool;

        // Stored procedure

        // let result2 = await pool.request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name')

        // console.dir(result2)
    } catch (err) {
        // ... error checks
        console.log("ERROR NAME IS " + err)
    }
}

module.exports = connectionPool();

/////////////////////////////////

// var sqlserver = async() => {
//     console.log('connected before try')
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         //await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
//         await sql.connect('Server=DESKTOP-7KGCO11\\SQLEXPRESS;Database=pva;Trusted_Connection=True')
//             //const result = await sql.query `select * from mytable where id = ${value}`
//         const result = await sql.query `select * from [user]`
//         console.dir(result)
//         console.log('connected')
//         console.log(result)
//     } catch (err) {
//         // ... error checks
//         console.log(err)
//     }
// }
// sqlserver();
// console.log('success')



///////////////////////////////

// const sql = require('mssql')
// const sqlConfig = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME,
//     server: 'localhost',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true, // for azure
//         trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }

// async() => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(sqlConfig)
//         const result = await sql.query `select * from mytable where id = ${value}`
//         console.dir(result)
//     } catch (err) {
//         // ... error checks
//     }
// }