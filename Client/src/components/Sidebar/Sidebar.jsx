import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { sideBarMenu } from "../../lib/sideBarMenu";
import { Modal, Box } from "@mui/material";
import QuizDetailsInput from '../CreateQuiz/QuizDetailsInput/QuizDetailsInput';
import { useModal } from "../../Hook/ModalContext";

const Sidebar = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isQuizModalOpen, openQuizModal, closeQuizModal } = useModal();

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '66%',
    height : '52%',
    bgcolor: '#FFFFFF',
    borderRadius: 2.5,
    outline: 'none',
  };

  sideBarMenu.forEach((element) => {
    element.isActive = location.pathname.includes(element.route);
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("auth/login");
  };

  const handleClick = (element) => {
    if (element?.route === "create-quiz") {
      openQuizModal();
    } else {
      navigate(element?.route);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>QUIZZIE</div>
      <div className={styles.sidebarMenu}>
        {sideBarMenu.map((element) => (
          <div
            key={element?.title}
            className={
              element?.isActive
                ? styles.sidebarMenuItemActive
                : styles.sidebarMenuItem
            }
            onClick={() => handleClick(element)}
          >
            {element?.title}
          </div>
        ))}
      </div>
      <div className={styles.footer} onClick={handleLogout}>
        <div className={styles.borderChange}></div>
        <div className={styles.logoutButton}>LOGOUT</div>
      </div>

      <Modal
        open={isQuizModalOpen}
        onClose={closeQuizModal}
        aria-labelledby="modal-quiz-details"
        aria-describedby="Modal for quiz details"
      >
        <Box sx={{ ...modalStyle }}>
          <QuizDetailsInput />
        </Box>
      </Modal>
    </div>
  );
});

export default Sidebar;
