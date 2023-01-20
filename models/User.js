const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
		username: {
			type: String,
			required: true,
			min: 3,
			max: 15
		},
		email: {
			type: String,
			required: true,
			max: 50
		},
		password: {
			type: String,
			required: true,
			min: 3,
			max: 30
		},
		isAdmin: {
			type: Boolean,
		  default: false
		},
		profilePicture: {
			type: String,
			default: ""
		},
		coverPicture: {
			type: String,
			default: ""
		},
		followers: {
			type: Array,
			default: []
		},
		followings: {
			type: Array,
			default: []
		},
		bio: {
			type: String
		},
		city: {
			type: String
		},
		relationship: {
			type: Number,
			enum: [1, 2, 3]	
		}
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);