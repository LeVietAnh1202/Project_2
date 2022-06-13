const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');

class CompanyApiController {
    // [POST] /create
    async create(req, res) {
        const result = await db.then(pool => pool.request()
            .input('ma_DN', sql.VarChar(10), req.body.ma_DN)
            .input('ten_DN', sql.NVarChar(50), req.body.ten_DN)
            .input('ngay_thanh_lap', sql.DateTime, req.body.ngay_thanh_lap)
            .input('loai_hinh', sql.NVarChar(50), req.body.loai_hinh)
            .input('website', sql.VarChar(200), req.body.website)
            .execute('sp_company_create')
        );
        res.json(result);
    }

    // [GET] /get-all
    async getAll(req, res) {
        const result = await db.then(pool => pool.request()
            .execute('sp_company_get_all')
        );
        res.json(result);
    }
}

module.exports = new CompanyApiController;