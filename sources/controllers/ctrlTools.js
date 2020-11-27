const alreadyExist = (model, key, value) => {
	return new Promise((resolve, reject) => {
		model.findOne({ [key]: value })
			.then((result) => {
				if (result) {
					return reject(new Error(`Error : The value ${value} already exists. Please enter another value.`));
				}
				else {
					return resolve(value);
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
	})
};

const birthDay = (value) => {
	return new Promise((resolve, reject) => {
		var today = new Date();
		var birthDate = new Date(value);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		value = age;
		if (value >= 18) {
			return resolve(value);
		} else if (value <= 0) {
			return reject(new Error("Invalid BirthDay"));
		} else {
			return reject(new Error("Age under 18."));
		}
	})

}

const login = (model, value) => {
	const resultPassword = new Promise((resolve, reject) => {

		model.findOne({ email: value })
			.then((result) => {
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Email not found.'));
				}
			}).catch(err => {
				if (err)
					return reject(err);
			})
	})

	return resultPassword;
};

const passwordAlreadyExist = (model, value) => {

	if (value) {
		return new Promise((resolve, reject) => {
			model.findOne({ confirmationPassword: value })
				.then((result) => {
					if (result) {
						return resolve(result);
					}
					else {
						return reject(new Error('Invalid password or not found.'));
					}
				}).catch(err => {
					if (err)
						return reject(err.stack);
				})
		})
	}
	else
		return new Error("Password not find.");
};

const sameAccount = (model, body) => {
	return new Promise((resolve, reject) => {
		model.findOne({ email: body.email })
			.then((result) => {
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Invalid Account.'));
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
	})

};

module.exports = {
	alreadyExist,
	birthDay,
	login,
	passwordAlreadyExist,
	sameAccount
}
