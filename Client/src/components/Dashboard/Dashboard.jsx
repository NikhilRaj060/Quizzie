import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import image from "../../Image/eyes.svg";
import { dashboardMenu } from "../../lib/dashboardMenu";
import { getAllQuizDataOverview } from "../../api/quiz";
import { useModal } from "../../Hook/ModalContext";
import Skeleton from "@mui/material/Skeleton";

export default function Dashboard() {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { quizCreated, resetQuizCreated } = useModal();
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
      }, 10000);
    };
    fetchAllDataOverview();
  }, []);

  useEffect(() => {
    if (quizCreated) {
      fetchData();
      resetQuizCreated();
    }
  }, [quizCreated]);

  const fetchData = async () => {
    try {
      const updatedData = await getAllQuizDataOverview();

      if (updatedData) {
        setIsLoading(false);
        setQuizData(updatedData.data);
      }
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  dashboardMenu.forEach((data, index) => {
    data.count = quizData?.quizOverview?.[index];
  });

  const formatImpressionCount = (count) => {
    if (count >= 1000 && count < 1000000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          {isLoading
            ? skeleton.map((_, index) => (
              <Skeleton
                key={index}
                className={styles.skeleton_item_overview}
                variant="rounded"
              />
            ))
            : dashboardMenu.map((element, index) => (
              <div className={styles.overviewItems} key={index}>
                <div className={styles.quizheader}>
                  <div className={styles.quiz}>
                    <div
                      className={styles.count}
                      style={{ color: element?.color }}
                    >
                      {formatImpressionCount(element?.count ? element?.count : 0)}
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
              quizData?.quizData?.map((element, index) => (
                <div className={styles.trendingQuiz} key={index}>
                  <div className={styles.quitDetails}>
                    <div className={styles.quizTitle}>{element?.quiz_name}</div>
                    <div className={styles.impression}>
                      <div className={styles.impressionCount}>
                        {formatImpressionCount(element?.impression ? element?.impression : 0)}
                      </div>
                      <img alt="eye" src={image} width={16} height={16} />
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
