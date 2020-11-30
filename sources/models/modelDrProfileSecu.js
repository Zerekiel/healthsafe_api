const mongoose = require('mongoose');
const modelDrSignupSecu = require('./modelDrSignupSecu');

const drProfileSecuSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'modelDrSignupSecu'
	},
	lastName:
	{
		type: String,
		trim: true,
		minLength: 1,
		maxLength: 100,
		ref: 'modelDrSignupSecu'
	},
	firstName:
	{
		type: String,
		trim: true,
		uppercase: true,
		minLength: 1,
		maxLength: 100,
		ref: 'modelDrSignupSecu'
	},
	birthDay: {
		type: String,
		trim: true,
		ref: 'modelDrSignupSecu',
	},
	age:
	{
		type: String,
		trim: true,
		minLength: 2,
		maxLength: 6,
		ref: 'modelDrSignupSecu'
	},
	phoneNumber:
	{
		type: String,
		trim: true,
		ref: 'modelDrSignupSecu'
	},
	address:
		[{
			_id: false,
			streetNumber: {
				type: String,
				trim: true,
				minLength: 2,
				maxLength: 10,
				ref: 'modelDrSignupSecu'
			},
			typeStreetNumber: {
				type: String,
				trim: true,
				minLength: 0,
				maxLength: 12,
				ref: 'modelDrSignupSecu'
			},
			typeStreet: {
				type: String,
				trim: true,
				ref: 'modelDrSignupSecu'
			},
			street: {
				type: String,
				trim: true,
				ref: 'modelDrSignupSecu'
			},
			zipCode: {
				type: String,
				trim: true,
				minLength: 2,
				maxLength: 10,
				ref: 'modelDrSignupSecu'
			},
			city: {
				type: String,
				trim: true,
				ref: 'modelDrSignupSecu'
			},
			country: {
				type: String,
				trim: true,
				ref: 'modelDrSignupSecu'
			}
		}],
	email:
	{
		type: String,
		trim: true,
		unique: true,
		ref: 'modelDrSignupSecu'
	},
	password:
	{
		type: String,
		trim: true,
		minLength: 14,
		maxLength: 40,
		ref: 'modelDrSignupSecu'
	},
	confirmationPassword:
	{
		type: String,
		trim: true,
		ref: 'modelDrSignupSecu'
	},
	expertiseDomain:
	{
		type: String,
		trim: true,
		ref: 'modelDrSignupSecu'
	},
	idNumber: //chiffre ? de base cetait idNumber
	{
		type: String,
		trim: true,
		// required: true,
		unique: true,
		ref: 'modelDrSignupSecu'
	},
	socialNumber: //chiffre ? de base cetait idNumber
	{
		type: String,
		trim: true,
		unique: true,
		ref: 'modelDrSignupSecu'
	},
	updated:
	{
		type: Date,
		default: Date.now,
		ref: 'modelDrSignupSecu'
	}
});

drProfileSecuSchema.pre('save', async function (req) {
	//GET AGE
})

drProfileSecuSchema.methods.generateAuthToken = async function () {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token
}

const modelDrProfileSecu = mongoose.model('TEST-DrProfileSecu', drProfileSecuSchema, 'TEST-DrProfileSecu');

module.exports = {
	modelDrProfileSecu
}
