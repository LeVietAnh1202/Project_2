const path = require('path');

const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const cors = require('cors');

const route = require('./routes/index.route');
// const db = require('./config/db');
const db = require('./config/db/mg');

// Connect to DB
// db.connect();

const app = express();
const port = process.env.port | 1202;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'node_modules', 'popper.js', 'dist')));
app.use(express.static(path.join(__dirname, 'resources', 'view-csr')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(cors());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));