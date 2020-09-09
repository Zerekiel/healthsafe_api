const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
});

const modelImage = mongoose.model('image', imageSchema, 'image');

module.exports = {
	modelImage
}
