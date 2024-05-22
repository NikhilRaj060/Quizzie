import React, { useState } from "react";
import styles from "./QuizBuilder.module.css";
import { optionTypes } from "../../../lib/quiz.js";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import QuestionOption from "./QuestionOption/QuestionOption.jsx";

function QuizBuilder({ data }) {
  const [optionType, setOptionType] = useState(optionTypes);
  const [qIndex, setQIndex] = useState(0);

  const [formData, setFormData] = useState({
    quiz_name: data?.quiz_name ? data.quiz_name : "",
    quiz_type: data?.quiz_type ? data.quiz_type : "",
    option_type: "text",
    timer: 0,
    questions: [
      {
        question: "",
        options: [
          {
            text : "",
            imageUrl: ""
          },
          {
            text : "",
            imageUrl: ""
          }
        ],
        correctAnswerIndex: null,
      },
    ],
  });

  const handleInputChange = (index, event) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][event.target.name] = event.target.value;
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleQuestionTypeChange = (type) => {
    setFormData({
      ...formData,
      option_type: type.id,
    });
  };

  const handleTimerChange = (val) => {
    setFormData({
      ...formData,
      timer: val,
    });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: [
            {
              text : "",
              imageUrl: ""
            },
            {
              text : "",
              imageUrl: ""
            }
          ],
          correctAnswerIndex: null,
        },
      ],
    });
    setQIndex(qIndex + 1);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: newQuestions,
    });
    setQIndex(qIndex - 1);
  };

  // Function to update formData
  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleCancel = () => {};

  const handleCreateQuiz = () => {};

  console.log(formData);

  return (
    <div className={styles.main}>
      <div className={styles.conatiner}>
        <div className={styles.details}>
          <div className={styles.questionInfo}>
            <div
              className={` ${styles.common_class} ${styles.question_container}`}
            >
              {formData?.questions?.map((q, qIdx) => (
                <div
                  className={` ${styles.common_class} ${styles.question_numbers} `}
                  key={qIdx}
                >
                  <div
                    className={styles.cross_icon}
                    onClick={() => handleRemoveQuestion(qIdx)}
                  >
                    {qIdx > 0 && <RxCross2 width={15} height={15} />}
                  </div>
                  {qIdx + 1}
                </div>
              ))}
              <div className={styles.plus_icon} onClick={handleAddQuestion}>
                {formData?.questions?.length < 5 && <FaPlus fill="#9F9F9F" />}
              </div>
            </div>
            <div
              className={`${styles.common_class} ${styles.question_max_info}`}
            >
              Max 5 questions
            </div>
          </div>
          <div className={styles.question}>
            <input
              className={`${styles.input} ${styles.common_class}`}
              type="text"
              name="question"
              id="question"
              placeholder={
                formData?.quiz_type === "qa" ? "Q&A Question" : "Poll Question"
              }
              value={formData.questions[qIndex].question}
              onChange={(e) => handleInputChange(qIndex, e)}
            />
          </div>
          <div className={styles.questionType}>
            <div className={`${styles.quizTypeHeader} ${styles.common_class}`}>
              Option Type
            </div>
            {optionType.map((type) => (
              <div className={styles.inputButton} key={type?.id}>
                <input
                  type="radio"
                  id={`option_type_${type.id}`}
                  name="option_type"
                  onClick={() => handleQuestionTypeChange(type, "option_type")}
                  defaultChecked={type.id === "text"}
                />
                <label
                  className={`${styles.input_lable} ${styles.common_class}`}
                  htmlFor={`option_type_${type.id}`}
                >
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.questionDetails}>
          <QuestionOption
            setFormData={handleFormDataChange}
            formData={formData}
            qIndex={qIndex}
          />
          {formData?.quiz_type == "qa" && (
            <div className={styles.timerContainer}>
              <div className={`${styles.common_class} ${styles.timerHeading}`}>
                Timer
              </div>
              <div className={styles.timerOptions}>
                <div className={`${styles.common_class} ${styles.timerOption}`} onClick={() => handleTimerChange(0)} >
                  OFF
                </div>
                <div className={`${styles.common_class} ${styles.timerOption}`} onClick={() => handleTimerChange(5)} >
                  5 Sec
                </div>
                <div className={`${styles.common_class} ${styles.timerOption}`} onClick={() => handleTimerChange(10)} >
                  10 Sec
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.cancel} onClick={handleCancel}>
            Cancel
          </div>
          <div className={styles.continue} onClick={handleCreateQuiz}>
            Create Quiz
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizBuilder;
