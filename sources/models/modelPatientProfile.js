const mongoose = require('mongoose');
const modelPatientSignup = require('./modelPatientSignup');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const validator = require('validator')

const patientProfileSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'modelPatientSignup'
	},
	lastName :
	{
		type : String,
		// required: true,
		trim : true,
		minLength: 1,
		maxLength: 40,
		ref: 'modelPatientSignup'
	},
	firstName :
	{
		type : String,
		// required: true,
		trim : true,
		uppercase: true,
		minLength: 1,
		maxLength: 40,
		ref: 'modelPatientSignup'
	},
	birthDay: {
		type: String,
		// required: true,
		trim: true,
		ref: 'modelPatientSignup',
	},
	age:
	{
		type: Number,
		// required: true,
		trim: true,
		min: 18,
		max: 120,
		ref: 'modelPatientSignup'
	},
	phoneNumber:
	{
		type: String,
		// required: true,
		trim: true,
		ref: 'modelPatientSignup'
	},
	address :
		[{
			_id : false,
			streetNumber: {
				type: Number,
				// required: true,
				trim: true,
				min: 0,
				max: 9999,
				ref: 'modelPatientSignup'
			},
			typeStreetNumber: {
				type: String,
				enum: ['', "bis", "ter", "quater"],
				trim: true,
				minLength: 0,
				maxLength: 6,
				ref: 'modelPatientSignup'
			},
			typeStreet: {
				type: String,
				enum: ["rue", "avenue", "boulevard", "chemin", "quai"],
				trim: true,
				// required: true,
				ref: 'modelPatientSignup'
			},
			street: {
				type: String,
				// required: true,
				trim: true,
				ref: 'modelPatientSignup'
			},
			zipCode: {
				type: Number,
				// required: true,
				trim: true,
				min: 00001,
				max: 99999,
				ref: 'modelPatientSignup'
			},
			city: {
				type: String,
				// required: true,
				trim: true,
				uppercase: true,
				ref: 'modelPatientSignup'
			},
			country: {
				type: String,
				// required: true,
				trim: true,
				uppercase: true,
				ref: 'modelPatientSignup'
			}
		}],
	email :
	{
		type: String,
		// required: true,
		trim: true,
		unique: true,
		lowercase: true,
		ref: 'modelPatientSignup'
	},
	password:
	{
		type: String,
		// required: true,
		trim: true,
		minLength: 7,
		maxLength: 20,
		ref: 'modelPatientSignup'
	},
	confirmationPassword:
	{
		type: String,
		// required: true,
		trim: true,
		ref: 'modelPatientSignup'
	},
	expertiseDomain :
	{
		type : String,
		trim : true,
		uppercase: true,
		ref: 'modelPatientSignup'
	},
	socialNumber : //chiffre ?
	{
		type: String,
		trim: true,
		// required: true,
		unique: true,
		ref: 'modelPatientSignup'
	},
	updated:
	{
		type: Date,
		default: Date.now,
		ref: 'modelPatientSignup'
	}
});

patientProfileSchema.pre('save', async function (req) {
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

patientProfileSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

const modelPatientProfile = mongoose.model('TEST-PatientProfile', patientProfileSchema, 'TEST-PatientProfile');

module.exports = {
	modelPatientProfile
}
