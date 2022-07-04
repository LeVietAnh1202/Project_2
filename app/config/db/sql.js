const http = require('http');
const sql = require('mssql');

// require("msnodesqlv8");
var config = {
    // // // Server local
    server: "LAPTOP-3QPR9A3B",
    user: "manager",
    password: "vietanh123",
    database: "Project_2",
    // driver: "msnodesqlv8",
    parseJSON: true,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        integratedSecurity: true
    }
};

async function connectionPool() {
    try {
        console.time('Time connect db')
        var pool = await sql.connect(config);

        console.timeEnd('Time connect db')
        return pool;
    } catch (err) {
        // ... error checks
        console.log("ERROR NAME IS " + err)
    }
}

module.exports = connectionPool();




// const http = require('http');
// const sql = require('mssql');

// require("msnodesqlv8");
// var config = {
//     // // // Server local
//     server: "LAPTOP-3QPR9A3B",
//     user: "manager",
//     password: "vietanh123",
//     database: "Project_2",
//     driver: "msnodesqlv8",
//     parseJSON: true,
//     options: {
//         trustedConnection: true,
//         encrypt: true,
//         enableArithAbort: true,
//         trustServerCertificate: true,
//         integratedSecurity: true
//     }

//     // // Server on the freeasphosting
//     // user: "levietanh1202_classfund",
//     // password: "IoTtainangK18",
//     // server: "sql.bsite.net\\MSSQL2016",
//     // database: "levietanh1202_classfund",
//     // driver: "msnodesqlv8",
//     // parseJSON: true,
//     // options: {
//     //     trustedConnection: true,
//     //     encrypt: true,
//     //     enableArithAbort: true,
//     //     trustServerCertificate: true,
//     // },
//     // authentication: {
//     //     // type: "azure-active-directory-password"
//     // }
// };

// async function connectionPool() {
//     try {
//         console.time('Time connect db')
//         //let pool = await sql.connect('Data Source=DESKTOP-7KGCO11\\SQLEXPRESS;Initial Catalog=pva;User ID=sa;Password=minhdoanh08;')
//         //let pool = await sql.connect('Server=DESKTOP-7KGCO11\\SQLEXPRESS;Database=pva;User Id=sa;Password=minhdoanh08;Encrypt=true')
//         // var pool = await sql.connect('Data Source=sql.bsite.net\\MSSQL2016;Initial Catalog=levietanh1202_classfund;User ID=levietanh1202_classfund;Password=IoTtainangK18;Persist Security Info=True;MultipleActiveResultSets=True;trustServerCertificate=true;parseJSON: true')
//         var pool = await sql.connect(config);

//         console.timeEnd('Time connect db')
//         return pool;
//     } catch (err) {
//         // ... error checks
//         console.log("ERROR NAME IS " + err)
//     }
// }

// module.exports = connectionPool();