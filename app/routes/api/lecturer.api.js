const express = require('express');
const router = express.Router();

const lecturerApiController = require('../../src/controllers/api/LecturerApiController');

// router.post('/create', lecturerApiController.create);

router.post('/update', lecturerApiController.update);

router.get('/delete', lecturerApiController.delete);

router.get('/get-all', lecturerApiController.getAll);

router.get('/get-by-id', lecturerApiController.getByID);

router.get('/get-by-account-id', lecturerApiController.getByAccountID);

router.post('/search', lecturerApiController.search);

module.exports = router;