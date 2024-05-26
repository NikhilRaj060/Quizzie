const { v4: uuidv4 } = require("uuid");
const QuizModel = require("../models/quiz");

const createQuiz = async (req, res, next) => {
  try {

    let userId = req?.currentUserId;

    const { quiz_name, quiz_type, option_type, timer, questions, impression } =
      req.body.formData;

    validatingEachField({
      res,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    const quizId = uuidv4();
    let quizLink = `http://localhost:3000/quiz/${quizId}`;

    questions.forEach((question) => {
      question.attempted = 0;
      question.peopleAttemptedCorrectAnswer = 0;
    });

    const newQuiz = new QuizModel({
      userId,
      quizId,
      quizLink,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
      impression: 0,
    });

    let resp = await newQuiz.save();

    if (resp) {
      return res
        .status(201)
        .json({ message: "Quiz created successfully", quizLink });
    }
  } catch (error) {
    next(error);
  }
};

const getQuizById = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    const { quizId } = req.params;

    console.log(quizId);

    if (!quizId) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Invalid quizId" });
    }

    let resp = await QuizModel.findOne({ quizId , userId});

    if (!resp) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found with given quizId",
      });
    }

    return res.status(200).json({ quiz: resp });
  } catch (error) {
    next(error);
  }
};

const editQuiz = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    const { quizId } = req.params;
    const { quiz_name, quiz_type, option_type, timer, questions, impression } =
      req.body.formData;

    validatingEachField({
      res,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    // Fetching the quiz details from the database
    let quiz = await QuizModel.findOne({ quizId , userId});

    // Check if the quiz exists fro the particular quizId
    if (!quiz) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found with the given quizId",
      });
    }

    // Updating the quiz details with the new data
    quiz.userId = userId;
    quiz.impression = impression;
    quiz.quiz_name = quiz_name;
    quiz.quiz_type = quiz_type;
    quiz.option_type = option_type;
    quiz.timer = timer;
    quiz.questions = questions;

    // Saving the updated quiz details back to the database for the updation
    await quiz.save();

    // Return success response
    return res.status(200).json({ message: "Quiz updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllDataOverview = async (req, res, next) => {
  try {

    let userId = req?.currentUserId;

    let resp = await QuizModel.find({userId});

    if (!resp) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found",
      });
    }

    let questionCount = resp.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.questions.length;
    }, 0);

    let totalImpressionCount = resp.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.impression;
    }, 0);

    let quizData = [];

    let quizOverview = [];

    quizOverview.push(
      quizCount = resp.length,
      questionCount,
      totalImpressionCount,
    )

    
    resp.forEach((res) => {
      let quiz = {
        quiz_name: res?.quiz_name,
        impression: res?.impression,
        createdAt : new Date(res.createdAt).toLocaleDateString('en-GB')
      };
      quizData.push(quiz);
    });

    const data = {
      quizOverview,
      quizData
    };

    return res
      .status(200)
      .json({ message: "Quiz fetched successfully", data: data });
  } catch (error) {
    next(error);
  }
};

const getAllQuiz = async (req, res, next) => {
  try {

    let userId = req?.currentUserId;

    let resp = await QuizModel.find({userId});

    if (!resp) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found",
      });
    }
    
    return res
      .status(200)
      .json({ message: "Quiz fetched successfully", data: resp });
  } catch (error) {
    next(error);
  }
};

const validatingEachField = ({
  res,
  quiz_name,
  quiz_type,
  option_type,
  timer,
  questions,
}) => {
  // Validating each required field individually
  if (!quiz_name) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Quiz name is required",
      field: "quiz_name",
    });
  }

  if (!quiz_type) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Quiz type is required",
      field: "quiz_type",
    });
  }

  if (!option_type) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Option type is required",
      field: "option_type",
    });
  }

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "At least one question is required",
      field: "questions",
    });
  }

  // Validating Quiz Name
  if (typeof quiz_name !== "string" || quiz_name.trim() === "") {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid quiz name",
      field: "quiz_name",
    });
  }

  // Validating Quiz Type
  if (!["qa", "pt"].includes(quiz_type)) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid quiz type",
      field: "quiz_type",
    });
  }

  // Validating Option Tyoe
  if (!["text", "image", "text_image"].includes(option_type)) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid option type",
      field: "option_type",
    });
  }

  // Validating timer count
  if (typeof timer !== "number" || timer < 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid timer value",
      field: "timer",
    });
  }

  // Validating questions of the quiz
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "At least one question is required",
      field: "questions",
    });
  }

  // Validating each question of the quiz
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Check if the question text is missing
    if (!question.question) {
      return res.status(400).json({
        error: "Validation failed",
        message: `Question ${i + 1} is missing text`,
        field: `questions[${i + 1}].question`,
      });
    }

    // Check if options are missing or less than 2
    if (!Array.isArray(question.options) || question.options.length < 2) {
      return res.status(400).json({
        error: "Validation failed",
        message: `Question ${i + 1} must have at least two options`,
        field: `questions[${i + 1}].options`,
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
        return res.status(400).json({
          error: "Validation failed",
          message: `Invalid text option ${j + 1} in question ${i + 1}`,
          field: `questions[${i + 1}].options[${j + 1}].text`,
        });
      }
      if (
        option_type === "image" &&
        (!option.imageUrl ||
          typeof option.imageUrl !== "string" ||
          option.imageUrl.trim() === "")
      ) {
        return res.status(400).json({
          error: "Validation failed",
          message: `Invalid image URL option ${j + 1} in question ${i + 1}`,
          field: `questions[${i + 1}].options[${j + 1}].imageUrl`,
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
        return res.status(400).json({
          error: "Validation failed",
          message: `Invalid text or image URL option ${j + 1} in question ${
            i + 1
          }`,
          field: `questions[${i + 1}].options[${j + 1}]`,
        });
      }
    }
    // Check if correctAnswerIndex is not a valid index
    if (
      (quiz_type != "pt" && !Number.isInteger(question.correctAnswerIndex)) ||
      question.correctAnswerIndex < 0 ||
      question.correctAnswerIndex >= question.options.length
    ) {
      return res.status(400).json({
        error: "Validation failed",
        message: `Question ${i + 1} has an invalid correctAnswerIndex`,
        field: `questions[${i + 1}].correctAnswerIndex`,
      });
    }
  }
};

module.exports = { createQuiz, getQuizById, editQuiz, getAllQuiz , getAllDataOverview };
