const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const path = require('path');

class TestController {
    // [GET] /
    index(req, res, next) {
        // Dùng Promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next); // .catch(error => next(error));
    }

    // [GET] /get-all
    show(req, res, next) {
        // res.send(path.join(__dirname, '../../../../Front-end/resources/views/test.html'));
        res.sendFile(path.join(__dirname, '../../../../Front-end/resources/views/test.html'));
    }

    // [POST] /send
    send(req, res, next) {
        res.send(req.body);
    }

}

module.exports = new TestController;