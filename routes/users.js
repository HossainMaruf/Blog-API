const router = require('express').Router();

// get the model
const User = require("../models/User");

// get user by id
router.get("/:userID", async function(req, res, next) {
		try {
			const user = await User.findById(req.params.userID);
			if(user) {
				return res.status(200).json(user);
			} else {
				return res.status(404).json("User not found");
			}
		} catch(error) {
			return res.status(500).json("Something went wrong!");	
		}
})

module.exports = router;