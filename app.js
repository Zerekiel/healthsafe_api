const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require("cors");


const mongoClient = require('./sources/DB/db');
const sessionDB  = require('./sources/DB/configDB/configSessionDB');

const indexRouter = require('./sources/routes/index');
const usersRouter = require('./sources/routes/users');
const documentationRouter = require('./sources/routes/documentation');
const swaggerRouter = require('./sources/documentation/config/configDoc');

const drSignupRouter = require('./sources/routes/drSignup');
const drProfileRouter = require('./sources/routes/drProfile');
const drSigninRouter = require('./sources/routes/drSignin');

const patientSignupRouter = require('./sources/routes/patientSignup');
const patientProfileRouter = require('./sources/routes/patientProfile');
const patientSigninRouter = require('./sources/routes/patientSignin');
const patientDataRouter = require('./sources/routes/patientData');

const logoutRouter = require('./sources/routes/logout');

// Mobile routes to send/read data on the chip
const sendToChipRouter = require('./sources/routes/sendToChip');
const readFromChipRouter = require('./sources/routes/readFromChip');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './sources/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        key: sessionDB.sessionDB.db.key,
        secret: sessionDB.sessionDB.db.secret,
        name: sessionDB.sessionDB.db.name,
        maxAge: sessionDB.sessionDB.db.maxAge,
        resave: sessionDB.sessionDB.db.resave,
        saveUninitialized: sessionDB.sessionDB.db.saveUninitialized,
        cookie: { secure: false, maxAge: 60000 },
        store: new MongoStore(sessionDB.sessionDB.db)
}));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', documentationRouter);

app.use('/api/drSignup', drSignupRouter);
app.use('/api/drProfile', drProfileRouter);
app.use('/api/drSignin', drSigninRouter);

app.use('/api/patientSignup', patientSignupRouter);
app.use('/api/patientProfile', patientProfileRouter);
app.use('/api/patientData', patientDataRouter);
app.use('/api/patientSignin', patientSigninRouter);

app.use('/api/sendToChip', sendToChipRouter);
app.use('/api/readFromChip', readFromChipRouter);

app.use('/api/logout', logoutRouter);

app.use('/swagger.json', swaggerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
