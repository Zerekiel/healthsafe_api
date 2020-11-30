const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const modelPatientSecuProfile = require('../models/modelPatientSecuProfile.js');
const ctrlEValidatorPatientProfile = require('../validators/ctrlEValidatorPatientProfile');

const ctrlRead = require('../controllers/ctrlRead');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');

const secu = require('./secu');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const result = await ctrlRead.findAllData(modelPatientSecuProfile.modelPatientSecuProfile);
        if (JSON.stringify(result) == '[]') {
            const msg = { msg: "Success but no Data in DB.", result: result };
            return res.status(204).send(msg)

        } else {
            return res.status(200).send(result);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

router.get('/patientProfileId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelPatientSecuProfile.modelPatientSecuProfile, req.body._id)
        if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        } else {
            var social = secu.unshuffle(result[0].socialNumber);
            var resu = {
                firstName: secu.decrypt(result[0].firstName, social),
                lastName: secu.decrypt(result[0].lastName, social),
                birthDay: secu.decrypt(result[0].birthDay, social),
                age: secu.decrypt(result[0].age, social),
                phoneNumber: secu.decrypt(result[0].phoneNumber, social),
                address: [
                    {
                        streetNumber: secu.decrypt(result[0].address[0].streetNumber, social),
                        typeStreetNumber: secu.decrypt(result[0].address[0].typeStreetNumber, social),
                        typeStreet: secu.decrypt(result[0].address[0].typeStreet, social),
                        street: secu.decrypt(result[0].address[0].street, social),
                        zipCode: secu.decrypt(result[0].address[0].zipCode, social),
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
router.post('/patientProfileId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelPatientSecuProfile.modelPatientSecuProfile, req.body._id)
        if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        } else {
            var social = secu.unshuffle(result[0].socialNumber);
            var resu = {
                firstName: secu.decrypt(result[0].firstName, social),
                lastName: secu.decrypt(result[0].lastName, social),
                birthDay: secu.decrypt(result[0].birthDay, social),
                age: secu.decrypt(result[0].age, social),
                phoneNumber: secu.decrypt(result[0].phoneNumber, social),
                address: [
                    {
                        streetNumber: secu.decrypt(result[0].address[0].streetNumber, social),
                        typeStreetNumber: secu.decrypt(result[0].address[0].typeStreetNumber, social),
                        typeStreet: secu.decrypt(result[0].address[0].typeStreet, social),
                        street: secu.decrypt(result[0].address[0].street, social),
                        zipCode: secu.decrypt(result[0].address[0].zipCode, social),
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

router.post('/create',
    [ctrlEValidatorPatientProfile.patientProfileIsValid()],
    async function (req, res, next) {
        try {
            const resultPatientProfile = await ctrlCreate.getModelWithValidator(req, modelPatientSecuProfile.modelPatientSecuProfile);
            if (resultPatientProfile[0] === undefined && !resultPatientProfile[1]) {
                var resu = {
                    body: {
                        firstName: secu.encrypt(resultPatientProfile.firstName, resultPatientProfile.socialNumber),
                        lastName: secu.encrypt(resultPatientProfile.lastName, resultPatientProfile.socialNumber),
                        birthDay: secu.encrypt(resultPatientProfile.birthDay, resultPatientProfile.socialNumber),
                        age: secu.encrypt(resultPatientProfile.age, resultPatientProfile.socialNumber),
                        phoneNumber: secu.encrypt(resultPatientProfile.phoneNumber, resultPatientProfile.socialNumber),
                        address: [
                            {
                                streetNumber: secu.encrypt(resultPatientProfile.address[0].streetNumber, resultPatientProfile.socialNumber),
                                typeStreetNumber: secu.encrypt(resultPatientProfile.address[0].typeStreetNumber, resultPatientProfile.socialNumber),
                                typeStreet: secu.encrypt(resultPatientProfile.address[0].typeStreet, resultPatientProfile.socialNumber),
                                street: secu.encrypt(resultPatientProfile.address[0].street, resultPatientProfile.socialNumber),
                                zipCode: secu.encrypt(resultPatientProfile.address[0].zipCode, resultPatientProfile.socialNumber),
                                city: secu.encrypt(resultPatientProfile.address[0].city, resultPatientProfile.socialNumber),
                                country: secu.encrypt(resultPatientProfile.address[0].country, resultPatientProfile.socialNumber)
                            }
                        ],
                        email: secu.encrypt(resultPatientProfile.email, resultPatientProfile.socialNumber),
                        password: sha3_512(sha3_384(resultPatientProfile.password)),
                        confirmationPassword: sha3_512(sha3_384(resultPatientProfile.confirmationPassword)),
                        socialNumber: secu.shuffle(resultPatientProfile.socialNumber)
                    }
                }
                const result = await ctrlCreate.postDataWithValidator(resu, modelPatientSecuProfile.modelPatientSecuProfile);
                return res.status(200).send(result);
            } else {
                return res.status(500).send(resultPatientProfile);
            }

        } catch (err) {
            return res.status(500).send(err.stack);
        }
    });

/* DELETE Connexion page. */

router.delete('/delete', async function (req, res) {
    try {
        const result = await ctrlDelete.findUserAndDelete(modelPatientSecuProfile.modelPatientSecuProfile, req.body._id);

        if (result.result === '[]') {
            return res.status(204).end();
        } else {
            return res.status(200).send(result);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

/* UPDATE Connexion page. */

router.put('/update',
    [ctrlEValidatorPatientProfile.patientProfileIsValidPUT()],
    async function (req, res) {
        try {
            if (!req.body._id) {
                return res.status(202).send("NO ID IN BODY");
            }
            else {
                var resu = {
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
                    password: sha3_512(sha3_384(req.body.password)),
                    confirmationPassword: sha3_512(sha3_384(req.body.confirmationPassword)),
                    socialNumber: secu.shuffle(req.body.socialNumber)
                }
                const result = await ctrlUpdate.updateValueByIdWithValidator(req, modelPatientSecuProfile.modelPatientSecuProfile, req.body._id, resu);
                return res.status(200).send(result);
            }
        } catch (err) {
            return res.status(500).send(err.stack);
        }
    })
module.exports = router;
