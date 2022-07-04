const express = require('express');
const router = express.Router();

var multer = require('multer');
var upload = multer();

const accountApiController = require('../../src/controllers/api/AccountApiController');

// router.post('/create', upload.single('avatar'), accountApiController.create);

router.post('/create', accountApiController.create);

router.post('/update', accountApiController.update);

router.get('/delete', accountApiController.delete);

router.get('/get-by-id', accountApiController.getByID);

router.get('/get-all', accountApiController.getAll);

router.post('/search', accountApiController.search);

module.exports = router;