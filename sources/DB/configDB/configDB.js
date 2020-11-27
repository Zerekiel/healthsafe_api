// FOR DEV
if (process.env.NODE_ENV !== 'production')
        require('dotenv').config();
// SETTING VAR ENV
const username_db = process.env.USERNAME_DB;
const password_db = process.env.PASSWORD_DB;
const hostlist_db = process.env.HOSTLIST_DB;
const database_db = process.env.DATABASE_DB;
const authSource_db = process.env.AUTHSOURCE_DB;

// Var / OBJ
const url_db = `mongodb+srv://${username_db}:${password_db}@${hostlist_db}.mongodb.net/${database_db}?authSource=${authSource_db}`;
const optionDB = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
};

// EXPORT AND CREATION OF THE DB URL
module.exports = {
	url_db,
	optionDB
}
//
// if (process.env.NODE_ENV === 'production')
//         module.exports = {
//         	url_db: 'mongodb+srv://admin:admin@cluster0-rjtu9.mongodb.net/HealthSafe?authSource=admin'
//         }
