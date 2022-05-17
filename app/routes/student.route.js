const express = require('express');
const router = express.Router();

const studentController = require('../src/controllers/StudentController');

router.get('/get-all', studentController.getAll);

router.get('/', studentController.index);

module.exports = router;