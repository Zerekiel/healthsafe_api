const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ctrlEValidatorErrorHandler = require('../validators/errorHandler/ctrlEValidatorErrorHandler');

const getModelWithValidator = (req, model) => {
    if (!req.body._id) {
        req.body._id = new mongoose.Types.ObjectId();
    }
    const resultModel = new model(req.body);
    const errorModel = resultModel.validateSync();
    const resultEValidatorHandlerError = ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

    if (errorModel === undefined &&
        JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {

        return resultModel

    } else {
        return [errorModel, resultEValidatorHandlerError];
    }
}

const postDataWithValidator = (req, model) => {
	if (!req.body._id) {
		req.body._id = new mongoose.Types.ObjectId();
	}
	const resultModel = new model(req.body);
        const errorModel = resultModel.validateSync();
        const resultEValidatorHandlerError = ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

        if (errorModel === undefined &&
                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                        resultModel.save();

			return resultModel

        } else {
                return [errorModel, resultEValidatorHandlerError];
        }
}


const saveAll = (req, modelResult, arrayModel) => {

	return arrayModel.forEach(element => {
		const saveAllResult = new element(modelResult);
		saveAllResult.save();
		return saveAllResult;
	});

}

const postModelHandleError = (model) => {

	if (model[0] != undefined || model[1] != undefined) {
		return model;
	} else {
		return {};
	}
}

module.exports = {
    getModelWithValidator,
	postDataWithValidator,
	saveAll,
	postModelHandleError
}
