const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
const modelDrSignup = require('../models/modelDrSignup');

// const validatorRegister =

const drSignupSecuIsValid = () => {
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
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelDrSignup.modelDrSignup, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
		ctrlEValidatorModel.expertiseDomainValidator('expertiseDomain'),
		ctrlEValidatorModel.idNumberValidator('socialNumber'), // A corriger
		// ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelDrSignup.modelDrSignup, 'idNumber', 'idNumber')
	];
}

const drSignupIsValid2 = () => {
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
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelDrSignup.modelDrSignup, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
		ctrlEValidatorModel.expertiseDomainValidator('expertiseDomain'),
		ctrlEValidatorModel.idNumberValidator('socialNumber'), // A corriger
		ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelDrSignup.modelDrSignup, 'idNumber', 'idNumber')
	];
}

const drSignupSecuIdIsValid = () => {
	return ctrlEValidatorModel.idNumberValidator('idNumber');
}

module.exports = {
	drSignupSecuIsValid,
	drSignupSecuIdIsValid
}
