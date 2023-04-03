const jwt = require('jsonwebtoken');
const User = require("../models/User");
const {USER_SECRET} = require('../config');

const auth = (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, USER_SECRET);
		const user = User.findOne({email: decoded.email, password: decoded.password, 'tokens.token': token});
		if(!user) {
			throw new Error('Authentication Fail');
		}
		req.user = user;
		next();
	} catch(error) {
		res.status(401).send({error: "Authentication Failed!"});
	}
}

module.exports = auth;