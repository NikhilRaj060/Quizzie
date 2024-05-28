import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isQuizBuilderModalOpen, setIsQuizBuilderModalOpen] = useState(false);
  const [isQuizPublishModalOpen, setIsQuizPublishModalOpen] = useState(false);
  const [quizLink, setQuizLink] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const openQuizModal = () => setIsQuizModalOpen(true);
  const openQuizBuilderModal = (data = null, isEdit) => {
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
    setQuizData(null);
  };

  const openDeleteModal = (quizId) => {
    setQuizId(quizId)
    setIsDeleteModalOpen(true);
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

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
      isDeleteModalOpen,
      openDeleteModal,
      closeDeleteModal,
      quizLink,
      quizData,
      isEdit,
      quizId
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
