const mongoose = require('mongoose');
const modelDrSignup = require('./modelDrSignup');

const drProfileSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'modelDrSignup'
	},
	lastName:
	{
		type: String,
		trim: true,
		minLength: 1,
		maxLength: 40,
		ref: 'modelDrSignup'
	},
	firstName:
	{
		type: String,
		trim: true,
		uppercase: true,
		minLength: 1,
		maxLength: 40,
		ref: 'modelDrSignup'
	},
	birthDay: {
		type: String,
		trim: true,
		ref: 'modelDrSignup',
	},
	age:
	{
		type: Number,
		trim: true,
		min: 18,
		max: 120,
		ref: 'modelDrSignup'
	},
	phoneNumber:
	{
		type: String,
		trim: true,
		ref: 'modelDrSignup'
	},
	address:
		[{
			_id: false,
			streetNumber: {
				type: Number,
				trim: true,
				min: 0,
				max: 9999,
				ref: 'modelDrSignup'
			},
			typeStreetNumber: {
				type: String,
				enum: ['', "bis", "ter", "quater"],
				trim: true,
				minLength: 0,
				maxLength: 6,
				ref: 'modelDrSignup'
			},
			typeStreet: {
				type: String,
				enum: ["rue", "avenue", "boulevard", "chemin", "quai"],
				trim: true,
				ref: 'modelDrSignup'
			},
			street: {
				type: String,
				trim: true,
				ref: 'modelDrSignup'
			},
			zipCode: {
				type: Number,
				trim: true,
				min: 00001,
				max: 99999,
				ref: 'modelDrSignup'
			},
			city: {
				type: String,
				trim: true,
				uppercase: true,
				ref: 'modelDrSignup'
			},
			country: {
				type: String,
				trim: true,
				uppercase: true,
				ref: 'modelDrSignup'
			}
		}],
	email:
	{
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
		ref: 'modelDrSignup'
	},
	password:
	{
		type: String,
		trim: true,
		minLength: 7,
		maxLength: 20,
		ref: 'modelDrSignup'
	},
	confirmationPassword:
	{
		type: String,
		trim: true,
		ref: 'modelDrSignup'
	},
	expertiseDomain:
	{
		type: String,
		trim: true,
		uppercase: true,
		ref: 'modelDrSignup'
	},
	socialNumber: //chiffre ? de base cetait idNumber
	{
		type: String,
		trim: true,
		unique: true,
		ref: 'modelDrSignup'
	},
	updated:
	{
		type: Date,
		default: Date.now,
		ref: 'modelDrSignup'
	}
});

drProfileSchema.pre('save', async function (req) {
	//GET AGE
	// var today = new Date();
	// var birthDate = new Date(this.birthDay);
	// var age = today.getFullYear() - birthDate.getFullYear();
	// var m = today.getMonth() - birthDate.getMonth();
	// if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	//     age--;
	// }
	// console.log(age);
	// this.age = age;
	// return age;
})

drProfileSchema.methods.generateAuthToken = async function () {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token
}

const modelDrProfile = mongoose.model('TEST-DrProfile', drProfileSchema, 'TEST-DrProfile');

module.exports = {
	modelDrProfile
}
