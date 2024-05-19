import React from "react";
import styles from "./Dashboard.module.css";
import image from "../../Image/eyes.svg";

const sideBarMenu = [
  {
    title: "Quiz",
    title2: "Created",
    count: 12,
    color: "#FF5D01",
    id: 0,
  },
  {
    title: "Question",
    title2: "Created",
    count: 110,
    color: "#60B84B",
    id: 1,
  },
  {
    title: "Total",
    title2: "Impressions",
    count: 989,
    color: "#5076FF",
    id: 2,
  },
];

const trendingQuiz = [
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 0,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 1,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 2,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 3,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 4,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 5,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 6,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 7,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 8,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 9,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 10,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 11,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 12,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 13,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 14,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 15,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 16,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 17,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 18,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 19,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 20,
  },
  {
    title: "Quiz 1",
    count: 12,
    createdDate: "04 Sep, 2023",
    id: 21,
  },
  {
    title: "Quiz 1",
    count: 110,
    createdDate: "04 Sep, 2023",
    id: 22,
  },
  {
    title: "Quiz 1",
    count: 989,
    createdDate: "04 Sep, 2023",
    id: 23,
  },
];

export default function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          {sideBarMenu.map((element) => (
            <div className={styles.overviewItems}>
              <div className={styles.quizheader}>
                <div className={styles.quiz}>
                  <div className={styles.count} style={{ color: element?.color }}>{element?.count}</div>
                  <div className={styles.overviewTitle} style={{ color: element?.color }}>
                    {element?.title}
                  </div>
                </div>
                <div className={styles.overviewTitle} style={{ color: element?.color }}>{element?.title2}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>Trending Quizs</div>
          <div className={styles.trending}>
            {trendingQuiz.map((element) => (
              <div className={styles.trendingQuiz}>
                <div className={styles.quitDetails}>
                  <div className={styles.quizTitle}>{element?.title}</div>
                  <div className={styles.impression}>
                    <div className={styles.impressionCount}>
                      {element?.count ? element?.count : 0}
                    </div>
                    <img src={image} width={16} height={16}></img>
                  </div>
                </div>
                <div className={styles.createdDate}>
                  Created on : {element?.createdDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
