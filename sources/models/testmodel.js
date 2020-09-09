const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
	hysto3: [],
	hysto4: [String],
	hysto6: [[]],
	map: Map,
	mapOfString: {
  		type: Map,
  		of: String
	}
});

const modelTest = mongoose.model('Histo', testSchema, 'Histo');

module.exports = {
	modelTest
}
