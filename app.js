var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const fs = require('fs');


const MongoClient = require('./db/db.js');

const indexRouter = require('./sources/routes/index');
const swaggerRouter = require('./sources/documentation/config/configDoc');
const documentationRouter = require('./sources/routes/documentation');
const signupRouter = require('./sources/routes/signUp');
const patientDataRouter = require('./sources/routes/patientData');
const drProfileRouter = require('./sources/routes/drProfile');
const signinRouter = require('./sources/routes/signin');
const logoutRouter = require('./sources/routes/logOut');
const signupPatientRouter = require('./sources/routes/signupPatient');
const signinPatientRouter = require('./sources/routes/signinPatient');
const patientProfileRouter = require('./sources/routes/patientProfile');

const imageRouter = require('./sources/routes/image');
const testRouter = require('./sources/routes/test');
const receiveIdRouter = require('./sources/routes/receiveID');
const signupProfileRouter = require('./sources/routes/signupProfile');
const signupProfilePatientRouter = require('./sources/routes/signupProfilePatient');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'sources/views'));
app.set('view engine', 'ejs');


//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'sources/public')));

app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(expressValidator());


// routes
app.use('/', indexRouter);
app.use('/api', documentationRouter);
app.use('/api/signup', signupRouter);
app.use('/api/patientData', patientDataRouter);
app.use('/api/drProfile', drProfileRouter);
app.use('/api/signin', signinRouter);
app.use('/api/logOut', logoutRouter);
app.use('/api/signupPatient', signupPatientRouter);
app.use('/api/signinPatient', signinPatientRouter);
app.use('/api/patientProfile', patientProfileRouter);

//// TEST /////////////////////////////////////////////////////////////////////
app.use('/api/image', imageRouter);
app.use('/api/test', testRouter);
app.use('/api/receiveID', receiveIdRouter);
app.use('/api/signupProfile', signupProfileRouter);
app.use('/api/signupProfilePatient', signupProfilePatientRouter);

///////////////////////////////////////////////////////////////////////////////
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
