import { useState } from "react";
import "./App.scss";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "../src/components/Footer/Footer";
import LoginPage from "../src/components/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>HI There</h1>
        <Header />
        <Routes>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobsDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/jobs" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
