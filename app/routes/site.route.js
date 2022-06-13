const express = require('express');
const router = express.Router();

const siteController = require('../src/controllers/SiteController');

router.get('/', siteController.index);

router.get('/home', siteController.home);

router.get('/job', siteController.job);

router.get('/company', siteController.company);

router.get('/nmd', siteController.nmd); // nmd

module.exports = router;