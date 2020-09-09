const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelPatientProfile = require('../../models/modelPatientProfile');

const patientProfileIsValid = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.phoneNumberValidator('phoneNumber'),
		ctrlEValidatorModel.streetNumberValidator('address[0].streetNumber'),
		ctrlEValidatorModel.typeStreetNumberValidator('address[0].typeStreetNumber'),
		ctrlEValidatorModel.streetValidator('address[0].street'),
		ctrlEValidatorModel.zipCodeValidator('address[0].zipCode'),
		ctrlEValidatorModel.cityValidator('address[0].city'),
		ctrlEValidatorModel.countryValidator('address[0].country'),
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelPatientProfile.modelPatientProfile, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword')

	];
}

const patientProfileIsValidPUT = () => {
	return [
		ctrlEValidatorModel.nameValidatorPUT('lastName'),
		ctrlEValidatorModel.nameValidatorPUT('firstName'),
		ctrlEValidatorModel.ageValidatorPUT('age'),
		ctrlEValidatorModel.phoneNumberValidatorPUT('phoneNumber'),
		ctrlEValidatorModel.streetNumberValidatorPUT('address[0].streetNumber'),
		ctrlEValidatorModel.typeStreetNumberValidatorPUT('address[0].typeStreetNumber'),
		ctrlEValidatorModel.streetValidatorPUT('address[0].street'),
		ctrlEValidatorModel.zipCodeValidatorPUT('address[0].zipCode'),
		ctrlEValidatorModel.cityValidatorPUT('address[0].city'),
		ctrlEValidatorModel.countryValidatorPUT('address[0].country'),
		ctrlEValidatorModel.emailValidatorPUT('email'),
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidatorPUT(modelPatientProfile.modelPatientProfile, 'email'),
		ctrlEValidatorModel.passwordValidatorPUT('password'),
		ctrlEValidatorModel.confirmationPasswordValidatorPUT('confirmationPassword')
	];
}

module.exports = {
	patientProfileIsValid,
	patientProfileIsValidPUT
}
