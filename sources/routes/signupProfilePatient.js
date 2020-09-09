const express = require('express');
const router = express.Router();
const modelSignupProfilePatient = require('../models/modelSignupProfilePatient');
// const modelPatientProfile = require('../models/modelPatientProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorSignupPatient = require('../controllers/validators/signupPatientValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/* GET Connexion page. */

router.get('/', async function(req, res) {
        // TODO : convert to Promesse
        try {
                const result = await ctrlRead.displayAllSignup(modelSignupProfilePatient.modelSignupProfilePatient);

                if (result.toString() == []) {
                        const msg = { msg: "There are no data.", result: result };

                        return res.status(200).send(msg);

                } else {
                        console.log(result);

                        return res.status(200).send(result)
                }
        } catch (err) {
                return res.status(500).send(err.stack)
        }

})

router.get('/signupPatientId', async function(req, res) {
        try {
                const result = await ctrlRead.findUserByID(modelSignupProfilePatient.modelSignupProfilePatient, req.body._id);

                if (result == null) {
                        const msg = { msg: "There are no data.", result: result };

                        return res.status(200).send(msg);

                } else {
                        return res.status(200).send(result);

                }
        } catch (err) {
                return res.status(500).send(err.stack);

        }

})

/* POST Connexion page. */

router.post('/create',
        [ctrlEValidatorSignupPatient.signupPatientIsValid()],
        async function(req, res) {
                try {
                        const resultModelsignupProfilePatient = new modelSignupProfilePatient.modelSignupProfilePatient(req.body);
                        const errorModelSignupProfilePatient = await resultModelsignupProfilePatient.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        // console.log("END DEBUG")
                        if (errorModelSignupProfilePatient === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log("TEST : " + resultModelsignupProfilePatient); //DEBUG
                                        await resultModelsignupProfilePatient.save();

                                        // const resultModelPatientProfile = new modelPatientProfile.modelPatientProfile(req.body);
                                        // await resultModelPatientProfile.save();
                                        // const token = await user.generateAuthToken()




                                        return res.status(200).send(resultModelsignupProfilePatient);
                        } else {
                                console.log(errorModelSignupProfilePatient);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelSignupProfilePatient, resultEValidatorHandlerError]);
                        }
                        // console.log(resultModelsignupProfilePatient); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }


        // try {
        //     const user = new userConnection(req.body)
        //     await user.save()
        //     const token = await user.generateAuthToken()
        //     console.log(user)
        //     res.status(201).send({ user})
        // } catch (error) {
        //     res.status(500).send(error)
        // }
})

/* DELETE Connexion page. */

router.delete('/delete', async function(req, res) {
        try {

                const result = await ctrlDelete.findUserAndDelete(modelSignupProfilePatient.modelSignupProfilePatient, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err.stack);
                // return res.status(500).send()
        }
})

/* UPDATE Connexion page. */

router.put('/update', async function(req, res) {
        try {
                const result = await ctrlUpdate.updateValueById(modelSignupProfilePatient.modelSignupProfilePatient, req.body._id, req.body);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err.stack);
                return res.status(500).send(err.stack);
                // return res.status(500).send()
        }
})

module.exports = router;
