var modelSignin = require('../../models/modelSignin');
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
	    const token = req.header('Authorization').replace('Bearer ', '')
	    const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await modelSignin.modelSignin.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
	    console.log(error.stack)
        res.status(500).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = {
	auth
}
