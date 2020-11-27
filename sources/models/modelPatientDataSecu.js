
const mongoose = require('mongoose');
const modelPatientSecuSignup = require('./modelPatientSecuSignup');


const patientDataSecuSchema = mongoose.Schema({
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
		minLength: 1,
		maxLength: 100,
        ref: 'modelPatientSecuSignup'
	},
	birthDay : {
		type: String,
        ref: 'modelPatientSecuSignup',
		trim: true
	},
	age:
	{
		type: String,
		// required: true,
		trim: true,
        minLength: 4,
        maxLength: 100,
        ref: 'modelPatientSecuSignup'
	},
	gender:
	{
		type: String,
		// required: true,
		trim: true,
        minLength: 10,
        maxLength: 12,
        ref: 'modelPatientSecuSignup'
	},
	height:
	{
		type: String,
		// required: true,
		trim: true,
        minLength: 2,
        maxLength: 6,
        ref: 'modelPatientSecuSignup'
	},
	weight:
	{
		type: String,
		// required: true,
		trim: true,
        minLength: 2,
        maxLength: 6,
        ref: 'modelPatientSecuSignup'
	},
	emergencyNumber:
	{
		type: String,
		// required: true,
		trim: true,
        ref: 'modelPatientSecuSignup'
	},
	allergies :
	{
		type: String,
		// required: true,
		trim: true,
        ref: 'modelPatientSecuSignup'
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
		type: [[String]],//tab string []
		// required: true,
		trim: true,
        //ref: 'modelPatientSecuSignup'

	},*/
	bloodType:
	{
		type: String,
		trim: true,
		minLength: 4,
		maxLength: 6,
        ref: 'modelPatientSecuSignup'
	},
	socialNumber :
	{
		type : String,
		trim : true,
		// required: true,
		unique: true,
        ref: 'modelPatientSecuSignup'

	},
	treatments :
	{
		type : String,
		trim : true,
        ref: 'modelPatientSecuSignup'
	},
	organDonation :
	{
		type : String,
		trim : true,
        ref: 'modelPatientSecuSignup'
	},
	doctor :
	{
		type : String,
		trim : true,
		minLength: 2,
		maxLength: 200,
        ref: 'modelPatientSecuSignup'
	},
	updated:
	{
		type: Date,
		default: Date.now
	}
});

const modelPatientDataSecu = mongoose.model('TEST-PatientDataSecu', patientDataSecuSchema, 'TEST-PatientDataSecu');

module.exports = {
    modelPatientDataSecu
}
