const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');

class AccountApiController {
    // [POST] /create
    async create(req, res) {
        const result = await db.then(pool => pool.request()
            .input('role_id', sql.Char(2), req.body.role)
            .input('account', sql.VarChar('10'), req.body.account)
            .input('password', sql.VarChar(30), req.body.password)
            .input('avatar', sql.VarChar(100), req.body.avtar)
            .input('full_name', sql.NVarChar(30), req.body.full_name)
            .input('gender', sql.Bit, req.body.gender)
            .execute('sp_account_create')
        );
        res.json(result);
    }

    // [GET] /get-all
    async getAll(req, res) {
        const result = await db.then(pool => pool.request()
            .execute('sp_account_get_all')
        );
        res.json(result);
    }
}

module.exports = new AccountApiController;