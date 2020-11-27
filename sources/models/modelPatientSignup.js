const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const validator = require('validator')

const patientSignupSchema = mongoose.Schema({
	lastName :
	{
		type : String,
		required: true,
		trim : true,
		minLength: 1,
		maxLength: 40,
	},
	firstName :
	{
		type : String,
		required: true,
		trim : true,
		uppercase: true,
		minLength: 1,
		maxLength: 40
	},
	birthDay: {
		type: String,
		required: true,
		trim: true
	},
	age:
	{
		type: Number,
		required: true,
		trim: true,
		min: 18,
		max: 120
	},
	phoneNumber:
	{
		type: String,
		required: true,
		trim: true
	},
	address :
		[{
			_id : false,
			streetNumber: {
				type: Number,
				required: true,
				trim: true,
				min: 0,
				max: 9999
			},
			typeStreetNumber: {
			    type: String,
			    enum: ['', "bis", "ter", "quater"],
				trim: true,
				minLength: 0,
				maxLength: 6
			},
			typeStreet: {
			    type: String,
			    enum: ["rue", "avenue", "boulevard", "chemin", "quai"],
				trim: true,
				required: true
			},
			street: {
				type: String,
				required: true,
				trim: true
			},
			zipCode: {
				type: Number,
				required: true,
				trim: true,
				min: 00001,
				max: 99999
			},
			city: {
				type: String,
				required: true,
				trim: true,
				uppercase: true
			},
			country: {
				type: String,
				required: true,
				trim: true,
				uppercase: true
			}
		}],
	email :
	{
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true
	},
	password:
	{
		type: String,
		required: true,
		trim: true,
		minLength: 7,
		maxLength: 20
	},
	confirmationPassword:
	{
		type: String,
		required: true,
		trim: true
	},
	socialNumber : //chiffre ?
	{
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	updated:
	{
		type: Date,
		default: Date.now
	}
});

patientSignupSchema.pre('save', async function (req) {
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

patientSignupSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

const modelPatientSignup = mongoose.model('TEST-PatientSignup', patientSignupSchema, 'TEST-PatientSignup');

module.exports = {
	modelPatientSignup
}
