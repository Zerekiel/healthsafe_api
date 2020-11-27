const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const validator = require('validator')

const DrSignupSecuSchema = mongoose.Schema({
	lastName :
	{
		type : String,
		required: true,
		trim : true,
		minLength: 1,
		maxLength: 100,
	},
	firstName :
	{
		type : String,
		required: true,
		trim : true,
		minLength: 1,
		maxLength: 100
	},
	birthDay: {
		type: String,
		required: true,
		trim: true
	},
	age:
	{
		type: String,
		required: true,
		trim: true,
		minLength: 2,
		maxLength: 6
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
				type: String,
				required: true,
				trim: true,
				minLength: 2,
				maxLength: 10
			},
			typeStreetNumber: {
				type: String,
				trim: true,
				minLength: 0,
				maxLength: 12
			},
			typeStreet: {
				type: String,
				trim: true,
				required: true
			},
			street: {
				type: String,
				required: true,
				trim: true
			},
			zipCode: {
				type: String,
				required: true,
				trim: true,
				minLength: 2,
				maxLength: 10
			},
			city: {
				type: String,
				required: true,
				trim: true
			},
			country: {
				type: String,
				required: true,
				trim: true
			}
		}],
	email :
	{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password:
	{
		type: String,
		required: true,
		trim: true,
		minLength: 14,
		maxLength: 40
	},
	confirmationPassword:
	{
		type: String,
		required: true,
		trim: true
	},
	expertiseDomain :
	{
		type : String,
		trim : true
	},
	idNumber : //chiffre ? changer en social number
	{
		type: String,
		trim: true,
		required: true,
		unique: true
	},
	socialNumber : //chiffre ? changer en social number
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

DrSignupSecuSchema.pre('save', async function (req) {
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

DrSignupSecuSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

const modelDrSignupSecu = mongoose.model('TEST-DrSignuSecu', DrSignupSecuSchema, 'TEST-DrSignupSecu');

module.exports = {
	modelDrSignupSecu
}
