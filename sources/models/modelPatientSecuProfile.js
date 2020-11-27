const mongoose = require('mongoose');
const modelPatientSecuSignup = require('./modelPatientSignup');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const validator = require('validator')

const patientSecuProfileSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'modelPatientSecuSignup'
	},
	lastName :
	{
		type : String,
		// required: true,
		trim : true,
		minLength: 1,
		maxLength: 100,
        ref: 'modelPatientSecuSignup'
	},
	firstName :
	{
		type : String,
		// required: true,
		trim : true,
		uppercase: true,
		minLength: 1,
		maxLength: 100,
        ref: 'modelPatientSecuSignup'
	},
	birthDay: {
		type: String,
		// required: true,
		trim: true,
        ref: 'modelPatientSecuSignup',
	},
	age:
	{
		type: String,
		// required: true,
		trim: true,
        minLength: 4,
        maxLength: 6,
        ref: 'modelPatientSecuSignup'
	},
	phoneNumber:
	{
		type: String,
		// required: true,
		trim: true,
        ref: 'modelPatientSecuSignup'
	},
	address :
		[{
			_id : false,
			streetNumber: {
				type: String,
				// required: true,
				trim: true,
                minLength: 2,
                maxLength: 10,
                ref: 'modelPatientSecuSignup'
			},
			typeStreetNumber: {
				type: String,
				trim: true,
				minLength: 0,
				maxLength: 12,
                ref: 'modelPatientSecuSignup'
			},
			typeStreet: {
				type: String,
				trim: true,
				// required: true,
                ref: 'modelPatientSecuSignup'
			},
			street: {
				type: String,
				// required: true,
				trim: true,
                ref: 'modelPatientSecuSignup'
			},
			zipCode: {
				type: String,
				// required: true,
				trim: true,
                minLength: 10,
                maxLength: 10,
                ref: 'modelPatientSecuSignup'
			},
			city: {
				type: String,
				// required: true,
				trim: true,
                ref: 'modelPatientSecuSignup'
			},
			country: {
				type: String,
				// required: true,
				trim: true,
                ref: 'modelPatientSecuSignup'
			}
		}],
	email :
	{
		type: String,
		// required: true,
		trim: true,
		unique: true,
        ref: 'modelPatientSecuSignup'
	},
	password:
	{
		type: String,
		// required: true,
		trim: true,
		minLength: 14,
		maxLength: 40,
        ref: 'modelPatientSecuSignup'
	},
	confirmationPassword:
	{
		type: String,
		// required: true,
		trim: true,
        ref: 'modelPatientSecuSignup'
	},
	expertiseDomain :
	{
		type : String,
		trim : true,
		uppercase: true,
        ref: 'modelPatientSecuSignup'
	},
	socialNumber : //chiffre ?
	{
		type: String,
		trim: true,
		// required: true,
		unique: true,
        ref: 'modelPatientSecuSignup'
	},
	updated:
	{
		type: Date,
		default: Date.now,
        ref: 'modelPatientSecuSignup'
	}
});

patientSecuProfileSchema.pre('save', async function (req) {
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

patientSecuProfileSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

const modelPatientSecuProfile = mongoose.model('TEST-PatientSecuProfile', patientSecuProfileSchema, 'TEST-PatientSecuProfile');

module.exports = {
	modelPatientSecuProfile
}
