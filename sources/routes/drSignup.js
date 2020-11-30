var express = require('express');
var router = express.Router();

const modelDrSignupSecu = require('../models/modelDrSignupSecu');
const modelDrProfileSecu = require('../models/modelDrProfileSecu');
const modelDrSignin = require('../models/modelDrSignin');


const ctrlRead = require('../controllers/ctrlRead');
const ctrlEValidatorDrSignup = require('../validators/ctrlEValidatorDrSignup');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');

const sha3_512 = require('js-sha3').sha3_512;
const sha3_384 = require('js-sha3').sha3_384;
const secu = require('./secu');

/* GET user Register listing. */
router.get('/', async function (req, res, next) {
    try {
        const result = await ctrlRead.findAllData(modelDrSignupSecu.modelDrSignupSecu);
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

router.get('/drSignupId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelDrSignupSecu.modelDrSignupSecu, req.body._id)
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
                password: result[0].password ,
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


//GET FOR MOBILE
router.post('/drSignupId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelDrSignupSecu.modelDrSignupSecu, req.body._id)
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
    [ctrlEValidatorDrSignup.drSignupIsValid()],
    async function (req, res, next) {
        try {
            const resultDrSignup = await ctrlCreate.getModelWithValidator(req, modelDrSignupSecu.modelDrSignupSecu)
            if (resultDrSignup[0] === undefined && !resultDrSignup[1]) {
                var resu = {
                    body: {
			_id: resultDrSignup._id,
                        firstName: secu.encrypt(resultDrSignup.firstName, resultDrSignup.socialNumber),
                        lastName: secu.encrypt(resultDrSignup.lastName, resultDrSignup.socialNumber),
                        birthDay: secu.encrypt(resultDrSignup.birthDay, resultDrSignup.socialNumber),
                        age: secu.encrypt(resultDrSignup.age, resultDrSignup.socialNumber),
                        phoneNumber: secu.encrypt(resultDrSignup.phoneNumber, resultDrSignup.socialNumber),
                        address: [
                            {
                                streetNumber: secu.encrypt(resultDrSignup.address[0].streetNumber, resultDrSignup.socialNumber),
                                typeStreetNumber: secu.encrypt(resultDrSignup.address[0].typeStreetNumber, resultDrSignup.socialNumber),
                                typeStreet: secu.encrypt(resultDrSignup.address[0].typeStreet, resultDrSignup.socialNumber),
                                street: secu.encrypt(resultDrSignup.address[0].street, resultDrSignup.socialNumber),
                                zipCode: secu.encrypt(resultDrSignup.address[0].zipCode, resultDrSignup.socialNumber),
                                city: secu.encrypt(resultDrSignup.address[0].city, resultDrSignup.socialNumber),
                                country: secu.encrypt(resultDrSignup.address[0].country, resultDrSignup.socialNumber)
                            }
                        ],
                        email: secu.encrypt(resultDrSignup.email, resultDrSignup.socialNumber),
                        password: sha3_512(sha3_384(resultDrSignup.password)),
                        confirmationPassword: sha3_512(sha3_384(resultDrSignup.confirmationPassword)),
                        expertiseDomain: secu.encrypt(resultDrSignup.expertiseDomain, resultDrSignup.socialNumber),
                        idNumber: secu.encrypt(resultDrSignup.idNumber, resultDrSignup.socialNumber),
                        socialNumber: secu.shuffle(resultDrSignup.socialNumber)
                    }
                }

                const resultDrSignupSecu = await ctrlCreate.postDataWithValidator(resu, modelDrSignupSecu.modelDrSignupSecu);
                const resultDrProfileSecu = await ctrlCreate.postDataWithValidator(resu, modelDrProfileSecu.modelDrProfileSecu);
                const resultDrSignin = await ctrlCreate.postDataWithValidator(req, modelDrSignin.modelDrSignin);
                return res.status(200).send(resultDrSignupSecu);
            } else {
                return res.status(500).send(resultDrSignup);
            }
        } catch (err) {
                return res.status(500).send(err.stack);
        }
    });

/* DELETE Connexion page. */

router.delete('/delete', async function (req, res) {
    try {
        const resultSignup = await ctrlDelete.findUserAndDelete(modelDrSignupSecu.modelDrSignupSecu, req.body._id);
        const resultProfile = await ctrlDelete.findUserAndDelete(modelDrProfileSecu.modelDrProfileSecu, req.body._id);
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
                    password: sha3_512(sha3_384(req.body.password)),
                    confirmationPassword: sha3_512(sha3_384(req.body.confirmationPassword)),
                    expertiseDomain: secu.encrypt(req.body.expertiseDomain, req.body.socialNumber),
                    idNumber: secu.encrypt(req.body.idNumber, req.body.socialNumber),
                    socialNumber: secu.shuffle(req.body.socialNumber)
                }
            }

            const result = await ctrlUpdate.updateValueById(modelDrSignupSecu.modelDrSignupSecu, req.body._id, resu.body);
            return res.status(200).send(result);
        }

    } catch (err) {
        return res.status(500).send(err.stack);
    }
})
module.exports = router;
