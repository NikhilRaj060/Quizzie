import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_PUBLIC_URL_AUTH;

export const registerUser = async ({ email, password, confirmPassword, name }) => {
  try {
    const reqUrl = `${backendUrl}/register`;
    const response = await toast.promise(
      axios.post(reqUrl, { name, email, password, confirmPassword }),
      {
        pending: "Registering...",
        success: {
          render({ data }) {
            return `${data?.data?.message || "Success!"}`;
          },
        },
        error: {
          render({ data }) {
            return `${data?.response?.data?.errorMessage || "Error!"}`;
          },
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/login`;
    const response = await toast.promise(
      axios.post(reqUrl, { email, password }),
      {
        pending: "Logging in...",
        success: {
          render({ data }) {
            return `${data?.data?.message || "Success!"}`;
          },
        },
        error: {
          render({ data }) {
            return `${data?.response?.data?.errorMessage || "Error!"}`;
          },
        }
      }
    );
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
    }
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    return false;
  }
};
