const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const db = require('../../config/db/sql');
const path = require('path');

class SiteController {
    // [GET] /home
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
        // res.sendFile(path.join(__dirname, '../../resources/view-csr/layouts/cms.html'))
        res.sendFile(path.join(__dirname, '../../resources/view-csr/partials/login.html'))
    }

}

module.exports = new SiteController;