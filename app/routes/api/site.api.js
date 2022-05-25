const express = require('express');
const router = express.Router();

const siteApiController = require('../../src/controllers/api/SiteApiController');

router.get('/sidebar', siteApiController.sidebar);

module.exports = router;