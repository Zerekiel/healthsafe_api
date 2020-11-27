const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
        try {
                res.send('respond with a resource');
        } catch(err) {
                res.send(err.stack);
        }
});

module.exports = router;
