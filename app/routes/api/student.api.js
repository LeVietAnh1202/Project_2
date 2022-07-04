const express = require('express');
const router = express.Router();

const studentApiController = require('../../src/controllers/api/StudentApiController');

// router.post('/create', studentApiController.create);

router.post('/update', studentApiController.update);

router.get('/delete', studentApiController.delete);

router.get('/get-all', studentApiController.getAll);

router.get('/get-by-id', studentApiController.getByID);

router.get('/get-by-account-id', studentApiController.getByAccountID);

router.post('/search', studentApiController.search);

module.exports = router;