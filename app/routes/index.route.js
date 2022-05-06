const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const courseRouter = require('./course.route');

function route(app) {
    // app.all('/', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next()
    //   });

    app.use('/news', newsRouter);

    app.use('/course', courseRouter);

    app.use('/', siteRouter);
}

module.exports = route;