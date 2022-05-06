const express = require('express');
const router = express.Router();

const courseController = require('../src/controllers/CourseController');

// router.get('/search', courseController.search);

router.get('/', courseController.index);

module.exports = router;