const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');
require('dotenv').config();

var ncrypt = require('ncrypt-js'); // or import { encrypt, decrypt } from 'ncrypt-js';


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

        // res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/login.html'))

    }

    // [GET] /get-account
    async getAccount(req, res) {
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