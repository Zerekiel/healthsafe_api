const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');

// const setSessionId = (req, user) => {
// 	// console.log("SESSION "+(JSON.stringify(req, null, 2)))
//         // console.log("SESSION "+(JSON.stringify(req.session, null, 2)))
// 	// console.log("SESSION "+(JSON.stringify(req.sessionID, null, 2)))
//
//         if (req.session.user && req.cookies.user_sid) {
//                 console.log("TEST "+req.session.user)
//                 // var sid = req.sessionID;
//                 // user.update({$set:{"session" : sid}});
//                 // await user.save();
// 		return ok;
//                 // res.render('index', { title: 'Express' });
//         } else {
// 		return ;
// 	}
//         // user.update({_id: result._id}, {$set:{"session" : sid}});
// }

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
