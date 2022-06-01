const express = require('express');
const router = express.Router();

const accountApiController = require('../../src/controllers/api/AccountApiController');

router.post('/create', accountApiController.create);

router.get('/get-all', accountApiController.getAll);

module.exports = router;