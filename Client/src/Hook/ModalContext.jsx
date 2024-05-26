import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isQuizBuilderModalOpen, setIsQuizBuilderModalOpen] = useState(false);
  const [isQuizPublishModalOpen, setIsQuizPublishModalOpen] = useState(false);
  const [quizLink, setQuizLink] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [isEdit , setIsEdit] = useState(false)

  const openQuizModal = () => setIsQuizModalOpen(true);
  const openQuizBuilderModal = (data = null,isEdit) => {
    setIsEdit(isEdit)
    setQuizData(data);
    setIsQuizBuilderModalOpen(true);
  };
  const openQuizPublishModal = (link) => {
    setQuizLink(link);
    setIsQuizPublishModalOpen(true);
  };

  const closeQuizModal = () => setIsQuizModalOpen(false);
  const closeQuizBuilderModal = () => setIsQuizBuilderModalOpen(false);
  const closePublishModalOpen = () => setIsQuizPublishModalOpen(false);

  const closeAllModals = () => {
    setIsQuizModalOpen(false);
    setIsQuizBuilderModalOpen(false);
    setIsQuizPublishModalOpen(false);
    setQuizData(null); // Reset quiz data when closing all modals
  };

  return (
    <ModalContext.Provider value={{
      isQuizModalOpen,
      openQuizModal,
      closeQuizModal,
      isQuizBuilderModalOpen,
      openQuizBuilderModal,
      closeQuizBuilderModal,
      isQuizPublishModalOpen,
      openQuizPublishModal,
      closePublishModalOpen,
      closeAllModals,
      quizLink,
      quizData,
      isEdit
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
