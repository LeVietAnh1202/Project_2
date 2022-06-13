const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const db = require('../../config/db/sql');
const path = require('path');
const { log } = require('console');

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

    company(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/company.html'))
    }
    
    // nmd
    nmd(req, res, next) {
        res.sendFile(path.join(__dirname, '../../resources/view-csr/hh/nmd.html'))
    }
}

module.exports = new SiteController;