const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const modelDrProfileSecu = require('../models/modelDrProfileSecu.js');
const ctrlEValidatorDrProfile = require('../validators/ctrlEValidatorDrProfile');

const ctrlRead = require('../controllers/ctrlRead');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');

const secu = require('./secu');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const result = await ctrlRead.findAllData(modelDrProfileSecu.modelDrProfileSecu);
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

router.get('/drProfileId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelDrProfileSecu.modelDrProfileSecu, req.body._id)
        if (JSON.stringify(result) == '[]') {
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
                expertiseDomain: secu.decrypt(result[0].expertiseDomain, social),
                idNumber: parseInt(secu.decrypt(result[0].idNumber, social), 10),
                socialNumber: parseInt(social, 10)
            }
            return res.status(200).send(resu);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

// GET FOR MOBILE
router.post('/drProfileId', async function (req, res) {
    try {

        const result = await ctrlRead.findUserByID(modelDrProfileSecu.modelDrProfileSecu, req.body._id)
        if (JSON.stringify(result) == '[]') {
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
                password: result[0].password, social,
                confirmationPassword: result[0].confirmationPassword, social,
                expertiseDomain: secu.decrypt(result[0].expertiseDomain, social),
                idNumber: parseInt(secu.decrypt(result[0].idNumber, social), 10),
                socialNumber: parseInt(social, 10)
            }
            return res.status(200).send(resu);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

router.post('/create',
    [ctrlEValidatorDrProfile.drProfileIsValid()],
    async function (req, res, next) {
        try {
            const resultDrProfile = await ctrlCreate.getModelWithValidator(req, modelDrProfileSecu.modelDrProfileSecu)
            if (resultDrProfile[0] === undefined && !resultDrProfile[1]) {
                var resu = {
                    body: {
                        firstName: secu.encrypt(resultDrProfile.firstName, resultDrProfile.socialNumber),
                        lastName: secu.encrypt(resultDrProfile.lastName, resultDrProfile.socialNumber),
                        birthDay: secu.encrypt(resultDrProfile.birthDay, resultDrProfile.socialNumber),
                        age: secu.encrypt(resultDrProfile.age, resultDrProfile.socialNumber),
                        phoneNumber: secu.encrypt(resultDrProfile.phoneNumber, resultDrProfile.socialNumber),
                        address: [
                            {
                                streetNumber: secu.encrypt(resultDrProfile.address[0].streetNumber, resultDrProfile.socialNumber),
                                typeStreetNumber: secu.encrypt(resultDrProfile.address[0].typeStreetNumber, resultDrProfile.socialNumber),
                                typeStreet: secu.encrypt(resultDrProfile.address[0].typeStreet, resultDrProfile.socialNumber),
                                street: secu.encrypt(resultDrProfile.address[0].street, resultDrProfile.socialNumber),
                                zipCode: secu.encrypt(resultDrProfile.address[0].zipCode, resultDrProfile.socialNumber),
                                city: secu.encrypt(resultDrProfile.address[0].city, resultDrProfile.socialNumber),
                                country: secu.encrypt(resultDrProfile.address[0].country, resultDrProfile.socialNumber)
                            }
                        ],
                        email: secu.encrypt(resultDrProfile.email, resultDrProfile.socialNumber),
                        password: resultDrProfile.password,
                        confirmationPassword: resultDrProfile.confirmationPassword,
                        expertiseDomain: secu.encrypt(resultDrProfile.expertiseDomain, resultDrProfile.socialNumber),
                        idNumber: secu.encrypt(resultDrProfile.idNumber, resultDrProfile.socialNumber),
                        socialNumber: secu.shuffle(resultDrProfile.socialNumber)
                    }
                }
                const result = await ctrlCreate.postDataWithValidator(resu, modelDrProfileSecu.modelDrProfileSecu);
                return res.status(200).send(result);
            } else {
                return res.status(500).send(resultDrProfile);
            }

        } catch (err) {
            return res.status(500).send(err.stack);
        }
    });

/* DELETE Connexion page. */

router.delete('/delete', async function (req, res) {
    try {
        const result = await ctrlDelete.findUserAndDelete(modelDrProfileSecu.modelDrProfileSecu, req.body._id);

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
    [ctrlEValidatorDrProfile.drProfileIsValidPUT()],
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
                    expertiseDomain: secu.encrypt(req.body.expertiseDomain, req.body.socialNumber),
                    idNumber: secu.encrypt(req.body.idNumber, req.body.socialNumber),
                    socialNumber: secu.shuffle(req.body.socialNumber),
                }
                const result = await ctrlUpdate.updateValueByIdWithValidator(req, modelDrProfileSecu.modelDrProfileSecu, req.body._id, resu);
                return res.status(200).send(result);
            }
        } catch (err) {
            return res.status(500).send(err.stack);
        }
    })
module.exports = router;
