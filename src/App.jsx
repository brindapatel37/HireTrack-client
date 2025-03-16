import { useState } from "react";
import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import JobsPage from "./pages/JobsPage/JobsPage.jsx";
import JobsDetailPage from "./pages/JobsDetailPage/JobsDetailPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import ResumePage from "./pages/ResumePage/ResumePage.jsx";
import JobsDashboardPage from "./pages/JobsDashboardPage/JobsDashboardPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/dashboard" element={<JobsDashboardPage />} />
          <Route path="/jobs/:id" element={<JobsDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/jobs" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
