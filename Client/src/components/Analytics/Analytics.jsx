import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { BiEdit } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ImShare2 } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";

function Analytics() {
  // const [data, setData] = useState([]);
  // const [isCopied, setIsCopied] = useState(false);

  const headerData = [
    {
      id: 1,
      name: "S.No",
      width: "5%",
      paddingRight: "3.8%",
      paddingLeft: "1.5%",
    },
    {
      id: 2,
      name: "Quiz Name",
      width: "11%",
      paddingRight: "3.3%",
    },
    {
      id: 3,
      name: "Created on",
      width: "11.1%",
      paddingRight: "3.3%",
    },
    {
      id: 4,
      name: "Impression",
      width: "10%",
      paddingRight: "4.4%",
    },
    {
      id: 5,
      name: "",
      width: "10%",
      paddingRight: "4.8%",
    },
    {
      id: 6,
      name: "",
      // width:"10%"
    },
  ];

  const data = [
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 6845",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 4878",
      impression_count: 895,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 1.4,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "csdxcdwdcsafcsda 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 6845",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 4878",
      impression_count: 895,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 1.4,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "csdxcdwdcsafcsda 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
    {
      quiz_name: "Quiz 1",
      impression_count: 345,
      created_on: "01 Sep, 2023",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await fetch("https://cities-qd9i.onrender.com/agents");
      // const agents = await response.json();
      // setData(agents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onCopyText = () => {
    toast.success("Link copied to Clipboard");
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>Quiz Analysis</div>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.row}>
            {headerData.map((element) => (
              <div
                key={element.id}
                style={{
                  width: element?.width,
                  paddingRight: element?.paddingRight,
                  paddingLeft: element?.paddingLeft,
                }}
              >
                <div className={styles.headerCell}>{element.name}</div>
              </div>
            ))}
          </div>
          <div className={styles.tableBody}>
            {data.map((element, index) => (
              <div
                key={element.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <div
                  className={styles.cell}
                  style={{
                    width: "5%",
                    paddingRight: "3.8%",
                    paddingLeft: "1.5%",
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className={styles.cell}
                  style={{ width: "11%", paddingRight: "3.3%" }}
                >
                  {element.quiz_name}
                </div>
                <div
                  className={styles.cell}
                  style={{ width: "11.1%", paddingRight: "3.3%" }}
                >
                  {element.created_on}
                </div>
                <div
                  className={styles.cell}
                  style={{ width: "10%", paddingRight: "4.4%" }}
                >
                  {element.impression_count}
                </div>
                <div
                  className={styles.buttons}
                  style={{ width: "10%", paddingRight: "4.8%" }}
                >
                  <button className={styles.editBtn}>
                    <BiEdit size={24} fill="#854CFF" />
                  </button>
                  <button className={styles.deleteBtn}>
                    <RiDeleteBin6Fill size={24} fill="#D60000" className={styles.delete_edit} />
                  </button>
                  <CopyToClipboard
                    className={styles.shareBtn}
                    text={"Nikhil"}
                    onCopy={onCopyText}
                  >
                    <ImShare2 size={24} fill="#60B84B"/>
                  </CopyToClipboard>
                </div>
                <div className={styles.cell}>
                  <a href="#" className={styles.analysisLink}>
                    Question Wise Analysis
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
