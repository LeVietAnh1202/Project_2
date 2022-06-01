const express = require('express');
const router = express.Router();

const siteController = require('../src/controllers/SiteController');

router.get('/', siteController.index);

router.get('/home', siteController.home);

module.exports = router;