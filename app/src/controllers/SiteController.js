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
        res.sendFile(path.join(__dirname, '../../resources/view-csr/layouts/cms.html'))
        // res.sendFile()
    }

    // [GET] /search
    async search(req, res) {
        console.time('search get data')
        // var result1 = await db.then(pool => pool.request().query('select * from [user]'))
        var result1 = await db.then(pool => pool.request().query(`
            select mi.menu_item_name as [menu_name], submenu_item_name as [submenu_name]
            from side_bar_menu_item as mi left outer join side_bar_submenu_item as submenu_arr on(mi.menu_item_id = submenu_arr.menu_item_id)
            for json auto
            `))
        // let result1 = await db(pool => pool.request()
        //     // .input('input_parameter', sql.Int, value)
        //     // .query('select * from mytable where id = @input_parameter')
        //     .query('select * from [user]')
        // )

        console.timeEnd('search get data')
        res.json(result1.recordset[0]);
    }

}

module.exports = new SiteController;