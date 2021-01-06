const mongoose = require('mongoose');
const configDB = require('../configDB/configDB');

// controller DB connection
const authDB = () => {
	return new Promise((resolve, reject) => {
		if (mongoose) {
			// Connection
			return resolve(mongoose.connect(configDB.url_db, configDB.optionDB));
		} else {
			//Error
			return reject(console.error('DB Connection error.'));
		}
	})
	.catch(err => {
		// Catch Error
		return err.stack;
	});
}

// IF is connected or not
const isConnected = () => {
	return new Promise((resolve, reject) => {
		const db = mongoose.connection;

		if (db) {
			return resolve(db.once('open', function() {
				return true;
				})
			);
		} else {
			return reject(db.on('error',
			console.error.bind(
				console, 'DB Connection error -> Connection Failed.'),
				() => {
					return false;
				}));
		}
	}). catch((err) => {
		console.error(`Error DataBase connection :\n${err.stack}`);
		return err.stack;
	})
};

//disconnect
const unAuthDB = () => {
	return new Promise((resolve, reject) => {
		const db = mongoose.connection;

		if (db) {
			// Deconnection
			db.on('disconnected', () => {});
			return resolve(mongoose.connect(configDB.url_db,
				configDB.optionDB,
				db.close(function() {
					console.log("\nMongoose default connection is disconnected due to application termination");
					process.exit(0);
				})
			));
		} else {
			//Error
			return reject(console.error('DB Deconnection error.'));
		}
	})
	.catch(err => {
		// Catch Error
		console.error(`Deconnection DataBase Error :\n${err.stack}`);
		return err.stack;
	});
}
module.exports = {
	authDB,
	isConnected,
	unAuthDB
};
