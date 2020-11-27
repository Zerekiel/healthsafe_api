const mongodb = require('mongodb');

const findAllData = (model) => {
	if (model) {
		return new Promise((resolve, reject) => {
			model.find()
			.then((result) => {
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Data not found.').stack);
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
		})
	}
	else
		return new Error("JSON model not found.").stack;
}

const findUserByID = async (model, jsonID) => {
	var myQuery = { _id: new mongodb.ObjectId(jsonID) };

	return new Promise((resolve, reject) => {
		model.find(myQuery)
			.then(result => {
				if (JSON.stringify(result) != '[]') {
					return resolve(result);
				} else if (JSON.stringify(result) === '[]') {
					return resolve(result);
				} else {
					return reject(new Error("findUserByID ERROR").stack);
				}
			})
			.catch(err => {
				return reject(err.stack);
			})
	})
}

const findUserByEmail = async (model, jsonEmail) => {
	return new Promise((resolve, reject) => {
		model.find(jsonEmail)
			.then(result => {
				if (JSON.stringify(result) != '[]') {
					return resolve(result);
				} else if (JSON.stringify(result) === '[]') {
					return resolve(result);
				} else {
					return reject(new Error("findUserByEmail ERROR").stack);
				}
			})
			.catch(err => {
				return reject(err.stack);
			})
	})
}

module.exports = {
	findUserByID,
	findAllData,
	findUserByEmail
}
