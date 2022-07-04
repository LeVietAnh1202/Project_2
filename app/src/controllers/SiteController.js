const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const db = require('../../config/db/sql');
const path = require('path');
// const { log } = require('console');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // handlebars
        // Dùng CallBack Function
        //
        // Course.find({}, function (err, courses) {
        //     if(!err) {
        //         courses => {
        //             res.render('home', {
        //                 courses: multipleMongooseToObject(courses)
        //             });
        //         }
        //     }
        //     else
        //         next(err);
        // });

        // // Dùng Promise
        // Course.find({})
        //     .then(courses => {
        //         res.render('home', {
        //             courses: multipleMongooseToObject(courses)
        //         });
        //     })
        //     .catch(next); // .catch(error => next(error));

        // csr
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/login.html'))
    }
    
    home(req, res, next) {
        // const url = req.protocol + '://' + req.get('host') + req.originalUrl
        // if(req.headers.referer == req.protocol + '://' + req.get('host') + '/' || req.headers.referer == req.protocol + '://' + req.get('host') + '/home') {
            res.sendFile(path.join(__dirname, '../../resources/view-csr/layouts/cms.html'))
        // }
        // else
        //     res.send('Fail')
    }
    
    job(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/sign-up-internship.html'))
    }
    
    lecturer(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/lecturer.html'))
    }
    
    jobRecruitment(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/recruitment.html'))
    }

    companyList(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/company-list.html'))
    }

    company_w2solution(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/company-w2solution.html'))
    }

    company_bkav(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/company-bkav.html'))
    }

    profile(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/profile.html'))
    }

    recruitment(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/recruitment.html'))
    }
    
    // nmd
    nmd(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/hh/nmd.html'))
    }
}

module.exports = new SiteController;