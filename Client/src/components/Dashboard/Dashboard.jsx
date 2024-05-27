import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import image from "../../Image/eyes.svg";
import { dashboardMenu } from "../../lib/dashboardMenu";
import { getAllQuizDataOverview } from "../../api/quiz";
import Skeleton from "@mui/material/Skeleton";

export default function Dashboard() {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonsQuiz = Array.from({ length: 12 });
  const skeleton = Array.from({ length: 3 });

  useEffect(() => {
    const fetchAllDataOverview = async () => {
      const data = await getAllQuizDataOverview();
      if (data) {
        setIsLoading(false);
      }
      setQuizData(data?.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000000);
    };
    fetchAllDataOverview();
  }, []);

  dashboardMenu.forEach((data, index) => {
    data.count = quizData?.quizOverview?.[index];
  });

  console.log(quizData);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          {isLoading
            ? skeleton.map((_, index) => (
                <Skeleton
                  className={styles.skeleton_item_overview}
                  variant="rounded"
                />
              ))
            : dashboardMenu.map((element) => (
                <div className={styles.overviewItems}>
                  <div className={styles.quizheader}>
                    <div className={styles.quiz}>
                      <div
                        className={styles.count}
                        style={{ color: element?.color }}
                      >
                        {element?.count}
                      </div>
                      <div
                        className={styles.overviewTitle}
                        style={{ color: element?.color }}
                      >
                        {element?.title}
                      </div>
                    </div>
                    <div
                      className={styles.overviewTitle}
                      style={{ color: element?.color }}
                    >
                      {element?.title2}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>Trending Quizs</div>
          <div
            style={{ height: isLoading ? "100%" : "" }}
            className={!quizData?.quizData?.length ? `${styles.treding_no_data_found} ${styles.trending}` : `${styles.trending}`}
          >
            {isLoading ? (
              skeletonsQuiz.map((_, index) => (
                <Skeleton
                  key={index}
                  className={styles.skeletons_quiz}
                  variant="rounded"
                />
              ))
            ) : !quizData?.quizData?.length ? (
              <div className={styles.no_data_found}>No quizs yet created, Please create one.</div>
            ) : (
              quizData?.quizData?.map((element) => (
                <div className={styles.trendingQuiz}>
                  <div className={styles.quitDetails}>
                    <div className={styles.quizTitle}>{element?.quiz_name}</div>
                    <div className={styles.impression}>
                      <div className={styles.impressionCount}>
                        {element?.impression ? element?.impression : 0}
                      </div>
                      <img alt="eye" src={image} width={16} height={16}/>
                    </div>
                  </div>
                  <div className={styles.createdDate}>
                    Created on : {element?.createdAt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
