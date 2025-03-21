import "./JobsDetailPage.scss";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import JobDetails from "../../components/JobDetails/JobDetails";
import TasksWidget from "../../components/TasksWidget/TasksWidget";

function JobsDetailPage() {
  return (
    <>
      <div className="page">
        <Header />
        <div className="jobsdetail-page">
          <TasksWidget />
          <JobDetails />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobsDetailPage;
