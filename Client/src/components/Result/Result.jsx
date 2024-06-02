import React , { useEffect } from "react";
import image from "../../Image/success-image.svg";
import { useLocation } from "react-router-dom";
import styles from "./Result.module.css";

function Result() {

  useEffect(() => {
    const isRefresh = window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
    
    if (isRefresh) {
      window.location.href = '/quiz/6ad0f4ae-3cf7-411a-a0f9-3548176f6dd9';
    }
  });

  const location = useLocation();
  const { score, total, quiz_type } = location?.state;

  const isPollType = quiz_type === "pt";


  return (
    <div className={styles.container}>
      <div className={styles.main} style={{paddingTop : isPollType ? "5%" : ""}}>
        {!isPollType ? (
          <>
            <div style={{ paddingTop: "6%" }} className={styles.common_class}>
              Congrats Quiz is completed
            </div>
            <div>
              <img src={image} width={320} height={320} alt="sucess"></img>
            </div>
            <div className={` ${styles.common_class} ${styles.score_heading} `}>
              Your Score is{" "}
              <span className={`${styles.common_class} ${styles.score}`}>
                0{score}/0{total}
              </span>
            </div>
          </>
        ) : (
          <div className={styles.thanku_note}>
            <div className={styles.note}>
              Thank you for participating in the Poll
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
