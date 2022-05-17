const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const courseRouter = require('./course.route');
const studentRouter = require('./student.route');
const testRouter = require('./test.route');

function route(app) {
    // app.all('/', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next()
    //   });

    app.use('/test', testRouter);

    app.use('/student', studentRouter);

    app.use('/news', newsRouter);

    app.use('/course', courseRouter);

    app.use('/', siteRouter);
}

module.exports = route;