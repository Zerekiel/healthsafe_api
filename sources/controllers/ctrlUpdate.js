const mongodb = require('mongodb');
const ctrlRead = require('./ctrlRead');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');

const updateValueByEmail = (model, jsonEmail, newData) => {
	const email = {email: jsonEmail};
	const dataToChange = {$set: newData};

	if(model && jsonEmail && newData) {
		return new Promise((resolve, reject) => {
			model.updateOne(email, dataToChange)
			.then((result) => {
				if (result.n === 0) {

					return reject(new Error(`Error : ID INVALID  OR NOT FOUNDED`));
				} else {
					const result2 = ctrlRead.findUserByEmail(model, email);
					return resolve(result2);
				}
			}).catch(err => {
				if (err) {
					return reject(err.stack);
				}
			})
		})
	}
	else {
			return new Error("Error : ID, model or new data === NULL");
	}
};

const updateValueById = (model, jsonId, newData) => {
	var myQuery = { _id: new mongodb.ObjectId(jsonId) };
	const dataToChange = {$set: newData};

	if(model && jsonId && newData) {
		return new Promise((resolve, reject) => {
			model.updateOne(myQuery, dataToChange)
			.then((result) => {
				if (result.n === 0) {
					return reject(new Error(`Error : ID INVALID  OR NOT FOUNDED`));
				} else {

					const result2 = ctrlRead.findUserByID(model, jsonId);
					return resolve(result2);
				}
			}).catch(err => {
				if (err) {
					return reject(err.stack);
				}
			})
		})
	}
	else {
			return new Error("Error : ID, model or new data === NULL");
	}
};

const updateValueByIdWithValidator = async (req, model, jsonId, newData) => {
	var myQuery = { _id: new mongodb.ObjectId(jsonId) };
		const dataToChange = {$set: newData};

	if(model && jsonId && newData) {
		const resultModel = new model(req.body);
		const errorModel = resultModel.validateSync();
		const resultEValidatorHandlerError = ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

		if (errorModel === undefined &&
	                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
				const resultupdate = model.findByIdAndUpdate(myQuery, dataToChange, { useFindAndModify: false });
				return resultupdate;
	        } else {
	                return [errorModel, resultEValidatorHandlerError];
	        }
	}
	else {
		return {error: "ID or new Data null", result: '[]'};
	}
};

module.exports = {
	updateValueById,
	updateValueByIdWithValidator,
	updateValueByEmail
	// updateValueById2
}
