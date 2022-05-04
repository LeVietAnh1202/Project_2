const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    index(req, res, next) {
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

        // Dùng Promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next); // .catch(error => next(error));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;