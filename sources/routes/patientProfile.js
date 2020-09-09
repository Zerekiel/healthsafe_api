const express = require('express');
const router = express.Router();
const modelPatientProfile = require('../models/modelPatientProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorPatientProfile = require('../controllers/validators/patientProfileValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/* GET Connexion page. */

router.get('/', async function(req, res) {
        //
        const result = await ctrlRead.findAllData(modelPatientProfile.modelPatientProfile)
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
})

router.get('/patientProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelPatientProfile.modelPatientProfile, req.body._id)
        return res.status(200).send(result);

})

/* POST Connexion page. */

router.post('/patientProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelPatientProfile.modelPatientProfile, req.body._id)
        return res.status(200).send(result);

})

router.post('/create',
        [ctrlEValidatorPatientProfile.patientProfileIsValid()],
        async function(req, res) {
                try {
                        const resultmodelPatientProfile = new modelPatientProfile.modelPatientProfile(req.body);
                        const errormodelPatientProfile = await resultmodelPatientProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errormodelPatientProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultmodelPatientProfile); //DEBUG
                                await resultmodelPatientProfile.save();
                                return res.status(200).send(resultmodelPatientProfile);
                        } else {
                                console.log(errormodelPatientProfile);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errormodelPatientProfile, resultEValidatorHandlerError]);
                        }
                        // console.log(resultmodelPatientProfile); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).end();
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

                const result = await ctrlDelete.findUserAndDelete(modelPatientProfile.modelPatientProfile, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})

/* UPDATE Connexion page. */

router.put('/update',
        [ctrlEValidatorPatientProfile.patientProfileIsValidPUT()],
        async function(req, res) {

                try {
                        const resultModelDrProfile = new modelPatientProfile.modelPatientProfile(req.body);
                        const errorModelDrProfile = await resultModelDrProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelDrProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelDrProfile); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelPatientProfile.modelPatientProfile, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelDrProfile);
                                console.log("FFF");

                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelDrProfile, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }
})

module.exports = router;
