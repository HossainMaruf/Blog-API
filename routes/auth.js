const router = require('express').Router();


// Register User
router.post('/register', function(req, res, next) {
	res.send("From register page");
})


// Login User
router.get('/login', function(req, res, next) {
	res.send("From login page");
})
// Register User
