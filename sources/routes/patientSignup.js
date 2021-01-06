var express = require('express');
var router = express.Router();

const modelPatientSecuSignup = require('../models/modelPatientSecuSignup');
const modelPatientSecuProfile = require('../models/modelPatientSecuProfile');
const modelPatientSignin = require('../models/modelPatientSignin');
const modelPatientData = require('../models/modelPatientData');

const ctrlRead = require('../controllers/ctrlRead');
const ctrlEValidatorPatientSignup = require('../validators/ctrlEValidatorPatientSignup');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');

const sha3_512 = require('js-sha3').sha3_512;
const sha3_384 = require('js-sha3').sha3_384;
const secu = require('./secu');

/* GET user Register listing. */
router.get('/', async function (req, res, next) {
    try {
        const result = await ctrlRead.findAllData(modelPatientSecuSignup.modelPatientSecuSignup);
        if (JSON.stringify(result) == '[]') {
            return res.status(204).end();

        } else {
            return res.status(200).send(result);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

router.get('/patientSignupId', async function (req, res) {
    try {

        const result = await ctrlRead.findUserByID(modelPatientSecuSignup.modelPatientSecuSignup, req.body._id)
        if (JSON.stringify(result) == "[]") {
            return res.status(204).end();
        } else {
            var social = secu.unshuffle(result[0].socialNumber);
            var resu = {
                firstName: secu.decrypt(result[0].firstName, social),
                lastName: secu.decrypt(result[0].lastName, social),
                birthDay: secu.decrypt(result[0].birthDay, social),
                age: parseInt(secu.decrypt(result[0].age, social), 10),
                phoneNumber: secu.decrypt(result[0].phoneNumber, social),
                address: [
                    {
                        streetNumber: parseInt(secu.decrypt(result[0].address[0].streetNumber, social), 10),
                        typeStreetNumber: secu.decrypt(result[0].address[0].typeStreetNumber, social),
                        typeStreet: secu.decrypt(result[0].address[0].typeStreet, social),
                        street: secu.decrypt(result[0].address[0].street, social),
                        zipCode: parseInt(secu.decrypt(result[0].address[0].zipCode, social), 10),
                        city: secu.decrypt(result[0].address[0].city, social),
                        country: secu.decrypt(result[0].address[0].country, social)
                    }
                ],
                email: secu.decrypt(result[0].email, social),
                password: result[0].password,
                confirmationPassword: result[0].confirmationPassword,
                socialNumber: social
            }
            return res.status(200).send(resu);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

//GET FOR MOBILE
router.post('/patientSignupId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelPatientSecuSignup.modelPatientSecuSignup, req.body._id)
        if (JSON.stringify(result) == "[]") {
            return res.status(204).end();
        } else {
            var social = secu.unshuffle(result[0].socialNumber);
            var resu = {
                firstName: secu.decrypt(result[0].firstName, social),
                lastName: secu.decrypt(result[0].lastName, social),
                birthDay: secu.decrypt(result[0].birthDay, social),
                age: parseInt(secu.decrypt(result[0].age, social), 10),
                phoneNumber: secu.decrypt(result[0].phoneNumber, social),
                address: [
                    {
                        streetNumber: parseInt(secu.decrypt(result[0].address[0].streetNumber, social), 10),
                        typeStreetNumber: secu.decrypt(result[0].address[0].typeStreetNumber, social),
                        typeStreet: secu.decrypt(result[0].address[0].typeStreet, social),
                        street: secu.decrypt(result[0].address[0].street, social),
                        zipCode: parseInt(secu.decrypt(result[0].address[0].zipCode, social), 10),
                        city: secu.decrypt(result[0].address[0].city, social),
                        country: secu.decrypt(result[0].address[0].country, social)
                    }
                ],
                email: secu.decrypt(result[0].email, social),
                password: result[0].password,
                confirmationPassword: result[0].confirmationPassword, social,
                socialNumber: social
            }
            return res.status(200).send(resu);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})
/////
router.post('/create',
    [ctrlEValidatorPatientSignup.patientSignupIsValid()],
    async function (req, res, next) {
        try {
            const arrayModel = [modelPatientSignin.modelPatientSignin/*, modelPatientData.modelPatientData*/];
            const resultPatientSignup = await ctrlCreate.getModelWithValidator(req, modelPatientSecuSignup.modelPatientSecuSignup)
            if (resultPatientSignup[0] === undefined && !resultPatientSignup[1]) {


                var resu = {
                    body: {
			_id: resultPatientSignup._id,
                        firstName: secu.encrypt(resultPatientSignup.firstName, resultPatientSignup.socialNumber),
                        lastName: secu.encrypt(resultPatientSignup.lastName, resultPatientSignup.socialNumber),
                        birthDay: secu.encrypt(resultPatientSignup.birthDay, resultPatientSignup.socialNumber),
                        age: secu.encrypt(resultPatientSignup.age, resultPatientSignup.socialNumber),
                        phoneNumber: secu.encrypt(resultPatientSignup.phoneNumber, resultPatientSignup.socialNumber),
                        address: [
                            {
                                streetNumber: secu.encrypt(resultPatientSignup.address[0].streetNumber, resultPatientSignup.socialNumber),
                                typeStreetNumber: secu.encrypt(resultPatientSignup.address[0].typeStreetNumber, resultPatientSignup.socialNumber),
                                typeStreet: secu.encrypt(resultPatientSignup.address[0].typeStreet, resultPatientSignup.socialNumber),
                                street: secu.encrypt(resultPatientSignup.address[0].street, resultPatientSignup.socialNumber),
                                zipCode: secu.encrypt(resultPatientSignup.address[0].zipCode, resultPatientSignup.socialNumber),
                                city: secu.encrypt(resultPatientSignup.address[0].city, resultPatientSignup.socialNumber),
                                country: secu.encrypt(resultPatientSignup.address[0].country, resultPatientSignup.socialNumber)
                            }
                        ],
                        email: secu.encrypt(resultPatientSignup.email, resultPatientSignup.socialNumber),
                        password: sha3_512(sha3_384(resultPatientSignup.password)),
                        confirmationPassword: sha3_512(sha3_384(resultPatientSignup.confirmationPassword)),
                        socialNumber: secu.shuffle(resultPatientSignup.socialNumber),
                    }
                }

                const resultPatientSecuSignup = await ctrlCreate.postDataWithValidator(resu, modelPatientSecuSignup.modelPatientSecuSignup);
                const resultPatientSecuProfile = await ctrlCreate.postDataWithValidator(resu, modelPatientSecuProfile.modelPatientSecuProfile);
                const resultSave = ctrlCreate.saveAll(req, resultPatientSignup, arrayModel);

                return res.status(200).send(resultPatientSecuSignup);
            } else {
                return res.status(500).send(resultPatientSignup);
            }
        } catch (err) {
            return res.status(500).send(err.stack);
        }
    });

/* DELETE Connexion page. */

router.delete('/delete', async function (req, res) {
    try {
        const resultSignup = await ctrlDelete.findUserAndDelete(modelPatientSecuSignup.modelPatientSecuSignup, req.body._id);
        const resultProfile = await ctrlDelete.findUserAndDelete(modelPatientSecuProfile.modelPatientSecuProfile, req.body._id);

        if (resultSignup.result === '[]' || resultProfile.result === "[]"/* || resultSignin.result === "[]"*/) {
            return res.status(204).end();
        } else {
            return res.status(200).send(resultSignup);
        }

    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

/* UPDATE Connexion page. */

router.put('/update', async function (req, res) {
    try {
        if (!req.body._id) {
            return res.status(202).send("NO ID IN BODY");
        } else {
            var resu = {
                body: {
                    firstName: secu.encrypt(req.body.firstName, req.body.socialNumber),
                    lastName: secu.encrypt(req.body.lastName, req.body.socialNumber),
                    birthDay: secu.encrypt(req.body.birthDay, req.body.socialNumber),
                    age: secu.encrypt(req.body.age, req.body.socialNumber),
                    phoneNumber: secu.encrypt(req.body.phoneNumber, req.body.socialNumber),
                    address: [
                        {
                            streetNumber: secu.encrypt(req.body.address[0].streetNumber, req.body.socialNumber),
                            typeStreetNumber: secu.encrypt(req.body.address[0].typeStreetNumber, req.body.socialNumber),
                            typeStreet: secu.encrypt(req.body.address[0].typeStreet, req.body.socialNumber),
                            street: secu.encrypt(req.body.address[0].street, req.body.socialNumber),
                            zipCode: secu.encrypt(req.body.address[0].zipCode, req.body.socialNumber),
                            city: secu.encrypt(req.body.address[0].city, req.body.socialNumber),
                            country: secu.encrypt(req.body.address[0].country, req.body.socialNumber)
                        }
                    ],
                    email: secu.encrypt(req.body.email, req.body.socialNumber),
                    password: rsha3_512(sha3_384(eq.body.password)),
                    confirmationPassword: sha3_512(sha3_384(req.body.confirmationPassword)),
                    socialNumber: secu.shuffle(req.body.socialNumber)
                }
            }
            const result = await ctrlUpdate.updateValueById(modelPatientSecuSignup.modelPatientSecuSignup, req.body._id, resu.body);
            return res.status(200).send(result);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})
module.exports = router;
