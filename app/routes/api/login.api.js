const express = require('express');
const router = express.Router();

const loginApiController = require('../../src/controllers/api/LoginApiController');

router.post('/', loginApiController.login);

router.get('/get-account', loginApiController.getAccount);

module.exports = router;