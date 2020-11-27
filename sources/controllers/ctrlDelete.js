const mongodb = require('mongodb');

const findUserAndDelete = (model, jsonId) => {
	const myQuery = { _id: new mongodb.ObjectId(jsonId) };

	return model.findOneAndDelete(myQuery)
		.then(result => {
			if (result === null) {
				const msg = { msg: "There are no data.", result: "[]" };
				return msg;
			} else if (result) {
				return result
			} else {
				return new Error('FindUserAndDelete Error').stack;
			}
		})
		.catch(err => {
			return err.stack;
		})
}

module.exports = {
	findUserAndDelete
}
