import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoadingScreen from "./assets/Loadingscreen.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ModelInterface from "./pages/ModelInterface.jsx";
import About from "./pages/About.jsx";
import FAQs from "./pages/FAQs.jsx";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("cervify_username");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        clearInterval(interval);
        return prev;
      });
    }, 75);

    const fadeTimer = setTimeout(() => setFadeOut(true), 875);
    const stopLoadingTimer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(stopLoadingTimer);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={progress} fadeOut={fadeOut} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/model"
          element={
            <ProtectedRoute>
              <ModelInterface />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
