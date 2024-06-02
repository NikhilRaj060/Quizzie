import React, { useEffect, useState } from "react";
import styles from "./QuizBuilder.module.css";
import { optionTypes, timerOptions } from "../../../lib/quiz.js";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import QuestionOption from "./QuestionOption/QuestionOption.jsx";
import { toast, Bounce } from "react-toastify";
import { useModal } from "../../../Hook/ModalContext.jsx";
import { createQuiz, editQuizDetailsById } from "../../../api/quiz.js";

function QuizBuilder() {
  const [optionType] = useState(optionTypes);
  const [timerOption, setTimerOption] = useState(timerOptions);
  const [qIndex, setQIndex] = useState(0);
  const { closeQuizBuilderModal, closeAllModals, openQuizPublishModal, quizData, isEdit, createQuizSuccess } =
    useModal();
  const [isQuizCreating, setIsQuizCreating] = useState(false);
  let isEditPermission = isEdit;
  const data = quizData;

  const initialFormData = {
    quiz_name: "",
    quiz_type: "",
    option_type: "text",
    timer: 0,
    impression: 0,
    questions: [
      {
        question: "",
        options: [
          {
            text: "",
            imageUrl: "",
          },
          {
            text: "",
            imageUrl: "",
          },
        ],
        correctAnswerIndex: null,
        attempted: 0,
        peopleAttemptedCorrectAnswer: 0,
      },
    ],
  };

  useEffect(() => {
    if (isEditPermission) {
      timerOption[0].isSelected = false
      handleTimerChange(formData?.timer)
    }
  }, [isEditPermission])

  const [formData, setFormData] = useState({
    quiz_name: data?.quiz_name ? data.quiz_name : "",
    quiz_type: data?.quiz_type ? data.quiz_type : "",
    option_type: data?.option_type ? data.option_type : "text",
    timer: isEditPermission && data?.timer ? data.timer : 0,
    impression: isEditPermission && data?.impression ? data?.impression : 0,
    questions: isEditPermission && data?.questions
      ? data?.questions
      : [
        {
          question: "",
          options: [
            {
              text: "",
              imageUrl: "",
            },
            {
              text: "",
              imageUrl: "",
            },
          ],
          correctAnswerIndex: null,
          attempted: 0,
          peopleAttemptedCorrectAnswer: 0,
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
    const updatedQuestions = formData.questions.map((question) => ({
      ...question,
      options: question.options.map(() => ({
        text: "",
        imageUrl: "",
      })),
      correctAnswerIndex: null,
    }));

    setFormData({
      ...formData,
      option_type: type.id,
      questions: updatedQuestions,
    });
  };

  const handleTimerChange = (val) => {
    const updatedTimeOptions = timerOption.map((timer) => ({
      ...timer,
      isSelected: timer?.value === val,
    }));

    setFormData({
      ...formData,
      timer: val,
    });

    setTimerOption(updatedTimeOptions);
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
              text: "",
              imageUrl: "",
            },
            {
              text: "",
              imageUrl: "",
            },
          ],
          correctAnswerIndex: null,
        },
      ],
    });
    setQIndex(formData?.questions?.length);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: newQuestions,
    });
    if (qIndex >= index) {
      setQIndex(qIndex > 0 ? qIndex - 1 : 0);
    }
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleCancel = () => {
    resetFormData()
    closeQuizBuilderModal();
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  }

  const handleCreateOrUpdateQuiz = async () => {
    setIsQuizCreating(true);
    let res;
    if (isEditPermission) {
      res = await editQuizDetailsById(data?.quizId, formData);
      if (res && res?.message) {
        setIsQuizCreating(false);
        createQuizSuccess();
        toast.success(res?.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          className: "custom_toast",
        });
        handleCancel();
      } else {
        setIsQuizCreating(false);
      }
    } else {
      res = await createQuiz(formData);
    }
    if (!isEditPermission && res && res?.message && res?.quizLink) {
      setIsQuizCreating(false);
      toast.success(res?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "custom_toast",
      });
      setIsQuizCreating(false);
      createQuizSuccess();
      closeAllModals();
      openQuizPublishModal(res?.quizLink);
    } else {
      setIsQuizCreating(false);
    }
    setTimeout(() => {
      setIsQuizCreating(false);
    }, 5000);
  };

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
                  onClick={() => setQIndex(qIdx)}
                >
                  <div
                    className={styles.cross_icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestion(qIdx);
                    }}
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
              value={formData?.questions[qIndex]?.question}
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
                  id={`option_type_${type?.id}`}
                  name="option_type"
                  onClick={() => handleQuestionTypeChange(type, "option_type")}
                  defaultChecked={formData?.option_type ? type?.id === formData?.option_type : type?.id === "text"}
                />
                <label
                  className={`${styles.input_lable} ${styles.common_class}`}
                  htmlFor={`option_type_${type?.id}`}
                >
                  {type?.name}
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
          {formData?.quiz_type === "qa" && (
            <div className={styles.timerContainer}>
              <div className={`${styles.common_class} ${styles.timerHeading}`}>
                Timer
              </div>
              <div className={styles.timerOptions}>
                {timerOption.map((timer) => (
                  <div
                    key={timer?.id}
                    className={
                      timer?.isSelected
                        ? `${styles.common_class} ${styles.activeTimerOption} ${styles.timerOption}`
                        : `${styles.common_class} ${styles.timerOption}`
                    }
                    onClick={() => handleTimerChange(timer?.value)}
                  >
                    {timer?.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.cancel} onClick={handleCancel}>
            Cancel
          </div>
          <div
            className={
              isQuizCreating
                ? `${styles.continue} ${styles.disabled}`
                : `${styles.continue}`
            }
            onClick={handleCreateOrUpdateQuiz}
          >
            {isQuizCreating ? isEditPermission ? `Updating...` : `Creating...` : isEditPermission ? `Update Quiz` :  `Create Quiz`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizBuilder;
