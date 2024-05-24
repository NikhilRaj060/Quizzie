import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = `http://localhost:4000/api/v1`;

const createQuiz = async ( formData ) => {
  try {
    const reqUrl = `${backendUrl}/create-quiz`;
    const response = await axios.post(reqUrl, {
      formData,
    });
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export { createQuiz };
