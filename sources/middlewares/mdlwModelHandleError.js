const postModelHandleError = async (model, res) => {

	if (model[0] != undefined || model[1] != undefined) {
		return res.status(500).send(model);
	} else {
		return res.status(200).send(model);
	}
}

module.exports = {
	postModelHandleError
}
