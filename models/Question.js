const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
	userID: {
		type: String,
		// required: true
	},
	name: {
		type: String,
		required: true,
	},
	options: {
		type: [],
		required: true,
	},
	answer: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
	status: {
		type: String,
		default: "Visible" // another is Hidden
	},
	likes: {
		type: Array,
		default: []
	},
	comments: {
		type: Array,
		default: []
	},
	shares: {
		type: Array,
		default: []
	}
},
	{timestamps: true}	
); 

module.exports = mongoose.model('Question', questionSchema);