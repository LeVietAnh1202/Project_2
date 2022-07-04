const express = require('express');
const router = express.Router();

const companyApiController = require('../../src/controllers/api/CompanyApiController');

router.post('/create', companyApiController.create);

router.post('/update', companyApiController.update);

router.get('/delete', companyApiController.delete);

router.get('/get-all', companyApiController.getAll);

router.get('/get-by-id', companyApiController.getByID);

router.post('/search', companyApiController.search);

module.exports = router;