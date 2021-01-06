const express = require('express');
const router = express.Router();
const modelPatientDataSecu = require('../models/modelPatientDataSecu');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ctrlCreate = require('../controllers/ctrlCreate');
const ctrlRead = require('../controllers/ctrlRead');
const ctrlDelete = require('../controllers/ctrlDelete');
const ctrlUpdate = require('../controllers/ctrlUpdate');
const ctrlEValidatorPatientData = require('../validators/ctrlEValidatorPatientData');
const ctrlEValidatorPatientDataSecu = require('../validators/ctrlEValidatorPatientDataSecu');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');

const modelDrSignin = require('../models/modelDrSignin');
const ctrlAuthentification = require('../controllers/ctrlAuthentification');


const mongodb = require('mongodb');
const mongoose = require('mongoose');

const secu = require('./secu');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage });

/////////////////////////////////////////////////////////////////////////////////
// SEND ID
// ctrlAuthentification.auth,
router.get('/receiveID',  ctrlAuthentification.auth, function(req, res) {
    if (JSON.stringify(req.user.idTransfert) === "[]") {
	    return res.status(204).end();
    }
    
    return res.status(200).send(req.user.idTransfert);
})


router.post('/sendID', ctrlAuthentification.auth, async function(req, res) {
try {
        // console.log("REQ" + req.user)

        const resultModelTest = new modelDrSignin.modelDrSignin(req.body);
        // console.log(resultModelTest)
        await req.user.idTransfert.set(0, req.body.idTransfert)
        req.user.save();
        return res.status(200).send(req.user);
} catch(e) {
        return res.status(500).send(e.stack);
}

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* GET Connexion page. */

router.get('/', async function (req, res) {
    try {
        const result = await ctrlRead.findAllData(modelPatientDataSecu.modelPatientDataSecu);
        if (JSON.stringify(result) == '[]') {
            const msg = { msg: "Success but no Data in DB.", result: result };
            return res.status(204).send(msg)

        } else {
            return res.status(200).send(result);
        }
    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

router.get('/patientDataId', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
        var social = secu.unshuffle(result[0].socialNumber);
        if (JSON.stringify(result) != '[]') {
            const saveResult = result;
            const data = await ctrlDelete.findUserAndDelete(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
            if (!data) {
                return res.status(500).send({ Error: "Delete User (patientDataId) Failed." })
            }
        } else if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        }
        var resu = {
            firstName: secu.decrypt(result[0].firstName, social),
            lastName: secu.decrypt(result[0].lastName, social),
            birthDay: secu.decrypt(result[0].birthDay, social),
            age: parseInt(secu.decrypt(result[0].age, social), 10),
            gender: secu.decrypt(result[0].gender, social),
            height: parseInt(secu.decrypt(result[0].height, social), 10),
            weight: parseInt(secu.decrypt(result[0].weight, social), 10),
            emergencyNumber: secu.decrypt(result[0].emergencyNumber, social),
            allergies: secu.decrypt(result[0].allergies, social),
            image: result[0].image,
            medicalHistory: result[0].medicalHistory,
            bloodType: secu.decrypt(result[0].bloodType, social),
            treatments: secu.decrypt(result[0].treatments, social),
            organDonation: (secu.decrypt(result[0].organDonation, social) === "true"),
            doctor: secu.decrypt(result[0].doctor, social),
            socialNumber: social
        }
        return res.status(200).send(resu);
    }
    catch (err) {
        return res.status(500).send(err.stack);

    }

})

/* GET (POST) for mobile */

router.post('/patientDataId', async function (req, res) {

    try {
        const result = await ctrlRead.findUserByID(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
        var social = secu.unshuffle(result[0].socialNumber);
        if (JSON.stringify(result) != '[]') {
            const saveResult = result;
            const data = await ctrlDelete.findUserAndDelete(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
            if (!data) {
                return res.status(500).send({ Error: "Delete User (patientDataId) Failed." })
            }

        } else if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        }
        var resu = {
            firstName: secu.decrypt(result[0].firstName, social),
            lastName: secu.decrypt(result[0].lastName, social),
            birthDay: secu.decrypt(result[0].birthDay, social),
            age: parseInt(secu.decrypt(result[0].age, social), 10),
            gender: secu.decrypt(result[0].gender, social),
            height: parseInt(secu.decrypt(result[0].height, social), 10),
            weight: parseInt(secu.decrypt(result[0].weight, social), 10),
            emergencyNumber: secu.decrypt(result[0].emergencyNumber, social),
            allergies: secu.decrypt(result[0].allergies, social),
            image: result[0].image,
            medicalHistory: result[0].medicalHistory,
            bloodType: secu.decrypt(result[0].bloodType, social),
            treatments: secu.decrypt(result[0].treatments, social),
            organDonation: (secu.decrypt(result[0].organDonation, social) === "true"),
            doctor: secu.decrypt(result[0].doctor, social),
            socialNumber: social
        }
        return res.status(200).send(resu);
    }
    catch (err) {
        return res.status(500).send(err.stack);

    }
})

router.get('/patientDataIdSimple', async function (req, res) {
    try {
        const result = await ctrlRead.findUserByID(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
        if (JSON.stringify(result) != '[]') {
            const saveResult = result;
            const data = await ctrlDelete.findUserAndDelete(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
            if (!data) {
                return res.status(500).send({ Error: "Delete User (patientDataId) Failed." })
            }
        } else if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        }
        return res.status(200).send(result);
    }
    catch (err) {
        return res.status(500).send(err.stack);
    }
})

/* GET (POST) for mobile */

router.post('/patientDataIdSimple', async function (req, res) {

    try {
        const result = await ctrlRead.findUserByID(modelPatientDataSecu.modelPatientDataSecu, req.body._id);
        if (JSON.stringify(result) != '[]') {
            const saveResult = result;
            const data = await ctrlDelete.findUserAndDelete(modelPatientDataSecu.modelPatientDataSecu, req.body._id);

            if (!data) {
                return res.status(500).send({ Error: "Delete User (patientDataId) Failed." })
            }
        } else if (JSON.stringify(result) == '[]') {
            return res.status(204).end();
        }
        return res.status(200).send(result);
    }
    catch (err) {
        return res.status(500).send(err.stack);

    }
})

// ctrlEValidatorPatientData.patientDataIsValid()
router.post('/create',
    [ctrlEValidatorPatientData.patientDataIsValid(), upload.single('image')],
    async function (req, res) {
        try {
            const resultPatientData = await ctrlCreate.getModelWithValidator(req, modelPatientDataSecu.modelPatientDataSecu)
	    console.log(resultPatientData);
            if (resultPatientData[0] === undefined &&
                !resultPatientData[1]) {
		console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIFFFFFFFFFFFFFFFFFFFFF");
                var resu = {
                    body: {
                        firstName: secu.encrypt(resultPatientData.firstName, resultPatientData.socialNumber),
                        lastName: secu.encrypt(resultPatientData.lastName, resultPatientData.socialNumber),
                        birthDay: secu.encrypt(resultPatientData.birthDay, resultPatientData.socialNumber),
                        age: parseInt(secu.encrypt(resultPatientData.age, resultPatientData.socialNumber), 10),
                        gender: secu.encrypt(resultPatientData.gender, resultPatientData.socialNumber),
                        height: parseInt(secu.encrypt(resultPatientData.height, resultPatientData.socialNumber), 10),
                        weight: parseInt(secu.encrypt(resultPatientData.weight, resultPatientData.socialNumber), 10),
                        emergencyNumber: secu.encrypt(resultPatientData.emergencyNumber, resultPatientData.socialNumber),
                        allergies: secu.encrypt(resultPatientData.allergies, resultPatientData.socialNumber),
                        image: resultPatientData.image,
                        medicalHistory: [].push(resultPatientData.medicalHistory.forEach(element => {
                            return element;
                        })),
                        bloodType: secu.encrypt(resultPatientData.bloodType, resultPatientData.socialNumber),
                        treatments: secu.encrypt(resultPatientData.treatments, resultPatientData.socialNumber),
                        organDonation: secu.encrypt(resultPatientData.organDonation, resultPatientData.socialNumber),
                        doctor: secu.encrypt(resultPatientData.doctor, resultPatientData.socialNumber),
                        socialNumber: secu.shuffle(resultPatientData.socialNumber)
                    }
                }
			    console.log("SSSSSSSSSSSEEEEEEEEEEEEEEECCCCCCCCCCCCCCCCUUUUUUUUUUUUUU");
                const resultPatientDataSecu = await ctrlCreate.postDataWithValidator(resu, modelPatientDataSecu.modelPatientDataSecu);
			    console.log(resultPatientDataSecu);
                return res.status(201).send(resultPatientDataSecu);
            } else {
                return res.status(500).send(resultPatientData);
            }

        } catch (err) {
            return res.status(500).send(err);
        }

    })

router.post('/createSimple',
    [ctrlEValidatorPatientDataSecu.patientDataSecuIsValid(), upload.single('image')],
    async function (req, res) {
        try {
            const resultPatientData = await ctrlCreate.postDataWithValidator(req, modelPatientDataSecu.modelPatientDataSecu)
            if (resultPatientData[0] === undefined &&
                !resultPatientData[1]) {
                return res.status(201).send(resultPatientData);
            } else {
                return res.status(500).send(resultPatientData);
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }
)

/* DELETE Connexion page. */

router.delete('/delete', async function (req, res) {
    try {

        const result = await ctrlDelete.findUserAndDelete(modelPatientDataSecu.modelPatientDataSecu, req.body._id);

        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
})

/* UPDATE Connexion page. */

router.put('/update',
    [ctrlEValidatorPatientData.patientDataIsValidPUT()],
    async function (req, res) {
        try {
            if (!req.body._id) {
                return res.status(202).send("NO ID IN BODY");
            } else {
                var resu = {
                    body: {
                        firstName: secu.encrypt(req.body.firstName, req.body.socialNumber),
                        lastName: secu.encrypt(req.body.lastName, req.body.socialNumber),
                        birthDay: secu.encrypt(req.body.birthDay, req.body.socialNumber),
                        age: parseInt(secu.encrypt(req.body.age, req.body.socialNumber), 10),
                        gender: secu.encrypt(req.body.gender, req.body.socialNumber),
                        height: parseInt(secu.encrypt(req.body.height, req.body.socialNumber), 10),
                        weight: parseInt(secu.encrypt(req.body.weight, req.body.socialNumber), 10),
                        emergencyNumber: secu.encrypt(req.body.emergencyNumber, req.body.socialNumber),
                        allergies: secu.encrypt(req.body.allergies, req.body.socialNumber),
                        image: req.body.image,
                        medicalHistory: req.body.medicalHistory,
                        bloodType: secu.encrypt(req.body.bloodType, req.body.socialNumber),
                        treatments: secu.encrypt(req.body.treatments, req.body.socialNumber),
                        organDonation: secu.encrypt(req.body.organDonation, req.body.socialNumber),
                        doctor: secu.encrypt(req.body.doctor, req.body.socialNumber),
                        socialNumber: secu.shuffle(req.body.socialNumber)
                    }
                }
                const result = await ctrlUpdate.updateValueById(modelPatientDataSecu.modelPatientDataSecu, req.body._id, resu.body);
                return res.status(200).send(result);
            }
        } catch (err) {
            return res.status(500).send(err.stack);
        }
    })

module.exports = router;
