const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')

router.post("/create-quiz",quizController.createQuiz)
// router.post("/edit",authController.loginUser)

module.exports = router;