const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const modelSignupPatient = require('./modelSignupPatient');


const signinPatientSchema = mongoose.Schema({
	email :
	{
		type : String,
		required : true,
		trim : true
	},
	password :
	{
		type : String,
		required : true,
		trim : true
		// minLength: 7,
		// maxLength: 20
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]

});

signinPatientSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next()
})

signinPatientSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}


signinPatientSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.s
    // console.log("HAAAAAAAAAAAAAAAA")
    // console.log(email)


    const user = await modelSignupPatient.modelSignupPatient.findOne({email: email});
console.log(user)
console.log(password)
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log("2")
console.log(password)
console.log(user.password)
        const isPasswordMatch = await bcrypt.compare(password, user.password)
	console.log("3")

    if (!isPasswordMatch) {
	    console.log("4")

        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log("5")

    return user
}

var modelSigninPatient = mongoose.model('signinPatient', signinPatientSchema, 'signinPatient');

module.exports = {
	modelSigninPatient
}
