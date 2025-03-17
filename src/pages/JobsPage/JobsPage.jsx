import "./JobsPage.scss";
// import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreateJobModal from "../../components/CreateJobModal/CreateJobModal";

function JobsPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  return (
    <>
      <Header />
      <h1> HI Jobs Page </h1>
      <button onClick={openModal} className="create-job-button">
        + Create Job
      </button>
      <CreateJobModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        addJob={addJob}
      />
      <Footer />
    </>
  );
}

export default JobsPage;
