// const newsRouter = require('./api/news.route');
const loginApiRouter = require('./api/login.api');
const accountApiRouter = require('./api/account.api');
const siteApiRouter = require('./api/site.api');
const courseApiRouter = require('./api/course.api');
const studentApiRouter = require('./api/student.api');
const testApiRouter = require('./api/test.api');

const siteRouter = require('./site.route');

function route(app) {
    // app.all('/', function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next()
    //   });

    app.use('/api/login', loginApiRouter);

    app.use('/api/account', accountApiRouter);

    app.use('/api/test', testApiRouter);

    app.use('/api/student', studentApiRouter);

    // app.use('/api/news', newsApiRouter);

    app.use('/api/course', courseApiRouter);

    app.use('/api', siteApiRouter);

    app.use('/', siteRouter);
}

module.exports = route;