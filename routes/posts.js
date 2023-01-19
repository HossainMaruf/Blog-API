const router = require('express').Router();
// Get the model
const Post = require('../models/Post');
const User = require('../models/User');

// create a post
router.post('/create', async function(req, res, next) {
	const newPost = new Post(req.body);
	try {
		const createdPost = await newPost.save();
		return res.status(200).json(createdPost);
	} catch(error) {
		return res.status(500).json('Post was not created.');
	}
})

// get all posts in collection
router.get('/', async function(req, res, next) {
	try {
		const posts = await Post.find();
		return res.status(200).json(posts);
	} catch(error) {
		return res.status(500).json("Something went wrong.");
	}
})

// get a single post based on post id
router.get('/:postID', async function(req, res, next) {
	try {
		const post = await Post.findById(req.params.postID);
		if(post) {
			return res.status(200).json(post);
		} else {
			return res.status(404).json("Post not found.");
		}
	} catch(error) {
		return res.status(500).json("Something went wrong.");
	}
})

// get all posts of a user
router.get('/user/:userID', async function(req, res, next) {
	try {
		const posts = await Post.find({userID: req.params.userID});
		if(posts.length > 0) {
			return res.status(200).json(posts);
		} else {
			return res.status(404).json("No post of this user");
		}
	} catch(error) {
		return res.status(500).json("Something went wrong.");
	}
})
/**
 * TODO: Delete one
 * TODO: Update one
 * TODO: like dislike
 * TODO: comment 
 * TOD: shares counter
 */
module.exports = router;
