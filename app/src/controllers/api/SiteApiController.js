const Course = require('../../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const db = require('../../../config/db/sql');
const sql = require('mssql');
const path = require('path');

class SiteApiController {
    // [GET] /sidebar
    async sidebar(req, res) {
        console.time('Get all sidebar')
        var result1 = await db.then(pool => pool.request()
            // .query(`
            // select mi.menu_item_name as [menu_name], submenu_item_name as [submenu_name]
            // from side_bar_menu_item as mi left outer join side_bar_submenu_item as submenu_arr on(mi.menu_item_id = submenu_arr.menu_item_id)
            // for json auto
            // `)
            .input('page_name', sql.VarChar(50), req.query.page_name)
            .execute('sp_sidebar_get_all')
            )
        // let result1 = await db(pool => pool.request()
        //     // .input('input_parameter', sql.Int, value)
        //     // .query('select * from mytable where id = @input_parameter')
        //     .query('select * from [user]')
        // )

        console.timeEnd('Get all sidebar')
        res.json(result1.recordset[0]);
    }

}

module.exports = new SiteApiController;