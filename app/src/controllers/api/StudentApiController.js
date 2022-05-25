const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');

class StudentController {
    // [GET] /
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

    // [GET] /get-all
    async getAll(req, res) {
        var result1 = await db.then(pool => pool.request().query('select * from sinh_vien'));
        console.log(result1.recordset)
        // let result1 = await db(pool => pool.request()
        //     // .input('input_parameter', sql.Int, value)
        //     // .query('select * from mytable where id = @input_parameter')
        //     .query('select * from [user]')
        // )
        console.log(typeof(result1.recordset[0].ngay_sinh))
        res.json(result1.recordset);
    }

}

module.exports = new StudentController;