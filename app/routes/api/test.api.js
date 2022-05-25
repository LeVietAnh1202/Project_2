const express = require('express');
const router = express.Router();

const testApiController = require('../../src/controllers/api/TestApiController');

router.post('/send', testApiController.send);

router.get('/show', testApiController.show);

router.get('/', testApiController.index);

module.exports = router;