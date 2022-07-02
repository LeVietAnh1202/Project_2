const express = require('express');
const router = express.Router();

const siteController = require('../src/controllers/SiteController');

router.get('/', siteController.index);

router.get('/home', siteController.home);

router.get('/job', siteController.job);

router.get('/lecturer', siteController.lecturer);

router.get('/job/recruitment', siteController.jobRecruitment);

router.get('/company-list', siteController.companyList);

router.get('/company-list/company-w2solution', siteController.company_w2solution);

router.get('/company-list/company-bkav', siteController.company_bkav);

router.get('/profile', siteController.profile);

router.get('/recruitment', siteController.recruitment);

router.get('/nmd', siteController.nmd); // nmd

module.exports = router;