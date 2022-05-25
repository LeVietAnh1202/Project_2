const express = require('express');
const router = express.Router();

const studentApiController = require('../../src/controllers/api/StudentApiController');

router.get('/get-all', studentApiController.getAll);

router.get('/', studentApiController.index);

module.exports = router;