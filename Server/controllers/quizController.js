const { v4: uuidv4 } = require('uuid');
const QuizModel = require("../models/quiz");


const createQuiz = async (req, res, next) => {
  try {
    const { quiz_name, quiz_type, option_type, timer, questions } = req.body.formData;

    // Validate required fields
    if (
      !quiz_name ||
      !quiz_type ||
      !option_type ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "All fields are required",
          field: "quiz_name, quiz_type, option_type, timer, questions",
        });
    }

    // Validating Quiz Name
    if (typeof quiz_name !== "string" || quiz_name.trim() === "") {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "Invalid quiz name",
          field: "quiz_name",
        });
    }

    // Validating Quiz Type
    if (!["qa", "poll"].includes(quiz_type)) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "Invalid quiz type",
          field: "quiz_type",
        });
    }

    // Validating Option Tyoe
    if (!["text", "image", "text_image"].includes(option_type)) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "Invalid option type",
          field: "option_type",
        });
    }

    // Validating timer count
    if (typeof timer !== "number" || timer < 0) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "Invalid timer value",
          field: "timer",
        });
    }

    // Validating questions of the quiz
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({
          error: "Validation failed",
          message: "At least one question is required",
          field: "questions",
        });
    }

    // Validating each question of the quiz
    questions.forEach((question) => {
      if (
        !question.question ||
        !Array.isArray(question.options) ||
        question.options.length < 2 ||
        !Number.isInteger(question.correctAnswerIndex) ||
        question.correctAnswerIndex < 0 ||
        question.correctAnswerIndex >= question.options.length
      ) {
        return res
          .status(400)
          .json({
            error: "Validation failed",
            message: `Invalid question at index ${i}`,
            field: `questions[${i}]`,
          });
      }
      // Validate each option
      for (let j = 0; j < question.options.length; j++) {
        const option = question.options[j];
        if (
          option_type === "text" &&
          (!option.text ||
            typeof option.text !== "string" ||
            option.text.trim() === "")
        ) {
          return res
            .status(400)
            .json({
              error: "Validation failed",
              message: `Invalid text option at index ${j} in question ${i}`,
              field: `questions[${i}].options[${j}].text`,
            });
        }
        if (
          option_type === "image" &&
          (!option.imageUrl ||
            typeof option.imageUrl !== "string" ||
            option.imageUrl.trim() === "")
        ) {
          return res
            .status(400)
            .json({
              error: "Validation failed",
              message: `Invalid image URL option at index ${j} in question ${i}`,
              field: `questions[${i}].options[${j}].imageUrl`,
            });
        }
        if (
          option_type === "text_image" &&
          (!option.text ||
            typeof option.text !== "string" ||
            option.text.trim() === "") &&
          (!option.imageUrl ||
            typeof option.imageUrl !== "string" ||
            option.imageUrl.trim() === "")
        ) {
          return res
            .status(400)
            .json({
              error: "Validation failed",
              message: `Invalid text or image URL option at index ${j} in question ${i}`,
              field: `questions[${i}].options[${j}]`,
            });
        }
      }
    });

    const quizId = uuidv4();
    let quizLink = `http://localhost:3000/quiz/${quizId}`

    const newQuiz = new QuizModel({
      quizId,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    let resp = await newQuiz.save();

    if (resp) {
      return res.status(201).json({ message: "Quiz created successfully" , quizLink });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuiz }