const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidators');
//const modelDrSignup = require('../models/modelDrSignup');
const modelDrSignin = require('../models/modelDrSignin');
//const modelPatientSignup = require('../models/modelPatientSignup');
const modelPatientSignin = require('../models/modelPatientSignin');


	const signinIsValid = () => {
	return [
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.passwordValidator('password'),
	    //ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelDrSignup.modelDrSignup, 'password'),
	    		ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelDrSignin.modelDrSignin, 'password'),
	    //ctrlEValidatorModel.loginValidator(modelDrSignup.modelDrSignup, {email: 'email', password: 'password'}),
	    		ctrlEValidatorModel.loginValidator(modelDrSignin.modelDrSignin, {email: 'email', password: 'password'}),
		];
	}

	const patientSigninIsValid = () => {
	return [
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.passwordValidator('password'),
	    //ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelPatientSignup.modelPatientSignup, 'password'),
	    		ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelPatientSignin.modelPatientSignin, 'password'),
	    //ctrlEValidatorModel.loginValidator(modelPatientSignup.modelPatientSignup, {email: 'email', password: 'password'}),
	    		ctrlEValidatorModel.loginValidator(modelPatientSignin.modelPatientSignin, {email: 'email', password: 'password'}),
		];
	}

module.exports = {
	signinIsValid,
	patientSigninIsValid
}
