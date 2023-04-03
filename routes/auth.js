const router = require('express').Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Validation Rule
const {Validation} = require('../helpers/ValidateFormInput');
// import secret key
const {USER_SECRET} = require('../config.js');

// import the model
const User = require('../models/User');
const Post = require('../models/Post');

// Register User
router.post('/register', async function(req, res, next){
	const errors = Validation.ValidateRegistration(req.body);
	const count = Validation.ErrorCount(errors);
	if(count > 0) {
		return res.status(403).json(errors);
	} else {
			try {
			const user = await User.findOne({email: req.body.email});
			if(user) {
				// email already exists
				errors.email = "Email already exists.";	
				return res.status(403).json(errors);
			} else {
				// Password Hashing
				const saltRounds = 10;
				const salt = await bcrypt.genSalt(saltRounds);
				const hashPassword = await bcrypt.hash(req.body.password, salt);
				req.body.password = hashPassword;
				const newUser = new User(req.body);
				const createdUser = await newUser.save();
				// jwt setup
				const token = await createdUser.generateAuthToken();
				return res.status(200).json({user, token: "Bearer " + token});
			}
		} catch(error) {
			res.status(500).json(error);
		}
	}
})


// Login User
router.post('/login', async function(req, res, next) {
	if(req.user) {

	}
	const errors = Validation.ValidateLogin(req.body);
	const count = Validation.ErrorCount(errors);
	if(count > 0) {
		return res.status(403).json(errors);
	} else {
		try {
			const user = await User.findOne({email: req.body.email});
			if(user) { // user found
				// matching the password
				const match = await bcrypt.compare(req.body.password, user.password);
				if(match) {
					// match the password
					// we need to send a token
					const token = await user.generateAuthToken();
					return res.status(200).json({user, token: "Bearer " + token});
				} else {
					// does not match the password
					errors.password = "Incorrect password";
					return res.status(403).json(errors);
				}
			} else {
				errors.email = "User does not exist";
				return res.status(404).json(errors);
			}
		} catch(error) {
			return res.status(403).json(error);
		}
	}
})

// Logout User
router.post("/logout", (req, res) => {
	return res.status(200).json("LGOUT");
})
module.exports = router;