const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const sha3_512 = require('js-sha3').sha3_512;
const sha3_384 = require('js-sha3').sha3_384;
const modelPatientSignup = require('./modelPatientSignup');

const patientSigninSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		// required : false,
		ref: 'modelPatientSignup'
	},
	email :
	{
		type : String,
		// required : true,
		trim : true
	},
	password :
	{
		type : String,
		// required : true,
		trim : true,
		minLength: 7,
		maxLength: 20
	},
	tokens: [{
		token: {
			type: String,
			// required: true
		}
	}],
	sessions: [{
		sessionId: {
			type: String,
			// _id: false
			// required: true
		}
	}],
});

patientSigninSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;

    if (user.isModified('password')) {
        user.password = await sha3_512(sha3_384(user.password));
    }
    next()
})

patientSigninSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

patientSigninSchema.methods.mygenerateSessionId = async function(req) {
    // Generate an auth token for the user
    // Generate an auth token for the user
    const user = this;
    if (req.sessionID && req.session.cookie) {
	    const objSessionId = { sessionId: req.sessionID };
	    await user.updateOne({sessions: [{sessionId: req.sessionID}]});
	    await user.save();
    }
    if (JSON.stringify(user.sessions) === '[]') {
	    return 'error session id';
    }
    return user.sessions[0].sessionId;
}

patientSigninSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.s
    const user = await modelPatientSignin.findOne({email: email});

    if (!user) {
		return ({error: 'Invalid login credentials'})
        // throw new Error({ error: 'Invalid login credentials' })
    }
		const isPasswordMatch = (sha3_512(sha3_384(password)) === user.password);
    if (!isPasswordMatch) {
		return ({error: 'Invalid login credentials'})
        // throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

var modelPatientSignin = mongoose.model('TEST-PatientSignin', patientSigninSchema, 'TEST-PatientSignin');

module.exports = {
	modelPatientSignin
}
