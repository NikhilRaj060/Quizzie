const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')
const verifyToken = require('../middleware/verifyAuth')

router.post("/create-quiz", verifyToken , quizController.createQuiz)
router.get("/get-quiz/:quizId" , quizController.getQuizById)
router.get("/get-all-quiz" , verifyToken , quizController.getAllQuiz)
router.get("/get-quiz-question-overview" , verifyToken , quizController.getAllDataOverview)
router.put("/edit-quiz/:quizId" , verifyToken , quizController.editQuiz)
router.put("/update-quiz/:quizId" , quizController.updateQuiz)
router.put("/delete-quiz/:quizId" , verifyToken , quizController.deleteQuiz)

module.exports = router;