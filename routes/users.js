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

// follow unfollow a user
router.post("/:userID", async function(req, res, next) {
		try {
			const user = await User.findById(req.params.userID);
			const loggedInUser = await User.findById(req.body.userID);
			if(user && loggedInUser) {
				if(user.followers.includes(loggedInUser._id)) {
					// already loginUser is a follower
					await user.updateOne({$pull: {followers: loggedInUser._id}});
					// remove from the following list for loggedInUser
					await loggedInUser.updateOne({$pull: {followings: user._id}});
				  return res.status(200).json({isFollower: false, message: `You unfollow ${user.username}`});
				} else {
					// loginUser is now following this user
					await user.updateOne({$push: {followers: loggedInUser._id}});
					// push to the followings list for loggedInUser
					await loggedInUser.updateOne({$push: {followings: user._id}});
				  return res.status(200).json({isFollower: true, message: `You are following ${user.username}`});
				}
			} else {
				throw new Exception("Something went wrong");
			}
		}	catch(error) {
			return res.status(500).json(error);	
		}	
})

// get all users in collection
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json("Something went wrong.");
  }
})
module.exports = router;