const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');

class LoginApiController {
    // [POST] /
    async login(req, res) {
        console.log(req.body)
        var result = await db.then(pool => pool.request()
            .input('role_id', sql.Char(2), req.body.role)
            .input('account', sql.VarChar('10'), req.body.account)
            .input('password', sql.VarChar(30), req.body.password)
            .execute('sp_check_login')
        );
        res.json(result.recordset[0]);

        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/login.html'))

    }

    // [GET] /get-account
    async getAccount(req, res) {
        // var result = await db.then(pool => pool.request().query(`
        // select mi.menu_item_name as [menu_name], submenu_item_name as [submenu_name]
        //     from side_bar_menu_item as mi left outer join side_bar_submenu_item as submenu_arr on(mi.menu_item_id = submenu_arr.menu_item_id)
        //     `))

        // var result = await db.then(pool => pool.request().query(`
        // SELECT
        // CASE WHEN EXISTS
        // (	SELECT *
        //     FROM [login] AS l INNER JOIN [role] AS r ON (l.role_id = r.role_id)
        //     WHERE l.account = 'admin' AND l.[password] = '123456' AND r.role_id = '1'
        // )
        //     THEN 1
        //     ELSE 0
        //     END AS check_login
        //     `));

        var result = await db.then(pool => pool.request()
            .input('role_id', sql.Char(2), '1')
            .input('account', sql.VarChar('10'), 'admin')
            .input('password', sql.VarChar(30), '123456')
            .execute('sp_check_login')
        );
        res.json(result.recordset[0]);
    }

}

module.exports = new LoginApiController;