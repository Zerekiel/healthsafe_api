const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
const modelPatientDataSecu = require('../models/modelPatientDataSecu');

const patientDataSecuIsValid = () => {
	return [
        ctrlEValidatorModel.basicStringdValidator('lastName'),
        ctrlEValidatorModel.basicStringdValidator('firstName'),
        ctrlEValidatorModel.basicStringdValidator('birthDay'),
        // ctrlEValidatorModel.basicStringdValidator('age'),
        ctrlEValidatorModel.basicStringdValidator('gender'),
        ctrlEValidatorModel.basicStringdValidator('height'),
        ctrlEValidatorModel.basicStringdValidator('weight'),
        ctrlEValidatorModel.basicStringdValidator('emergencyNumber'),
        ctrlEValidatorModel.basicStringdValidator('allergies'),
        ctrlEValidatorModel.basicStringdValidator('bloodType'),
        ctrlEValidatorModel.basicStringdValidator('socialNumber'),
        ctrlEValidatorModel.basicStringdValidator('treatments'),
        ctrlEValidatorModel.basicStringdValidator('organDonation'),
        ctrlEValidatorModel.basicStringdValidator('doctor')
	];
}

const patientDataSecuIsValidPUT = () => {
	return [
        ctrlEValidatorModel.basicStringdValidator('lastName'),
        ctrlEValidatorModel.basicStringdValidator('firstName'),
        ctrlEValidatorModel.basicStringdValidator('birthDay'),
        // ctrlEValidatorModel.basicStringdValidator('age'),
        ctrlEValidatorModel.basicStringdValidator('gender'),
        ctrlEValidatorModel.basicStringdValidator('height'),
        ctrlEValidatorModel.basicStringdValidator('weight'),
        ctrlEValidatorModel.basicStringdValidator('emergencyNumber'),
        ctrlEValidatorModel.basicStringdValidator('allergies'),
        ctrlEValidatorModel.basicStringdValidator('bloodType'),
        ctrlEValidatorModel.basicStringdValidator('socialNumber'),
		ctrlEValidatorModel.basicStringdValidator('treatments'),
        ctrlEValidatorModel.basicStringdValidator('organDonation'),
        ctrlEValidatorModel.basicStringdValidator('doctor')
	];
}

module.exports = {
	patientDataSecuIsValid,
	patientDataSecuIsValidPUT
}
