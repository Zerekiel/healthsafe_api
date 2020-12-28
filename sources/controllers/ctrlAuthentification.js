var modelDrSignin = require('../models/modelDrSignin');
var modelPatientSignin = require('../models/modelPatientSignin');

const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
	const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)

        const user = await modelDrSignin.modelDrSignin.findOne({ _id: data._id, 'tokens.token': token }) //sessionId
        if (!user) {
            // throw new Error()
            res.status(500).send({ error: 'TEST' })
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({ error: 'Not authorized to access this resource!' })
    }
}

const auth_v2 = async (req, res, next) => {
    try {
	const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)

    const dr = await modelDrSignin.modelDrSignin.findOne({ _id: data._id, 'tokens.token': token }) //sessionId
    const patient = await modelPatientSignin.modelPatientSignin.findOne({ _id: data._id, 'tokens.token': token }) //sessionId

    if (!dr && !patient) {
        throw new Error()
    }

    if (dr) {
        req.user = dr
        req.token = token
    } else if (patient) {
        req.user = patient
        req.token = token
    }

    next()
    } catch (error) {
        res.status(500).send({ error: 'Not authorized to access this resource' })
    }
}


module.exports = {
    auth,
    auth_v2
}
