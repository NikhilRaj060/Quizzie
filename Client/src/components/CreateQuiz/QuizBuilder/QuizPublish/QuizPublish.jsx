import React from "react";
import { Modal, Box } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useModal } from "../../../../Hook/ModalContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./QuizPublish..module.css";

function QuizPublish() {
  const { isQuizPublishModalOpen, closePublishModalOpen, quizLink } = useModal();

  const quizBuilderStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "66%",
    height: "58%",
    bgcolor: "#FFFFFF",
    borderRadius: 2.5,
    outline: "none",
  };

  const handleShare = () => {
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

  return (
    <>
      <Modal
        open={isQuizPublishModalOpen}
        onClose={closePublishModalOpen}
        aria-labelledby="quiz-publish-modal"
        aria-describedby="modal for publish quiz link"
      >
        <Box sx={{ ...quizBuilderStyle }}>
          <div className={styles.container}>
            <div onClick={closePublishModalOpen} className={styles.cross_button}>
              <RxCross2 width={25} height={25} />
            </div>
            <div className={styles.main}>
              <div className={styles.heading}>
                <h1>Congrats your Quiz is Published!</h1>
              </div>
              <input
                className={styles.input}
                value={quizLink}
                readOnly
              />
              <CopyToClipboard
                className={styles.shareButton}
                text={quizLink}
                onCopy={handleShare}
              >
                <span>Share</span>
              </CopyToClipboard>
            </div>
            {/* Move ToastContainer outside of 'main' div but inside 'container' div */}
            <ToastContainer
              limit={1}
              className={styles.customToastContainer}
              containerId="quizPublish"
              position="top-right"
            />
          </div>
        </Box>
      </Modal>

    </>
  );
}

export default QuizPublish;
