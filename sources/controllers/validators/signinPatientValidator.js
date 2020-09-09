const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelSignupPatient = require('../../models/modelSignupPatient');

	const signinPatientIsValid = () => {
	return [
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelSignupPatient.modelSignupPatient, 'password'),
		ctrlEValidatorModel.loginValidator(modelSignupPatient.modelSignupPatient, {email: 'email', password: 'password'}),
	];
}

module.exports = {
	signinPatientIsValid
}
