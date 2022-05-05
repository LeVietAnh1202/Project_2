const express = require('express');
const router = express.Router();

const siteController = require('../src/controllers/SiteController');

router.get('/search', siteController.search);

router.get('/', siteController.index);

module.exports = router;