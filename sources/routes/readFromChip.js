const express = require('express');
const router = express.Router();
const secu = require('./secu');

router.post('/', async function (req, res) {
    try {
        const result = req.body;
        var social = secu.unshuffle(result.socialNumber);
        let tab = [];
        result.medicalHistory.forEach(element => {
            tab.push(secu.decrypt(element, social));
        })
        var resu = {
            firstName: secu.decrypt(result.firstName, social),
            lastName: secu.decrypt(result.lastName, social),
            age: secu.decrypt(result.age, social),
            birthDay: secu.decrypt(result.birthDay, social),
            gender: secu.decrypt(result.gender, social),
            height: secu.decrypt(result.height, social),
            weight: secu.decrypt(result.weight, social),
            emergencyNumber: secu.decrypt(result.emergencyNumber, social),
            allergies: secu.decrypt(result.allergies, social),
            medicalHistory: tab,
            bloodType: secu.decrypt(result.bloodType, social),
            socialNumber: social,
            treatments: secu.decrypt(result.treatments, social),
            organDonation: secu.decrypt(result.organDonation, social),
            doctor: secu.decrypt(result.doctor, social)
        }
        return res.status(200).send(resu);

    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

module.exports = router;
