const express = require('express');
const router = express.Router();

const courseApiController = require('../../src/controllers/api/CourseApiController');

// router.get('/search', courseController.search);

router.get('/', courseApiController.index);

module.exports = router;