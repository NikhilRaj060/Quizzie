import React, { useState } from "react";
import styles from "./QuizDetailsInput.module.css";
import { quizTypes } from "../../../lib/quiz.js";
import { Modal , Box } from "@mui/material";
import QuizBuilder from '../QuizBuilder/QuizBuilder.jsx'
import { useModal } from "../../../Hook/ModalContext.jsx";

function QuizDetailsInput() {
  const [formData, setFormData] = useState({ quiz_name: "", quiz_type: "" });
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [quizType, setQuizType] = useState(quizTypes);
  const { isQuizBuilderModalOpen , openQuizBuilderModal , closeQuizBuilderModal , closeQuizModal } = useModal();

  const quizBuilderStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '66%',
    height : '81%',
    bgcolor: '#FFFFFF',
    borderRadius: 2.5,
    outline: 'none',
  };

  const handleNameChange = (event) => {
    let intputValue = event.target.value;
    if (event && event.target) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }

    if (intputValue?.trim() !== "") {
      setNameError("");
    }
  };

  const handleTypeChange = (selectedType) => (event) => {
    setFormData({
      ...formData,
      [event.target.id]: selectedType.id,
    });

    let selctedValue = selectedType.id;

    const updatedTypes = quizTypes.map((type) => ({
      ...type,
      isActive: type.id === selectedType.id,
    }));

    setQuizType(updatedTypes);

    if (selctedValue !== "") {
      setTypeError("");
    }
  };

  const handleCancel = () => {
    closeQuizModal();
  };

  const handleContinue = () => {
    if (formData?.quiz_name === "") {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }
    if (formData?.quiz_type === "") {
      setTypeError("Type is required");
      return;
    } else {
      setTypeError("");
    }
    openQuizBuilderModal(formData,false)
  };

  return (
    <div className={styles.main}>
      <input
        className={`${styles.input} ${styles.common_class}`}
        type="text"
        name="quiz_name"
        id="quiz_name"
        placeholder="Quiz Name"
        onChange={handleNameChange}
      />
      {nameError && <div style={{color:"red",marginTop:"-30px",paddingLeft:"10px",fontSize:"16px"}}>{nameError}</div>}
      <div className={styles.quizType}>
        <div className={`${styles.quizTypeHeader} ${styles.common_class}`}>
          Quiz Type
        </div>
        {quizType.map((type) => (
          <div
          key={type?.id}
          className={
            type?.isActive
            ? `${styles.quizTypeItem} ${styles.quizTypeItemActive} ${styles.common_class}`
                : `${styles.quizTypeItem} ${styles.common_class}`
              }
              id="quiz_type"
              onClick={handleTypeChange(type)}
              >
            {type.name}
          </div>
        ))}
      </div>
      {/* {typeError && <div style={{color:"red",paddingLeft:"10px",fontSize:"16px"}}>{typeError}</div>} */}
      <div className={styles.buttonGroup}>
        <div className={styles.cancel} onClick={handleCancel}>
          Cancel
        </div>
        <div className={styles.continue} onClick={handleContinue}>Continue</div>
      </div>

      <Modal
        open={isQuizBuilderModalOpen}
        onClose={closeQuizBuilderModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...quizBuilderStyle }}>
          <QuizBuilder/>
        </Box>
      </Modal>
    </div>
  );
}

export default QuizDetailsInput;
