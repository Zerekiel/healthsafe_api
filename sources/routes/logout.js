var express = require('express');
var router = express.Router();
var auth_v2 = require('../controllers/ctrlAuthentification').auth_v2;

require('util').inspect.defaultOptions.depth = null

router.post('/', auth_v2, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        req.user.sessions = req.user.sessions.filter((sessionId) => {
            return sessionId.sessionId != req.sessionID;
        })
        req.user.sessions.splice(0, req.user.sessions.length);
        await req.user.save()
        res.status(200).send({ message: "USER LOGOUT", user: req.user })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutall', auth_v2, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        req.session.destroy(function (err) {
            if (err) {
                return err.stack;
            }
        })
        req.user.sessions.splice(0, req.user.sessions.length);
        await req.user.save()
        return res.status(200).send({ message: "USER LOGOUT", isConnected: false, user: req.user })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
