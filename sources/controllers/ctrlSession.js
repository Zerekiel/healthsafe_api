const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');

const sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
                res.render('index', { title: 'Express' });
        } else {
                next();
        }
};

module.exports = {
	// setSessionId
}
