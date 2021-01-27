const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongo = require('mongoose');

require('dotenv').config()

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const listRouter = require('./routes/list');

// CORS policies
const corsOptions = {
    origin: process.env.SITE_LINK,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongo.connect(process.env.MONGODB_LINK, {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongo.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/list', listRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.header("Access-Control-Allow-Origin", "http://localhost:19006"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
