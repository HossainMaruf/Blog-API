const router = require('express').Router();
// import the model
const Question = require('../models/Question');

// create a question
router.post("/create", async (req, res, next) => {
	try {
		const createdQuestion = await Question.insertMany(req.body.questions);
		return res.status(200).json(createdQuestion);
	} catch(error) {
		return res.status(403).json("Could not create the question.");
	}
})

// get all the categories
router.get("/categories", async (req, res, next) => {
	try {
		const categories = await Question.find().distinct('category');
		return res.status(200).json(categories);
	} catch(error) {
		return res.status(403).json("Something went wrong");
	}
});

// get a specific question by questionID
router.get("/:questionID", async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionID);
    if (question) {
      return res.status(200).json(question);
    } else {
      return res.status(404).json("Question not found.");
    }
  } catch (error) {
  	console.log(error);
    return res.status(500).json("Something went wrong.");
  }
})

// delete a specific question by questionID
router.delete("/:questionID", async (req, res, next) => {
	try {
    await Question.deleteOne({ _id: req.params.questionID });
		return res.status(200).json("Successfully deleted the question");
	} catch(error) {
		return res.status(403).json('Could not delete the question');
	}
})



// get all the questions
router.get("/", async (req, res, next) => {
	 try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(403).json("Something went wrong.");
  }
})

module.exports = router;