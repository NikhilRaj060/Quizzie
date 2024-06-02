const { v4: uuidv4 } = require("uuid");
const QuizModel = require("../models/quiz");

const createQuiz = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;

    const { quiz_name, quiz_type, option_type, timer, questions, impression } =
      req.body;

    const isValid = validatingEachField({
      res,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    if (!isValid) return;

    const quizId = uuidv4();
    let quizLink = `${process.env.FRONTEND_URL}/quiz/${quizId}`;

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
    const { quizId } = req.params;

    if (!quizId) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Invalid quizId" });
    }

    let quiz = await QuizModel.findOne({ quizId });

    if (!quiz) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found with given quizId",
      });
    }

    quiz.impression += 1;
    await quiz.save();

    return res.status(200).json({ quiz });
  } catch (error) {
    next(error);
  }
};

const editQuiz = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    const { quizId } = req.params;
    const { quiz_name, quiz_type, option_type, timer, questions, impression } =
      req.body;

    const isValid = validatingEachField({
      res,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    if (!isValid) return;

    // Fetching the quiz details from the database
    let quiz = await QuizModel.findOne({ quizId, userId });

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

const updateQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { quiz_name, quiz_type, option_type, timer, questions, impression } =
      req.body;

    // Validate each field
    const isValid = validatingEachField({
      res,
      quiz_name,
      quiz_type,
      option_type,
      timer,
      questions,
    });

    if (!isValid) return;

    // Fetching the quiz details from the database using quizId
    let quiz = await QuizModel.findOne({ quizId });

    // Check if the quiz exists for the particular quizId
    if (!quiz) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found with the given quizId",
      });
    }

    // Updating the quiz details with the new data
    if (quiz_name) quiz.quiz_name = quiz_name;
    if (quiz_type) quiz.quiz_type = quiz_type;
    if (option_type) quiz.option_type = option_type;
    if (timer) quiz.timer = timer;
    if (questions) quiz.questions = questions;
    if (impression) quiz.impression = impression;

    // Saving the updated quiz details back to the database
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

    let resp = await QuizModel.find({ userId });

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
      (quizCount = resp.length),
      questionCount,
      totalImpressionCount
    );

    resp.forEach((res) => {
      if ( res?.impression?.length > 10) {
        let quiz = {
          quiz_name: res?.quiz_name,
          impression: res?.impression,
          createdAt: new Date(res.createdAt).toLocaleDateString("en-GB"),
        };
        quizData.push(quiz);
      }
    });

    quizData.sort((a, b) => b.impression - a.impression);

    const data = {
      quizOverview,
      quizData,
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

    let resp = await QuizModel.find({ userId });

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

const deleteQuiz = async (req, res, next) => {
  try {
    let userId = req?.currentUserId;
    const { quizId } = req.params;

    if (!quizId) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Invalid quizId" });
    }

    let quiz = await QuizModel.findOneAndDelete({ quizId, userId });

    if (!quiz) {
      return res.status(404).json({
        error: "Validation failed",
        message: "No quiz found with given quizId",
      });
    }

    return res.status(200).json({ message: "Quiz deleted successfully" });
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
    res.status(400).json({
      error: "Validation failed",
      message: "Quiz name is required",
      field: "quiz_name",
    });
    return false;
  }

  if (!quiz_type) {
    res.status(400).json({
      error: "Validation failed",
      message: "Quiz type is required",
      field: "quiz_type",
    });
    return false;
  }

  if (!option_type) {
    res.status(400).json({
      error: "Validation failed",
      message: "Option type is required",
      field: "option_type",
    });
    return false;
  }

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    res.status(400).json({
      error: "Validation failed",
      message: "At least one question is required",
      field: "questions",
    });
    return false;
  }

  // Validating Quiz Name
  if (typeof quiz_name !== "string" || quiz_name.trim() === "") {
    res.status(400).json({
      error: "Validation failed",
      message: "Invalid quiz name",
      field: "quiz_name",
    });
    return false;
  }

  // Validating Quiz Type
  if (!["qa", "pt"].includes(quiz_type)) {
    res.status(400).json({
      error: "Validation failed",
      message: "Invalid quiz type",
      field: "quiz_type",
    });
    return false;
  }

  // Validating Option Type
  if (!["text", "image", "text_image"].includes(option_type)) {
    res.status(400).json({
      error: "Validation failed",
      message: "Invalid option type",
      field: "option_type",
    });
    return false;
  }

  // Validating timer count
  if (typeof timer !== "number" || timer < 0) {
    res.status(400).json({
      error: "Validation failed",
      message: "Invalid timer value",
      field: "timer",
    });
    return false;
  }

  // Validating questions of the quiz
  if (!Array.isArray(questions) || questions.length === 0) {
    res.status(400).json({
      error: "Validation failed",
      message: "At least one question is required",
      field: "questions",
    });
    return false;
  }

  // Validating each question of the quiz
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Check if the question text is missing
    if (!question.question) {
      res.status(400).json({
        error: "Validation failed",
        message: `Question is missing in Question ${i + 1}`,
        field: `questions[${i + 1}].question`,
      });
      return false;
    }

    // Check if options are missing or less than 2
    if (!Array.isArray(question.options) || question.options.length < 2) {
      res.status(400).json({
        error: "Validation failed",
        message: `Question ${i + 1} must have at least two options`,
        field: `questions[${i + 1}].options`,
      });
      return false;
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
        res.status(400).json({
          error: "Validation failed",
          message: `Invalid text option ${j + 1} in question ${i + 1}`,
          field: `questions[${i + 1}].options[${j + 1}].text`,
        });
        return false;
      }
      if (
        option_type === "image" &&
        (!option.imageUrl ||
          typeof option.imageUrl !== "string" ||
          option.imageUrl.trim() === "")
      ) {
        res.status(400).json({
          error: "Validation failed",
          message: `Invalid image URL option ${j + 1} in question ${i + 1}`,
          field: `questions[${i + 1}].options[${j + 1}].imageUrl`,
        });
        return false;
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
        res.status(400).json({
          error: "Validation failed",
          message: `Invalid text or image URL option ${j + 1} in question ${
            i + 1
          }`,
          field: `questions[${i + 1}].options[${j + 1}]`,
        });
        return false;
      }
    }

    // Check if correctAnswer is chosen or not
    if (
      (quiz_type != "pt" && !Number.isInteger(question.correctAnswerIndex)) ||
      question.correctAnswerIndex < 0 ||
      question.correctAnswerIndex >= question.options.length
    ) {
      res.status(400).json({
        error: "Validation failed",
        message: `Please choose an answer for question ${i + 1}.`,
        field: `questions[${i + 1}].correctAnswerIndex`,
      });
      return false;
    }
  }

  // All validations passed
  return true;
};

module.exports = {
  createQuiz,
  getQuizById,
  editQuiz,
  getAllQuiz,
  getAllDataOverview,
  deleteQuiz,
  updateQuiz,
};
