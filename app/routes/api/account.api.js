const express = require('express');
const router = express.Router();

var multer = require('multer');
var upload = multer();

const accountApiController = require('../../src/controllers/api/AccountApiController');

// router.post('/create', upload.single('avatar'), accountApiController.create);

router.post('/create', accountApiController.create);

router.get('/get-all', accountApiController.getAll);

module.exports = router;