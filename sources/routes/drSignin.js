const express = require('express');
const router = express.Router();
const modelDrSignup = require('../models/modelDrSignup');
const modelDrSignin = require('../models/modelDrSignin');
const ctrlRead = require('../controllers/ctrlRead');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');
const ctrlEValidatorSignin = require('../validators/ctrlEValidatorSignin');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlTools = require('../controllers/ctrlTools');
const mongodb = require('mongodb');

/* GET */

router.get('/', function(req, res) {
        return new Promise((resolve, reject) => {
                ctrlRead.findAllData(modelDrSignin.modelDrSignin)
                         .then(result => {
                                 if (JSON.stringify(result) == '[]') {
                                         const msg = { msg: "Success but no Data in DB.", result: result };
                                         return res.status(204).send(msg)

                                 } else {
                                         return resolve(res.status(200).send(result));
                                 }
                        })
                        .catch(err => {
                                return reject(res.status(500).send(err.stack));
                        });
                })
});

router.get('/drSigninId', async function(req, res) {
        try {
                const result = await ctrlRead.findUserByID(modelDrSignin.modelDrSignin, req.body._id)
                if (JSON.stringify(result) == '[]') {
                        const msg = { msg: "There are no data.", result: result };
                        return res.status(204).send(msg);

                } else {
                        return res.status(200).send(result);
                }
        } catch (err) {
                return res.status(500).send(err.stack);
        }
})

// GET FOR MOBILE
router.post('/drSigninId', async function(req, res) {
        try {
                const result = await ctrlRead.findUserByID(modelDrSignin.modelDrSignin, req.body._id)
                if (JSON.stringify(result) == '[]') {
                        const msg = { msg: "There are no data.", result: result };
                        return res.status(204).send(msg);

                } else {
                        return res.status(200).send(result);
                }
        } catch (err) {
                return res.status(500).send(err.stack);
        }
})
/**
 *
 * /api/signin/me:
 *   get:
 *     summary: Receive a JSON user and seach if the user exist.
 *     description: Return JSON exist or not.
 *     requestBody:
 *       description: Need Token Bearer for the authorization.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelDrSigninRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/modelDrSigninResponse'
 *             example:
 *               email: OldBoy
 *               password: password
 *               token:
 *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
 *                 - []
 *       500:
 *         description: ERROR
 */
// router.get('/me', auth, async(req, res) => {
//
//     // View logged in user profile
//     res.status(200).send({user: req.user, isConnected: "true"})
// })

/* POST */

router.post('/', /*[ctrlEValidatorSignin.signinIsValid()],*/ async(req, res) => {
        //Login a registered user
        try {
              const {email, password} = req.body
            const resultModelSignin = new modelDrSignin.modelDrSignin(req.body);
            const errormodelDrSignin = await resultModelSignin.validateSync();
            const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);
	    console.log(errormodelDrSignin);
	    	    console.log(resultEValidatorHandlerError.errors);
              if (errormodelDrSignin === undefined &&
                  JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                  const resultModelSignin2 = await modelDrSignin.modelDrSignin.findByCredentials(email, password);
                             if (resultModelSignin2.error){
                                     return res.status(204).end();
                             }
                              if (!resultModelSignin2) {
                                  return res.status(400).send({error: 'Login failed! Check authentication credentials'})
                              }

                  const token = await resultModelSignin2.generateAuthToken();
		  	    console.log("EEE");
                              var myQuery = { _id: new mongodb.ObjectId(req.body._id) };
                              const dataToChange = {sessions: [{
                          	    sessionId: req.sessionID
                              }]};
                  const result = await ctrlUpdate.updateValueByEmail(modelDrSignin.modelDrSignin, req.body.email, dataToChange)
		  	    console.log("FFF");
                              return res.status(200).send({ id: resultModelSignin2._id, token, sessionID: result[0].sessions[0].sessionId}); //, session: result.sessions.sessionId
              } else {
                      return res.status(500).send([errormodelDrSignin, resultEValidatorHandlerError]);
              }




        } catch (error) {
          return res.status(500).send(error.stack)
        }
})


/* DELETE */

router.delete('/delete', async function(req, res) {
        try {
                const result = await ctrlDelete.findUserAndDelete(modelDrSignin.modelDrSignin, req.body._id);
                if (result.result === '[]') {
                        return res.status(204).end();
                } else {
                        return res.status(200).send(result);
                }

        } catch (err) {
                return res.status(500).send(err.stack);
        }
})

/* UPDATE */

router.put('/update', async function(req, res) {
        try {
                if (!req.body._id) {
                        return res.status(202).send("NO ID IN BODY");
                } else {
                        const result = await ctrlUpdate.updateValueById(modelDrSignin.modelDrSignin, req.body._id, req.body);
                        return res.status(200).send(result);
                }

        } catch (err) {
                return res.status(500).send(err.stack);
        }
})

module.exports = router;
