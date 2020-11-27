var express = require('express');
var router = express.Router();
var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
                res.render('index', { title: 'Express' });
        } else {
                next();
        }
};
/* GET home page. */
router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express' });
});

router.get('/destroy', function (req, res, next) {

        if (req.session) {
                // delete session object
                req.session.destroy(function (err) {
                        if (err) {
                                return next(err);
                        } else {
                                return res.render('index', { title: 'Express' });
                        }
                });
        }
        res.render('index', { title: 'Express' });
});

module.exports = router;
