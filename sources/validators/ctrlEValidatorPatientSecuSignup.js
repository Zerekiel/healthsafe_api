const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
const modelPatientSecuSignup = require('../models/modelPatientSignup');

// const validatorRegister =

const patientSecuSignupIsValid = () => {
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
        ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelPatientSecuSignup.modelPatientSecuSignup, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
        ctrlEValidatorModel.socialNumberValidator(modelPatientSecuSignup.modelPatientSecuSignup, 'socialNumber', 'socialNumber'),
        ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelPatientSecuSignup.modelPatientSecuSignup, 'socialNumber', 'socialNumber')
	];
}



const patientSecuSignupIdIsValid = () => {
	return ctrlEValidatorModel.idNumberValidator('socialNumber');
}

module.exports = {
	patientSecuSignupIsValid,
	patientSecuSignupIdIsValid
}
