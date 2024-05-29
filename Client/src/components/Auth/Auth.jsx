import React, { useState } from "react";
import styles from "./Auth.module.css";
import InputButton from "../Input/InputButton";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setPasswordError("")
    setEmailError("")
    setNameError("")
    setConfirmPassword("")
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

  const handlePasswordChange = (event) => {
    setPasswordError("");
    if (event && event.target) {
      const enteredPassword = event.target.value;
      setPassword(enteredPassword);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setError("");
    if (event && event.target) {
      const enteredConfirmPassword = event.target.value;
      setConfirmPassword(enteredConfirmPassword);
    }
  };

  const handleSubmit = async () => {
    let validName = isLogin || isValidName(name);
    let validEmail;
    let weakPassword;
    if (isLogin) {
      if (email.trim() === "") {
        validEmail = false;
        setEmailError(validEmail ? "" : "Please fill email address");
      }
    } else {
      validEmail = isValidEmail(email)
      setEmailError(validEmail ? "" : "Invalid email address");
    }

    if (!isLogin) {
      weakPassword = isWeakPassword(password);
      setPasswordError(weakPassword ? "Weak password" : "");
    } else {
      if (password.trim() === "") {
        weakPassword = true;
        setPasswordError(weakPassword ? "Please fill password" : "")
      }
    }

    let passwordsMatch = isLogin || password === confirmPassword;

    setNameError(validName ? "" : "Invalid Name");
    setError(passwordsMatch ? "" : "Passwords do not match");

    if (isLogin && !weakPassword) {
      try {
        let isLogginedIn = await loginUser({ email, password });
        if (isLogginedIn) {
          resetForm();
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (validName && validEmail && !weakPassword && passwordsMatch) {
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
        }
      }
    }
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
    <div className={styles.main}>
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
                value={nameError ? "" : name}
                error={nameError}
                onChange={handleNameChange}
              />
            )}
            <InputButton
              fullWidth
              label="Email"
              type="email"
              value={emailError ? "" : email}
              error={emailError}
              onChange={handleEmailChange}
            />
            <InputButton
              fullWidth
              label="Password"
              type="password"
              value={passwordError ? "" : password}
              error={passwordError}
              onChange={handlePasswordChange}
            />
            {!isLogin && (
              <InputButton
                error={error}
                fullWidth
                label="Confirm password"
                type="password"
                value={error ? "" : confirmPassword}
                onChange={handleConfirmPasswordChange}
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
    </div>
  );
}
