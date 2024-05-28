import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_PUBLIC_URL;

const getAllQuizData = async () => {
  try {
    const reqUrl = `${backendUrl}/get-all-quiz`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const getAllQuizDataOverview = async () => {
  try {
    const reqUrl = `${backendUrl}/get-quiz-question-overview`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.get(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const createQuiz = async (formData) => {
  try {
    const reqUrl = `${backendUrl}/create-quiz`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.post(reqUrl, formData, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const getQuizDetailsById = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/get-quiz/${quizId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const editQuizDetailsById = async (quizId, quiz) => {
  try {
    const reqUrl = `${backendUrl}/edit-quiz/${quizId}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.put(reqUrl, quiz, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const updateQuizDetailsById = async (quizId, quiz) => {
  try {
    const reqUrl = `${backendUrl}/update-quiz/${quizId}`;
    const response = await axios.put(reqUrl, quiz);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.errorMessage || "Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  }
};

const deleteQuiz = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/delete-quiz/${quizId}`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.delete(reqUrl, { headers });
    return response.data;
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong");
  }
}

export { createQuiz, getQuizDetailsById, editQuizDetailsById, getAllQuizData, getAllQuizDataOverview, updateQuizDetailsById, deleteQuiz };
