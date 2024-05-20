import React, { useState } from 'react'
import styles from './QuizBuilder.module.css'
import { optionTypes } from "../../../lib/quiz.js";

function QuizBuilder({ data }) {
  const [formData, setFormData] = useState(
    {
      quiz_name: data?.quiz_name ? data.quiz_name : '',
      quiz_type: data?.quiz_type ? data.quiz_type : '',
    }
  );
  const [optionType, setOptionType] = useState(optionTypes);

  const [question, setQuestion] = useState({ question: '', options: [], answer: '' });

  const handleCancel = () => {

  };

  const handleCreateQuiz = () => {

  };

  console.log(formData)

  return (
    <div className={styles.main}>
      <div className={styles.conatiner}>
        <div className={styles.details}>
          <div className={styles.questionInfo}>
            <div>+</div>
            <div>Max 5 questions</div>
          </div>
          <div className={styles.questionTitle}>

          </div>
          <div className={styles.questionType}>
            <div className={`${styles.quizTypeHeader} ${styles.common_class}`}>
              Option Type
            </div>
            {optionType.map((type) => (
              <div
                key={type?.id}
                className={
                  type?.isActive
                    ? `${styles.quizTypeItem} ${styles.quizTypeItemActive} ${styles.common_class}`
                    : `${styles.quizTypeItem} ${styles.common_class}`
                }
                id="option_type"
                // onClick={handleTypeChange(type)}
              >
                {type.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.details}>Details</div>
        <div className={styles.buttonGroup}>
          <div className={styles.cancel} onClick={handleCancel}>
            Cancel
          </div>
          <div className={styles.continue} onClick={handleCreateQuiz}>Create Quiz</div>
        </div>
      </div>
    </div>
  )
}

export default QuizBuilder