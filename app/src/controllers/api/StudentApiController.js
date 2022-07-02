const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');

class StudentController {
    // // [POST] /create
    // async create(req, res) {
    //     const result = await db.then(pool => pool.request()
    //         .input('student_id', sql.VarChar(10), req.body.student_id)
    //         .input('student_name', sql.NVarChar(100), req.body.student_name)
    //         .input('student_date_of_birth', sql.DateTime, req.body.student_date_of_birth)
    //         .input('student_gender', sql.Char(1), req.body.student_gender)
    //         .input('student_website', sql.VarChar(200), req.body.student_website)
    //         .execute('sp_student_create')
    //     );
    //     res.json(result);
    // }

    // [POST] /update
    async update(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
            .input('student_id', sql.VarChar(10), req.body.student_id)
            .input('student_name', sql.NVarChar(100), req.body.student_name)
            .input('student_date_of_birth', sql.DateTime, req.body.student_date_of_birth == '' ? null : req.body.student_date_of_birth)
            .input('student_gender', sql.Bit, parseInt(req.body.student_gender))
            .input('student_home_town', sql.NVarChar(200), req.body.student_home_town)
            .input('student_email', sql.VarChar(100), req.body.student_email)
            .input('student_phone_number', sql.VarChar(10), req.body.student_phone_number)
            .input('student_link', sql.VarChar(100), req.body.student_link)
            .execute('sp_student_update')
        );
        res.json(result);
    }

    // [GET] /delete
    async delete(req, res) {
        const result = await db.then(pool => pool.request()
            .input('student_id', sql.VarChar(10), req.query.student_id)
            .execute('sp_student_delete')
        );
        res.json(result);
    }

    // [GET] /get-by-account-id
    async getByAccountID(req, res) {
        const result = await db.then(pool => pool.request()
            .input('account', sql.VarChar(10), req.query.account)
            .execute('sp_student_get_by_account_id')
        );
        res.json(result.recordset[0]);
    }
    
    // [GET] /get-by-id
    async getByID(req, res) {
        const result = await db.then(pool => pool.request()
            .input('student_id', sql.VarChar(10), req.query.student_id)
            .execute('sp_student_get_by_id')
        );
        res.json(result.recordset[0]);
    }

    // [GET] /get-all
    async getAll(req, res) {
        const result = await db.then(pool => pool.request()
            // .input('student', sql.VarChar(10), req.query.student)
            .execute('sp_student_get_all')
        );
        res.json(result);
    }

    // [POST] /search
    async search(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
        .input('student_id', sql.VarChar(10), req.body.student_id)
        .input('student_name', sql.NVarChar(100), req.body.student_name)
        .input('student_gender', sql.Bit, parseInt(req.body.student_gender))
        .input('student_home_town', sql.NVarChar(200), req.body.student_home_town)
        .input('student_email', sql.VarChar(100), req.body.student_email)
        .input('student_phone_number', sql.VarChar(100), req.body.student_phone_number)
        .execute('sp_student_search')
        );
        res.json(result);
    }
}

module.exports = new StudentController;