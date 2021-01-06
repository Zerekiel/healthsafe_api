const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
const modelPatientSignup = require('../models/modelPatientSignup');

// const validatorRegister =

const patientSignupIsValid = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.birthDayValidator('birthDay'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.phoneNumberValidator('phoneNumber'),
		ctrlEValidatorModel.streetNumberValidator('address[0].streetNumber'),
		ctrlEValidatorModel.typeStreetNumberValidator('address[0].typeStreetNumber'),
		ctrlEValidatorModel.streetValidator('address[0].street'),
		ctrlEValidatorModel.zipCodeValidator('address[0].zipCode'),
		ctrlEValidatorModel.cityValidator('address[0].city'),
		ctrlEValidatorModel.countryValidator('address[0].country'),
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelPatientSignup.modelPatientSignup, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
		ctrlEValidatorModel.socialNumberValidator(modelPatientSignup.modelPatientSignup, 'socialNumber', 'socialNumber'),
		ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelPatientSignup.modelPatientSignup, 'socialNumber', 'socialNumber')
	];
}



const patientSignupIdIsValid = () => {
	return ctrlEValidatorModel.idNumberValidator('socialNumber');
}

module.exports = {
	patientSignupIsValid,
	patientSignupIdIsValid
}
