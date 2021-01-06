const mongoose = require('mongoose');
const configDB = require('../configDB/configDB');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

// controller DB connection
const sessionDB = {
	db: {
		db: 'process.env.DATABASE_DB',
		name: 'sessionID',
		key: 'user_sid',
		host: '127.0.0.1/api/drSignin', // change for Heroku
		url: configDB.url_db,
		secret: 'Dont Panic, Its Organic!',
		maxAge: new Date(Date.now() + 3600000),
		resave: false,
  		saveUninitialized: true,
  		cookie: { secure: true }
	}
}

module.exports = {
	sessionDB
};
