const mongoose = require('mongoose');



const idSchema = mongoose.Schema({
	id: String
});

const modelId = mongoose.model('ReceiveID', idSchema, 'ReceiveID');

module.exports = {
	modelId
}
