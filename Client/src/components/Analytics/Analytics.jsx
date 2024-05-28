import React, { useState, useEffect } from "react";
import styles from "./Analytics.module.css";
import { BiEdit } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ImShare2 } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { getAllQuizData } from "../../api/quiz";
import { headerData } from "../../lib/analytics";
import moment from "moment";
import { useModal } from "../../Hook/ModalContext";
import { Modal, Box } from "@mui/material";
import QuizBuilder from "../CreateQuiz/QuizBuilder/QuizBuilder";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Analytics = () => {
  const naviagte = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dataUpdated, resetDataUpdated } = useModal();
  const {
    isQuizBuilderModalOpen,
    openQuizBuilderModal,
    closeQuizBuilderModal,
    openDeleteModal,
    quizCreated,
    resetQuizCreated
  } = useModal();
  const skeletonsOverview = Array.from({ length: 6 });

  const quizBuilderStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "66%",
    height: "81%",
    bgcolor: "#FFFFFF",
    borderRadius: 2.5,
    outline: "none",
  };

  useEffect(() => {
    const fetchAllDataOverview = async () => {
      const data = await getAllQuizData();
      if (data) {
        setIsLoading(false);
      }
      setQuizData(data?.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    };
    fetchAllDataOverview();
  }, [dataUpdated]);

  useEffect(() => {
    if (dataUpdated) {
      resetDataUpdated();
    }
  }, [dataUpdated, resetDataUpdated]);

  useEffect(() => {
    if (quizCreated) {
      fetchData();
      resetQuizCreated();
    }
  }, [quizCreated]);

  const fetchData = async () => {
    try {
      const updatedData = await getAllQuizData();
      
      if (updatedData) {
        setIsLoading(false);
        setQuizData(updatedData.data);
      }
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  quizData?.forEach((quiz) => {
    const date = moment(quiz.createdAt).format("DD-MM-YYYY");
    quiz.createdDate = date;
  });

  const onCopyText = () => {
    toast.success("Link copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: styles.custom_toast,
    });
  };

  const handleEdit = (index) => {
    openQuizBuilderModal(quizData[index], true);
  };

  const handleAnalysis = (element) => {
    let data = {
      quizId: element?.quizId,
      quizName: element?.quiz_name,
      createdDate: element?.createdDate,
      impression: element?.impression,
      questions: element.questions.map((question) => ({
        question: question.question,
        attempted: question.attempted,
        peopleAttemptedCorrectAnswer: question.peopleAttemptedCorrectAnswer,
        incorrectAnswers:
          question.attempted - question.peopleAttemptedCorrectAnswer,
      })),
    };
    naviagte(`/analytics/${element?.quizId}`, {
      state: data,
    });
  };

  const handleDelete = (quizId) => {
    openDeleteModal(quizId);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>Quiz Analysis</div>
      <div
        style={{ height: !quizData?.length ? "100%" : undefined }}
        className={styles.tableContainer}
      >
        {isLoading ? (
          skeletonsOverview.map((_, index) => (
            <Skeleton
              variant="rounded"
              className={styles.skeleton}
              height={50}
            />
          ))
        ) : !quizData?.length ? (
          <div className={styles.no_data_found}>No Data Found</div>
        ) : (
          <div className={styles.table}>
            <div className={styles.row}>
              {headerData.map((element, index) => (
                <div
                  key={`${element.quiz_name}_${index}`}
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
              {quizData?.map((element, index) => (
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
                    {element.createdDate}
                  </div>
                  <div
                    className={styles.cell}
                    style={{ width: "10%", paddingRight: "4.4%" }}
                  >
                    {element.impression}
                  </div>
                  <div
                    className={styles.buttons}
                    style={{ width: "10%", paddingRight: "4.8%" }}
                  >
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(index)}
                    >
                      <BiEdit size={24} fill="#854CFF" />
                    </button>
                    <button className={styles.deleteBtn} onClick={()=> handleDelete(element?.quizId)}>
                      <RiDeleteBin6Fill
                        size={24}
                        fill="#D60000"
                        className={styles.delete_edit}
                      />
                    </button>
                    <CopyToClipboard
                      className={styles.shareBtn}
                      text={element?.quizLink}
                      onCopy={onCopyText}
                    >
                      <ImShare2 size={24} fill="#60B84B" />
                    </CopyToClipboard>
                  </div>
                  <div className={styles.cell}>
                    <div
                      className={styles.analysisLink}
                      onClick={() => handleAnalysis(element)}
                    >
                      Question Wise Analysis
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal
        open={isQuizBuilderModalOpen}
        onClose={closeQuizBuilderModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...quizBuilderStyle }}>
          <QuizBuilder />
        </Box>
      </Modal>
      <DeleteModal />
      <ToastContainer className={styles.customToastContainer} containerId="analysisQiuzToast" />
    </div>
  );
};

export default Analytics;
