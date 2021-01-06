const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const validator = require('validator')

const patientSignupSecuSchema = mongoose.Schema({
    lastName:
    {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    firstName:
    {
        type: String,
        required: true,
        trim: true,
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
        minLength: 4,
        maxLength: 6
    },
    phoneNumber:
    {
        type: String,
        required: true,
        trim: true
    },
    address:
        [{
            _id: false,
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
                min: 10,
                max: 10
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
    email:
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
    socialNumber: //chiffre ?
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

patientSignupSecuSchema.pre('save', async function (req) {})

patientSignupSecuSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token
}

const modelPatientSecuSignup = mongoose.model('TEST-PatientSecuSignup', patientSignupSecuSchema, 'TEST-PatientSecuSignup');

module.exports = {
    modelPatientSecuSignup
}
