
const mongoose = require('mongoose');
const modelPatientSignup = require('./modelPatientSignup');


const patientDataSchema = mongoose.Schema({
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
	birthDay : {
		type: String,
		ref: 'modelPatientSignup',
		trim: true
	},
	age:
	{
		type: Number,
		// required: true,
		trim: true,
		min: 0,
		max: 120,
		ref: 'modelPatientSignup'
	},
	gender:
	{
		type: String,
		// required: true,
		enum: ["Male", "Female"],
		trim: true,
		min: 4,
		max: 6,
		ref: 'modelPatientSignup'
	},
	height:
	{
		type: Number,
		// required: true,
		trim: true,
		min: 1,
		max: 300,
		ref: 'modelPatientSignup'
	},
	weight:
	{
		type: Number,
		// required: true,
		trim: true,
		min: 1,
		max: 500,
		ref: 'modelPatientSignup'
	},
	emergencyNumber:
	{
		type: String,
		// required: true,
		trim: true,
		ref: 'modelPatientSignup'
	},
	allergies :
	{
		type: String,
		// required: true,
		trim: true,
		ref: 'modelPatientSignup'
	},
	image:
	{
		name: String,
        	desc: String,
        	img:
		{
            		data: Buffer,
            		contentType: String
        	}
	},
    medicalHistory:[String],
	/*{
		type: [],//tab string []
		// required: true,
		trim: true,
		//ref: 'modelPatientSignup'

	},*/
	bloodType:
	{
		type: String,
		enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
		trim: true,
		minLength: 2,
		maxLength: 3,
		ref: 'modelPatientSignup'
	},
	socialNumber :
	{
		type : String,
		trim : true,
		// required: true,
		unique: true,
		ref: 'modelPatientSignup'

	},
	treatments :
	{
		type : String,
		trim : true,
		ref: 'modelPatientSignup'
	},
	organDonation :
	{
		type : Boolean,
		trim : true,
		ref: 'modelPatientSignup'
	},
	doctor :
	{
		type : String,
		trim : true,
		minLength: 1,
		maxLength: 40,
		ref: 'modelPatientSignup'
	},
	updated:
	{
		type: Date,
		default: Date.now
	}
});

const modelPatientData = mongoose.model('TEST-PatientData', patientDataSchema, 'TEST-PatientData');

module.exports = {
	modelPatientData
}
