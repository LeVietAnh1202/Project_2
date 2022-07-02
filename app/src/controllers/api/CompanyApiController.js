const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');

class CompanyApiController {
    // [POST] /create
    async create(req, res) {
        const result = await db.then(pool => pool.request()
            .input('company_id', sql.VarChar(10), req.body.company_id)
            .input('company_name', sql.NVarChar(50), req.body.company_name)
            .input('company_found_date', sql.DateTime, req.body.company_found_date)
            .input('company_type', sql.NVarChar(50), req.body.company_type)
            .input('company_website', sql.VarChar(200), req.body.company_website)
            .execute('sp_company_create')
        );
        res.json(result);
    }

    // [POST] /update
    async update(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
            .input('company_id', sql.VarChar(10), req.body.company_id)
            .input('company_name', sql.NVarChar(50), req.body.company_name)
            .input('company_found_date', sql.DateTime, req.body.company_found_date)
            .input('company_type', sql.NVarChar(50), req.body.company_type)
            .input('company_website', sql.VarChar(200), req.body.company_website)
            .execute('sp_company_update')
        );
        console.log(result)
        res.json(result);
    }

    // [GET] /delete
    async delete(req, res) {
        const result = await db.then(pool => pool.request()
            .input('company_id', sql.VarChar(10), req.query.company_id)
            .execute('sp_company_delete')
        );
        res.json(result);
    }

    // [GET] /get-by-id
    async getByID(req, res) {
        console.log(req.query);
        const result = await db.then(pool => pool.request()
            .input('company_id', sql.VarChar(10), req.query.company_id)
            .execute('sp_company_get_by_id')
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

    // [POST] /search
    async search(req, res) {
        console.log(req.body)
        const result = await db.then(pool => pool.request()
            .input('company_id', sql.VarChar(10), req.body.company_id)
            .input('company_name', sql.NVarChar(50), req.body.company_name)
            .input('company_found_date', sql.DateTime, req.body.company_found_date == '' ? null : req.body.company_found_date)
            .input('company_type', sql.NVarChar(50), req.body.company_type)
            .input('company_website', sql.VarChar(200), req.body.company_website)
            .execute('sp_company_search')
        );
        res.json(result);
    }
}

module.exports = new CompanyApiController;