import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import InputButton from "../Input/InputButton";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isWeakPassword, isValidEmail, isValidName } from "../../lib/auth";
import { registerUser, loginUser } from "../../api/auth";

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

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleNameChange = (event) => {
    setNameError("");
    if (event && event.target) {
      const inputValue = event.target.value;
      setName(inputValue);
    }
  };
  const handleEmailChange = (event) => {
    setEmailError("");
    if (event && event.target) {
      const enteredEmail = event.target.value;
      setEmail(enteredEmail);
    }
  };

  // let data = {};

  const handleSubmit = async () => {
    let validName = isValidName(name);

    if (validName) {
      setNameError("");
    } else {
      setNameError("Invalid Name");
    }

    let validEmail = isValidEmail(email);

    if (!validEmail) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    let weakPassword = isWeakPassword(password);

    if (weakPassword) {
      setError("Weak password");
    } else {
      setError("");
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }

    if (isLogin) {
      try {
        let isLogginedIn = await loginUser({ email, password });
        if (isLogginedIn) {
          resetForm();
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    } else {
      try {
        let res = await registerUser({
          name,
          email,
          password,
          confirmPassword,
        });
        if (res) {
          resetForm();
          navigate("/auth/login");
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {}, [responseData]);

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
