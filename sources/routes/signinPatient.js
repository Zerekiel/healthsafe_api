const express = require('express');
const router = express.Router();
const modelSignupPatient = require('../models/modelSignupPatient');
const modelSigninPatient = require('../models/modelSigninPatient');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorSigninPatient = require('../controllers/validators/signinPatientValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');
const ctrlTools = require('../controllers/tools/ctrlTools');

/* GET */

router.get('/', function(req, res) {
        return new Promise((resolve, reject) => {
                ctrlRead.findAllData(modelSigninPatient.modelSigninPatient)
                         .then(result => {
                                 // console.log(result); // DEBUG
                                 if (result == '[]') {
                                         const msg = { msg: "Success but no Data in DB.", result: result };
                                         return res.status(202).send(msg)

                                 } else {

                                         return resolve(res.status(200).send(result));
                                 }
                        })
                        .catch(err => {
                                console.log(err);
                                return reject(res.status(500).send(err.stack));
                        });
                })
});

router.get('/signinPatientId', async function(req, res) {
        const result = await ctrlRead.findUserByID(modelSigninPatient.modelSigninPatient, req.body._id)
                                        .then(result => {

                                                if (result == null) {
                                                        const msg = { msg: "There are no data.", result: result };
                                                        return res.status(200).send(msg);

                                                } else {
                                                        return res.status(200).send(result);
                                                        // return res.status(200).send({
                                                        //         id: result._id,
                                                        //         token: result.tokens[0].token
                                                        // });

                                                }
                                                return res.status(200).send(result);
                                       })
                                       .catch(err => {
                                               console.log(err);
                                               return res.status(500).send(err.stack);
                                       });
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
 *             $ref: '#/definitions/modelSigninPatientRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/modelSigninPatientResponse'
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

router.post('/',
                // [ctrlEValidatorSigninPatient.signinPatientIsValid()],
                async(req, res) => {
        //Login a registered user
        try {
              const {email, password} = req.body
              const resultModelSignupPatient = new modelSignupPatient.modelSignupPatient(req.body);
              const resultModelSigninPatient = new modelSigninPatient.modelSigninPatient(req.body);

              const errorModelSigninPatient = await resultModelSigninPatient.validateSync();

              const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

              if (errorModelSigninPatient === undefined &&
                      JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                             const resultModelSigninPatient2 = await modelSigninPatient.modelSigninPatient.findByCredentials(email, password)
                              if (!resultModelSigninPatient2) {
                                  return res.status(400).send({error: 'Login failed! Check authentication credentials'})
                              }
                              const token = await resultModelSigninPatient.generateAuthToken()

                              return res.status(200).send({ id: resultModelSigninPatient._id, token });

              } else {
                      console.log(errorModelSigninPatient);
                      console.log(resultEValidatorHandlerError);
                      return res.status(500).send([errorModelSigninPatient, resultEValidatorHandlerError]);
              }




        } catch (error) {
          res.status(500).send(error.stack)
        }
})

router.post('/create', [ctrlEValidatorSigninPatient.signinPatientIsValid()], async (req, res) => {
       // Create a new user
       try {

               const resultModelSigninPatient = new modelSigninPatient.modelSigninPatient(req.body);
               const resultModelSignupPatient = new modelSignupPatient.modelSignupPatient(req.body);
               const errorModelSigninPatient = await resultModelSigninPatient.validateSync();
               const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

               if (errorModelSigninPatient === undefined &&
                       JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                               // await ctrlTools.sameAccount(modelSignupPatient.modelSignupPatient, req.body);
                               // console.log("DEBUG signin : " +resultModelSigninPatient); //DEBUG
                               await resultModelSigninPatient.save(resultModelSignupPatient)
                               const token = await resultModelSigninPatient.generateAuthToken()


                               return res.status(200).send({ id: resultModelSigninPatient._id, token });
               } else {
                       console.log(errorModelSigninPatient);
                       console.log(resultEValidatorHandlerError);
                       return res.status(500).send([errorModelSigninPatient, resultEValidatorHandlerError]);
               }



   } catch (error) {
           console.log(error.stack)
           res.status(500).send(error.stack)
       }
})

/* DELETE */

router.delete('/delete', async function(req, res) {
        try {

                const result = await ctrlDelete.findUserAndDelete(modelSigninPatient.modelSigninPatient, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})

/* UPDATE */

router.put('/update', async function(req, res) {
        try {
                const resultModelSigninPatient = new modelSigninPatient.modelSigninPatient(req.body);
                const errorModelSignin = await resultModelSigninPatient.validateSync();
                const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);
                if (errorModelSignin === undefined &&
                        JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                // console.log(resultModelSigninPatient); //DEBUG
                                console.log(resultEValidatorHandlerError.errors); //// DEBUG
                        const updateResult = await ctrlUpdate.updateValueById(modelSigninPatient.modelSigninPatient, req.body._id, req.body);

                        return res.status(200).send(updateResult);
                } else {
                        console.log(errorModelSignin);

                        console.log(resultEValidatorHandlerError);
                        return res.status(500).send([errorModelSignin, resultEValidatorHandlerError]);
                }
        } catch (err) {
                console.log(err);
                return res.status(500).send(err.stack);
                // return res.status(500).send()
        }

})

module.exports = router;
