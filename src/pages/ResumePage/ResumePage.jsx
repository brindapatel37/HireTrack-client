import "./ResumePage.scss";
import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ResumeResponse from "../../components/ResumeResponse/ResumeResponse";

function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState({ resumeText: false });

  const isResumeValid = () => {
    if (!resumeText.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ resumeText: !isResumeValid() });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${baseURL}/resume`,
        { resumeText, jobDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseData(data);
      setError({ resumeText: false });
      setResumeText("");
      setJobDesc("");
      console.log(responseData);
    } catch (error) {
      setError("Error receiving feedback on resume");
    }
  };

  return (
    <>
      <Header />
      <div className="resume">
        <div className="res-header">
          <h1 className="res-header--title"> Resume Feedback Generator </h1>
          <p className="res-header--desc">
            Receive feedback on your resume based on how well the resume aligns
            with the job role. The response will generate your resume's
            strengths, weaknesses, a match score and provide an improved resume
            for consideration.
          </p>
        </div>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="form--input-section">
                <div className="form--input-box">
                  <label htmlFor="resume-text" className="form__label">
                    Input Resume
                  </label>
                  <textarea
                    name="resume-text"
                    id="resume-text"
                    placeholder="Insert resume in text format here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className={`form__resume-text ${
                      error.resumeText ? "form--invalid" : ""
                    } `}
                  />
                  {error.resumeText && (
                    <p className="error-message">Resume is required</p>
                  )}
                </div>
                <div className="form--input-box">
                  <label htmlFor="job-desc" className="form__label">
                    Input Job Description
                  </label>
                  <textarea
                    name="job-desc"
                    id="job-desc"
                    placeholder="Insert job description in text format here..."
                    onChange={(e) => setjobDescription(e.target.value)}
                    value={jobDescription}
                    className="form__job-desc"
                  />
                </div>
              </div>
              <button className="form__button" type="submit">
                Generate Feedback
              </button>{" "}
            </div>
          </form>
        </div>
        {responseData && <ResumeResponse response={responseData} />}
      </div>
      <Footer />
    </>
  );
}

export default ResumePage;
