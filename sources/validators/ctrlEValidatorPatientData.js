const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
const modelPatientData = require('../models/modelPatientData');

const patientDataIsValid = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.birthDayValidator('birthDay'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.genderValidator('gender'),
		ctrlEValidatorModel.heightValidator('height'),
		ctrlEValidatorModel.weightValidator('weight'),
		ctrlEValidatorModel.phoneNumberValidator('emergencyNumber'),
		ctrlEValidatorModel.basicStringdValidator('allergies'),
		ctrlEValidatorModel.bloodTypeValidator('bloodType'),
		ctrlEValidatorModel.socialNumberValidator(modelPatientData.modelPatientData, 'socialNumber', 'socialNumber'),
		ctrlEValidatorModel.basicStringdValidator('treatments'),
		ctrlEValidatorModel.isBooleanValidator('organDonation'),
		ctrlEValidatorModel.nameValidator('doctor')
	];
}

const patientDataIsValidPUT = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.birthDayValidatorPUT('birthDay'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.genderValidator('gender'),
		ctrlEValidatorModel.heightValidator('height'),
		ctrlEValidatorModel.weightValidator('weight'),
		ctrlEValidatorModel.phoneNumberValidator('emergencyNumber'),
		ctrlEValidatorModel.basicStringdValidator('allergies'),
		ctrlEValidatorModel.bloodTypeValidator('bloodType'),
		ctrlEValidatorModel.socialNumberValidatorPUT(modelPatientData.modelPatientData, 'socialNumber', 'socialNumber'),
		ctrlEValidatorModel.basicStringdValidator('treatments'),
		ctrlEValidatorModel.isBooleanValidator('organDonation'),
		ctrlEValidatorModel.nameValidator('doctor')
	];
}

module.exports = {
	patientDataIsValid,
	patientDataIsValidPUT
}
