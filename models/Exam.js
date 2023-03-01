const mongoose = require('mongoose')
const examSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	questions: {
		type: [], // question id need to be pushed here
		required: true,
	},
	answers: {
		type: [], // answers should be pushed here
		required: true,
	},
	attempts: {
		type: Number,
	},
	wrongAnswer: {
		type: Number,
	},
	category: { // hard, medium, easy
		type: String,
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

module.exports = mongoose.model('Exam', examSchema);