const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');
const storage = require('../../../util/storage');
const imageFilter = require('../../../util/imageFilter');
const multer = require('multer');

class AccountApiController {
    // [POST] /create
    async create(req, res) {
        // 'avatar' is the name of our file input field in the HTML form
        // let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
        let upload = multer({ storage: storage, fileFilter: imageFilter })
        .fields([
            {name: 'avatar', maxCount: 1}, 
            {name: 'cover_image', maxCount: 1}]);

        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            // else if (!req.file) {
            //     return res.send('Please select an image to upload');
            // }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            async function spAccountCreate() {
                return await db.then(pool => pool.request()
                    .input('account', sql.VarChar(10), req.body.account)
                    .input('role_id', sql.Char(2), req.body.role)
                    .input('password', sql.VarChar(30), req.body.password)
                    .input('avatar', sql.VarChar(100),
                     !req.files['avatar'] ? 'avatar.jpg' : req.files['avatar'][0].filename)
                    .input('full_name', sql.NVarChar(30), req.body.full_name)
                    .input('gender', sql.Bit, parseInt(req.body.gender))
                    .input('cover_image', sql.VarChar(100), !req.files['cover_image'] ? 'DM_20220619014545_001.jpg' : req.files['cover_image'].filename)
                    .execute('sp_account_create')
                );
            }

            const result = spAccountCreate();
            res.json(result);

            // Display uploaded image for user validation
        });
    }

    // [POST] /update
    async update(req, res) {
        // 'avatar' is the name of our file input field in the HTML form
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            // else if (!req.file) {
            //     return res.send('Please select an image to upload');
            // }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            async function spAccountUpdate() {
                console.log(req.file);
                return await db.then(pool => pool.request()
                    .input('account', sql.VarChar(10), req.body.account)
                    .input('role_id', sql.Char(2), req.body.role)
                    .input('password', sql.VarChar(30), req.body.password)
                    .input('avatar', sql.VarChar(100), req.file == undefined ? '' : req.file.filename)
                    .input('full_name', sql.NVarChar(30), req.body.full_name)
                    .input('gender', sql.Bit, parseInt(req.body.gender))
                    .execute('sp_account_update')
                );
            }

            const result = spAccountUpdate();
            res.json(result);

            // Display uploaded image for user validation
        });
    }

    // [GET] /delete
    async delete(req, res) {
        const result = await db.then(pool => pool.request()
            .input('account', sql.VarChar(10), req.query.account)
            .execute('sp_account_delete')
        );
        res.json(result);
    }

    // [GET] /get-by-id
    async getByID(req, res) {
        const result = await db.then(pool => pool.request()
            .input('account', sql.VarChar(10), req.query.account)
            .execute('sp_account_get_by_id')
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

    // [POST] /search
    async search(req, res) {
        const result = await db.then(pool => pool.request()
            .input('account', sql.VarChar(10), req.body.account)
            .input('role_id', sql.Char(2), req.body.role)
            .input('full_name', sql.NVarChar(30), req.body.full_name)
            // .input('gender', sql.Bit, parseInt(req.body.gender))
            .input('gender', sql.Char(1), req.body.gender)
            .execute('sp_account_search')
        );
        res.json(result);
    }

}

module.exports = new AccountApiController;