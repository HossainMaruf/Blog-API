const router = require('express').Router();

const Exam = require('../models/Exam');
const Question = require('../models/Question');

router.post('/initialize', async function (req, res, next) {
	try {
		const questionsList = [];
		const {categories} = req.body;
		const cat_len = categories.length;
		for(let i=0; i<cat_len; ++i) {
			var questions = await Question.find({category: categories[i].category}).limit(categories[i].count);
			questionsList.push(...questions);
		}
		// console.log(questionsList);
		return res.status(200).json({questions: questionsList});
	} catch(error) {
		return res.status(403).json("Something went wrong");
	}
});

router.post('/:examID/answers', async (req, res, next) => {
	// req.body.answers is key value pairs of questionID and submitted answer
	// console.log(req.body.answers);

	// GET ONLY THE QUESTION ID
	const questionsID = [];
	const submittedAnswers = [];	
	req.body.answers.forEach(record => {
		questionsID.push(record.questionID);
		submittedAnswers.push(record.submittedAnswer);
	});
  const records = await Question.find().where('_id').in(questionsID).exec();
	return res.status(200).json(records);
})

module.exports = router;
