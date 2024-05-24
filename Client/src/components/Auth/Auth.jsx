import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import InputButton from "../Input/InputButton";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  let isLogin = location.pathname.includes("/login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState({});
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isError, setIsError] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(""); // Clear any error message
  };

  const handleNameChange = (event) => {
    if (event && event.target) {
      const inputValue = event.target.value;
      setName(inputValue);

      // Perform first name validation
      if (inputValue.trim() === "") {
        setNameError("First name is required");
      } else {
        setNameError("");
      }
    }
  };
  const handleEmailChange = (event) => {
    if (event && event.target) {
      const enteredEmail = event.target.value;
      setEmail(enteredEmail);

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(enteredEmail);

      // Set error message based on validation
      setEmailError(isValidEmail ? "" : "Invalid email");
    }
  };

  let data = {};

  const handleSubmit = async () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");

      console.log(process.env.REACT_APP_PUBLIC_URL_AUTH)
      let url = isLogin
        ? `${process.env.REACT_APP_PUBLIC_URL_AUTH}/login`
        : `${process.env.REACT_APP_PUBLIC_URL_AUTH}/register`;
      data = isLogin
        ? {
            email,
            password,
          }
        : {
            name,
            email,
            password,
            confirmPassword,
          };
      try {
        let promise = axios.post(url, data);
        toast.promise(
          promise,
          {
            pending: isLogin ? "Logging in..." : "Signing up...",
            success: {
              render({ data }) {
                return `${data?.data?.message || 'Success!'}`;
              }
            },
            error: {
              render({ data }) {
                return `${data?.response?.data?.errorMessage || 'Error!'}`;
              }
            }
          }
        );

        try {
          let res = await promise;
          if (res?.data && res?.data?.token && res?.data?.name) {
            localStorage.setItem('token',res?.data?.token);
            localStorage.setItem('name',JSON.stringify(res?.data?.name));
          }
          if (isLogin) {
            resetForm();
            navigate('/dashboard');
          } else {
            resetForm();
            navigate('/auth/login');
          }
        }catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.error("Error during signup:", error);

      }
    }
  };

  useEffect(() => {}, [responseData]);

  const req = {
    message: responseData?.message,
    path: responseData?.redirectTo,
    text: responseData?.text,
  };

  const setErrorValue = (val) => {
    resetForm();
    setIsError(val);
  };

  const handleNavigation = () => {
    resetForm();
    if (!isLogin && location.pathname !== "/auth/login") {
      navigate("/auth/login");
    } else if (isLogin && location.pathname !== "/auth/signup") {
      navigate("/auth/signup");
    }
  };

  return (
    <>
      <div className={styles.auth}>
        <div className={styles.header}>QUIZZIE</div>
        <div className={styles.buttonContainer} onClick={handleNavigation}>
          <div className={styles.buttonGroup}>
            <div className={!isLogin ? styles.button : ""}>Sign Up</div>
          </div>
          <div className={styles.buttonGroup}>
            <div className={isLogin ? styles.button : ""}>Login</div>
          </div>
        </div>
        <div className={styles.authForm}>
          <div className={styles.formButtons}>
            {!isLogin && (
              <InputButton
                fullWidth
                label="Name"
                type="text"
                required
                value={name}
                error={nameError}
                onChange={handleNameChange}
              />
            )}
            <InputButton
              fullWidth
              label="Email"
              type="email"
              value={email}
              error={emailError}
              onChange={handleEmailChange}
            />
            <InputButton
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <InputButton
                error={error}
                fullWidth
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className={styles.submit} onClick={handleSubmit}>
          <div className={styles.authButton}>
            {isLogin ? "Log In" : "Sign Up"}
          </div>
        </div>
      </div>
    </>
  );
}
