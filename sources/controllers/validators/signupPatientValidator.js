const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelSignupPatient = require('../../models/modelSignupPatient');

const signupPatientIsValid = () => {
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
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelSignupPatient.modelSignupPatient, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
	];
}

// const signupIdIsValid = () => {
// 	return ctrlEValidatorModel.idNumberValidator('idNumber');
// }

module.exports = {
	signupPatientIsValid,
	// signupIdIsValid
}
