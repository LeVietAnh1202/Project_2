const express = require('express');
const router = express.Router();

const testController = require('../src/controllers/TestController');

router.get('/show', testController.show);

router.get('/', testController.index);

module.exports = router;