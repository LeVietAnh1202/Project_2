const express = require('express');
const router = express.Router();

const companyApiController = require('../../src/controllers/api/CompanyApiController');

router.post('/create', companyApiController.create);

router.get('/get-all', companyApiController.getAll);

module.exports = router;