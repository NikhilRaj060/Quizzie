import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./QuestionAnalysis.module.css";

function QuestionAnalysis() {
  const location = useLocation();
  const elements = location.state;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.header_title}>
          {elements?.quiz_name} Question Analysis
        </div>
        <div className={styles.data}>
          <div className={styles.created_date}>
            Created on : {elements?.createdDate}
          </div>
          <div className={styles.impression}>
            Impressions : {elements?.impression}
          </div>
        </div>
      </div>
      <div className={styles.question_overview}>
        {elements?.questions?.map((element, index) => (
          <React.Fragment key={index}>
            <div className={styles.question_details}>
              <div className={styles.question}>
                Q.{index + 1} {element?.question}
              </div>
              <div className={styles.question_data}>
                <div className={styles.attempted}>
                  <div className={styles.count}>{element?.attempted}</div>
                  <div className={styles.text}>
                    people Attempted the question
                  </div>
                </div>
                <div className={styles.attempted}>
                  <div className={styles.count}>
                    {element?.peopleAttemptedCorrectAnswer}
                  </div>
                  <div className={styles.text}>
                    people Attempted the question
                  </div>
                </div>
                <div className={styles.attempted}>
                  <div className={styles.count}>
                    {element?.incorrectAnswers}
                  </div>
                  <div className={styles.text}>
                    people Attempted the question
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.border}></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default QuestionAnalysis;
