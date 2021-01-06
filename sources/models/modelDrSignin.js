const mongoose = require('mongoose')
const mongodb = require('mongodb')

const validator = require('validator')
const jwt = require('jsonwebtoken')
const modelDrSignup = require('./modelDrSignup');
const sha3_512 = require('js-sha3').sha3_512;
const sha3_384 = require('js-sha3').sha3_384;

const ctrlUpdate = require('../controllers/ctrlUpdate');


const drSigninSchema = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		// required : false,
	    ref: 'modelDrSignup'
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
	idTransfert: [String]
});

drSigninSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;

    if (user.isModified('password')) {
        user.password = await sha3_512(sha3_384(user.password));
    }
    next()
})

drSigninSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}

drSigninSchema.methods.mygenerateSessionId = async function(req) {
	const user = this;

    var myQuery = { _id: new mongodb.ObjectId(user._id) };
    const objSessionId = await { sessionId: req.sessionID};
    user.sessions.sessionId = objSessionId.sessionId;
    const dataToChange = {sessions: [{
	    sessionId: req.sessionID
    }]};

   const res =  await modelDrSignin.findOneAndUpdate(myQuery, {$set: dataToChange}, {useFindAndModify: false});
    if (JSON.stringify(req.session) === '[]') {
	    return 'error session id';
    }
    return user.sessions[0].sessionID || user.sessions.sessionId;
}

drSigninSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.s
    const user = await modelDrSignin.findOne({email: email});
    const checkdb = await modelDrSignin.find({email: email});

    console.log(user);
    console.log(checkdb);

    if (JSON.stringify(checkdb) === '[]') {
	    return {error: 'No DATA in DB'}
    }

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
        const isPasswordMatch = (sha3_512(sha3_384(password)) === user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

var modelDrSignin = mongoose.model('TEST-DrSignin', drSigninSchema, 'TEST-DrSignin');

module.exports = {
	modelDrSignin
}
