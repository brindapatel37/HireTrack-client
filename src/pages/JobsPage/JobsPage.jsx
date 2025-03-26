import "./JobsPage.scss";
import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreateJobModal from "../../components/CreateJobModal/CreateJobModal";
import JobsTable from "../../components/JobsTable/JobsTable";
import TasksWidget from "../../components/TasksWidget/TasksWidget";

function JobsPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  async function fetchJobs() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${baseURL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(data);
    } catch (e) {
      console.log("Error fetching jobs list:", e);
      alert("Unable to fetch jobs list. Please try again.");
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div className="page">
        <Header />
        <div className="jobs-page">
          <h1 className="user-hello"> Start tracking your jobs! </h1>
          <button onClick={openModal} className="create-job-button">
            + Create Job
          </button>
          <CreateJobModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            addJob={addJob}
            fetchJobs={fetchJobs}
          />
          <TasksWidget />
          <JobsTable jobs={jobs} setJobs={setJobs} />
        </div>
        <Footer className="footer" />
      </div>
    </>
  );
}

export default JobsPage;
