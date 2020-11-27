var modelDrSignin = require('../models/modelDrSignin');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
	const token = req.header('Authorization').replace('Bearer ', '')
	const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await modelDrSignin.modelDrSignin.findOne({ _id: data._id, 'tokens.token': token }) //sessionId
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = {
	auth
}
