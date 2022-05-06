const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                // res.render('home', {
                //     courses: multipleMongooseToObject(courses)
                // });
                res.json(courses);
            })
            .catch(next); // .catch(error => next(error));
    }

    // // [GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new CourseController;