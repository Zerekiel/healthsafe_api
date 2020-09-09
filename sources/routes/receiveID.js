var express = require('express');
var router = express.Router();
const modelId = require('../models/modelID');
const ctrlRead = require('../controllers/read/ctrlRead');
const request = require('request')
const https = require('https')

// import { request } from 'request';

// Retriving in ID DB and send the result
router.get('/sendID', async (req, res) => {

        const resultID = await ctrlRead.findUserByID(modelId.modelId, req.body._id)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                if (result == '[]') {
                                                        return resolve(res.status(202).send(result));

                                                } else {

                                                        const data = JSON.stringify(result);

                                                        var options = {
                                                          protocol:'https:',
                                                          host: 'localhost',
                                                          port: 5000,
                                                          path: '/',
                                                          method:'GET',
                                                          secure:false

                                                        };

                                                        // const options = {
                                                        //   hostname: 'https://   localhost:3000',
                                                        //   port: 3000,
                                                        //   path: '/'
                                                        //   // method: 'GET',
                                                        //   // headers: {
                                                        //   //   'Content-Type': 'application/json',
                                                        //   //   'Content-Length': data.length
                                                        //
                                                        //   // }
                                                        // }
                                                        console.log("1");
                                                        req = https.request(options, res => {
                                                                console.log("2");

                                                          res.on('data', d => {
                                                                  console.log("D = "+d)
                                                            // process.stdout.write(d)
                                                            return res.status(200).send(d);
                                                          })
                                                        })

                                                        req.on('error', error => {
                                                          console.error(error)
                                                        })

                                                        // req.write(data)
                                                        // // req.write(result)
                                                        //
                                                        // req.end()

                                                        return res.status(200).send(result);


                                                }
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });








        });


// Receive and put in DB
router.post('/', async (req, res, next) => {

        const resultModelID = new modelId.modelId(req.body);
        console.log(resultModelID);
        await resultModelID.save();

        res.status(200).send(resultModelID);


});

module.exports = router;
