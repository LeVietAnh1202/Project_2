// const newsRouter = require('./api/news.route');
const loginApiRouter = require('./api/login.api');
const accountApiRouter = require('./api/account.api');
const siteApiRouter = require('./api/site.api');
const courseApiRouter = require('./api/course.api');
const companyApiRouter = require('./api/company.api');
const studentApiRouter = require('./api/student.api');
const lecturerApiRouter = require('./api/lecturer.api');
const testApiRouter = require('./api/test.api');

const siteRouter = require('./site.route');
const multer = require('multer');
const path = require('path')

function route(app) {
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, './app/public/img/');
    //     },

    //     // By default, multer removes file extensions so let's add them back
    //     filename: function (req, file, cb) {
    //         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    //     }
    // });

    // app.post('/api/upload-file', (req, res) => {
    //     const imageFilter = function (req, file, cb) {
    //         // Accept images only
    //         if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //             req.fileValidationError = 'Only image files are allowed!';
    //             return cb(new Error('Only image files are allowed!'), false);
    //         }
    //         cb(null, true);
    //     };

    //     // 'avatar' is the name of our file input field in the HTML form
    //     let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

    //     upload(req, res, function (err) {
    //         // req.file contains information of uploaded file
    //         // req.body contains information of text fields, if there were any
    //         // console.log(req)
    //         console.log(req.file)
    //         if (req.fileValidationError) {
    //             return res.send(req.fileValidationError);
    //         }
    //         else if (!req.file) {
    //             return res.send('Please select an image to upload');
    //         }
    //         else if (err instanceof multer.MulterError) {
    //             return res.send(err);
    //         }
    //         else if (err) {
    //             return res.send(err);
    //         }

    //         // Display uploaded image for user validation
    //         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    //     });
    // })

    app.use('/api/login', loginApiRouter);

    app.use('/api/account', accountApiRouter);

    app.use('/api/company', companyApiRouter);

    app.use('/api/test', testApiRouter);

    app.use('/api/student', studentApiRouter);

    app.use('/api/lecturer', lecturerApiRouter);

    // app.use('/api/news', newsApiRouter);

    app.use('/api/course', courseApiRouter);

    app.use('/api', siteApiRouter);

    app.use('/', siteRouter);
}

module.exports = route;