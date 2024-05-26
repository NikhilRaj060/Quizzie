import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AutPage";
import Container from "./pages/ContainerPage/ContainerPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import { ModalProvider } from "./Hook/ModalContext";
import QuizPublish from "./components/CreateQuiz/QuizBuilder/QuizPublish/QuizPublish.jsx";
import QuizPage from "./pages/QuizPage/QuizPage.jsx";
import "./App.css";
import ResultPage from "./pages/ResultPage/ResultPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import QuestionAnalysis from "./components/QuestionAnalysis/QuestionAnalysis";

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={HomePage} />}>
            <Route path="/" element={<ProtectedRoute Component={Container} />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/analytics"
                element={<ProtectedRoute Component={Analytics} />}
              />
              <Route
                path="/analytics/:quizId"
                element={<ProtectedRoute Component={QuestionAnalysis} />}
              />
            </Route>
          </Route>
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/signup" element={<AuthPage />} />

          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/quiz/result/:quizId" element={<ResultPage />} />
        </Routes>
        <QuizPublish />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
