import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import styles from "./QuestionOption.module.css";

function QuestionOption({ formData, qIndex, setFormData }) {
  const handleOptionChange = (oIndex, event ,type) => {
    const newFormData = { ...formData };
    if ( type === "text" ) {
        newFormData.questions[qIndex].options[oIndex].text = event.target.value;
    } else if ( type === "image" ) {
        newFormData.questions[qIndex].options[oIndex].imageUrl = event.target.value;
    }
    
    setFormData(newFormData);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options.push({
        text: "",
        imageUrl: ""
    });
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleRemoveOption = (oIndex) => {
    const newFormData = { ...formData };
    newFormData.questions[qIndex].options.splice(oIndex, 1);
    setFormData(newFormData);
  };

  const handleCorrectOption = (oIndex) => {
    const newFormData = { ...formData };
    newFormData.questions[qIndex].correctAnswerIndex = oIndex;
    setFormData(newFormData);
  }

  return (
    <div className={styles.questionOptions}>
      {formData.questions[qIndex].options.map((option, oIndex) => (
        <div className={styles.questionOption} key={`${qIndex}-${oIndex}`}>
          <div className={styles.radioButton}>
            <input
              type="radio"
              id={`correct_option_${qIndex}_${oIndex}`}
              name={`correct_option_${qIndex}`}
              className={styles.radioButton}
            />
            <label htmlFor={`correct_option_${qIndex}_${oIndex}`} onClick={()=>handleCorrectOption(oIndex)}></label>
          </div>
          <input
            type="text"
            name="option"
            id={`option_${qIndex}_${oIndex}`}
            value={formData?.option_type === "text" || formData?.option_type === "text_image" ? option[oIndex]?._text : option[oIndex]?.imageUrl}
            style={{ width: "30%" }}
            className={ oIndex === formData.questions[qIndex].correctAnswerIndex ? `${styles.isOptionSelected} ${styles.input}` : `${styles.input}`}
            onChange={(e) => handleOptionChange(oIndex, e , formData?.option_type)}
            placeholder={
              formData?.option_type === "text" ||
              formData?.option_type === "text_image"
                ? "Text"
                : "Image Url"
            }
          />
          {formData?.option_type == "text_image" && (
            <input
              type="text"
              name="option"
              id={`option_${qIndex}_${oIndex}`}
              value={option[oIndex]?.imageUrl}
              className={ oIndex === formData.questions[qIndex].correctAnswerIndex ? `${styles.isOptionSelected} ${styles.input}` : `${styles.input}`}
              onChange={(e) => handleOptionChange(oIndex, e)}
              placeholder="Image Url"
            />
          )}
          {formData?.questions.length <= 3 && (
            <div className={styles.add} onClick={() => handleAddOption(qIndex)}>
              Add options
            </div>
          )}
          {oIndex > 1 && (
            <div
              className={styles.delete}
              onClick={() => handleRemoveOption(oIndex)}
            >
              <RiDeleteBin6Fill
                size={24}
                fill="#D60000"
                className={styles.delete_edit}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuestionOption;
