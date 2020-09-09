var express = require('express');
var router = express.Router();
const modelTest = require('../models/testmodel');
const ctrlRead = require('../controllers/read/ctrlRead');


// Retriving the image
router.get('/', async (req, res) => {
        const result = await ctrlRead.findAllData(modelTest.modelTest)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                if (result == '[]') {
                                                        return resolve(res.status(202).send(result));

                                                } else {
                                                        return res.status(200).send(result);
                                                }
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });
});

// Uploading the image
router.post('/', async (req, res, next) => {

        const resultModelTest = new modelTest.modelTest(req.body);
        console.log(resultModelTest);
        resultModelTest.map = new Map([['key', req.body.map]]);
        await resultModelTest.save();
        await resultModelTest.hysto3.push("TEST PUSH");
        await resultModelTest.hysto4.push("TEST PUSH");
        await resultModelTest.hysto6.push("TEST PUSH");
        // await resultModelTest.map.push("TEST PUSH");
        await resultModelTest.save();

        res.status(200).send(resultModelTest);


});

module.exports = router;
