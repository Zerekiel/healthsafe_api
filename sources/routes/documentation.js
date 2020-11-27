const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

        try
        {
                res.status(200);
                return res.render('redoc');
        }
        catch(err)
        {
                return res.status(500).send(err.stack);
        }

});

module.exports = router;
