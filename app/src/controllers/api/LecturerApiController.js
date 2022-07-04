const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');

class LecturerController {
    // // [POST] /create
    // async create(req, res) {
    //     const result = await db.then(pool => pool.request()
    //         .input('lecturer_id', sql.VarChar(10), req.body.lecturer_id)
    //         .input('lecturer_name', sql.NVarChar(100), req.body.lecturer_name)
    //         .input('lecturer_date_of_birth', sql.DateTime, req.body.lecturer_date_of_birth)
    //         .input('lecturer_gender', sql.Char(1), req.body.lecturer_gender)
    //         .input('lecturer_website', sql.VarChar(200), req.body.lecturer_website)
    //         .execute('sp_lecturer_create')
    //     );
    //     res.json(result);
    // }

    // [POST] /update
    async update(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
            .input('lecturer_id', sql.VarChar(10), req.body.lecturer_id)
            .input('lecturer_name', sql.NVarChar(100), req.body.lecturer_name)
            .input('lecturer_date_of_birth', sql.DateTime, req.body.lecturer_date_of_birth == '' ? null : req.body.lecturer_date_of_birth)
            .input('lecturer_gender', sql.Bit, parseInt(req.body.lecturer_gender))
            .input('lecturer_home_town', sql.NVarChar(200), req.body.lecturer_home_town)
            .input('lecturer_email', sql.VarChar(100), req.body.lecturer_email)
            .input('lecturer_phone_number', sql.VarChar(10), req.body.lecturer_phone_number)
            .execute('sp_lecturer_update')
        );
        res.json(result);
    }

    // [GET] /delete
    async delete(req, res) {
        const result = await db.then(pool => pool.request()
            .input('lecturer_id', sql.VarChar(10), req.query.lecturer_id)
            .execute('sp_lecturer_delete')
        );
        res.json(result);
    }

    // [GET] /get-by-account-id
    async getByAccountID(req, res) {
        const result = await db.then(pool => pool.request()
            .input('account', sql.VarChar(10), req.query.account)
            .execute('sp_lecturer_get_by_account_id')
        );
        res.json(result.recordset[0]);
    }
    
    // [GET] /get-by-id
    async getByID(req, res) {
        const result = await db.then(pool => pool.request()
            .input('lecturer_id', sql.VarChar(10), req.query.lecturer_id)
            .execute('sp_lecturer_get_by_id')
        );
        res.json(result.recordset[0]);
    }

    // [GET] /get-all
    async getAll(req, res) {
        const result = await db.then(pool => pool.request()
            .execute('sp_lecturer_get_all')
        );
        res.json(result);
    }

    // [POST] /search
    async search(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
        .input('lecturer_id', sql.VarChar(10), req.body.lecturer_id)
        .input('lecturer_name', sql.NVarChar(100), req.body.lecturer_name)
        .input('lecturer_gender', sql.Bit, parseInt(req.body.lecturer_gender))
        .input('lecturer_home_town', sql.NVarChar(200), req.body.lecturer_home_town)
        .input('lecturer_email', sql.VarChar(100), req.body.lecturer_email)
        .input('lecturer_phone_number', sql.VarChar(100), req.body.lecturer_phone_number)
        .execute('sp_lecturer_search')
        );
        res.json(result);
    }
}

module.exports = new LecturerController;