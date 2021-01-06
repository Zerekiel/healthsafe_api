const express = require('express');
const router = express.Router();
const secu = require('./secu');

router.post('/', async function (req, res) {
    try {
        const result = req.body;
	var social = secu.shuffle(result.socialNumber);
        let tab = [];
        result.medicalHistory.forEach(element => {
            tab.push(secu.encrypt(element, result.socialNumber));
        })
        var resu = {
            firstName: secu.encrypt(result.firstName, result.socialNumber),
            lastName: secu.encrypt(result.lastName, result.socialNumber),
            age: secu.encrypt(result.age, result.socialNumber),
            birthDay: secu.encrypt(result.birthDay, result.socialNumber),
            gender: secu.encrypt(result.gender, result.socialNumber),
            height: secu.encrypt(result.height, result.socialNumber),
            weight: secu.encrypt(result.weight, result.socialNumber),
            emergencyNumber: secu.encrypt(result.emergencyNumber, result.socialNumber),
            allergies: secu.encrypt(result.allergies, result.socialNumber),
            medicalHistory: tab,
            bloodType: secu.encrypt(result.bloodType, result.socialNumber),
            socialNumber: social,
            treatments: secu.encrypt(result.treatments, result.socialNumber),
            organDonation: secu.encrypt(result.organDonation, result.socialNumber),
            doctor: secu.encrypt(result.doctor, result.socialNumber)
        }
        return res.status(200).send(resu);

    } catch (err) {
        return res.status(500).send(err.stack);
    }
})

module.exports = router;
