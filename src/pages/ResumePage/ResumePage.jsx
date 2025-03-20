import "./ResumePage.scss";
import { baseURL } from "../../scripts/utils";
import ReactMarkdown from "react-markdown";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [responseData, setResponseData] = useState({
    matchScore: 1,
    strengths: ["Indicates experience as a tour guide."],
    weaknesses: [
      "Extremely limited information provided.",
      "Lacks any detail regarding responsibilities, accomplishments, or specific skills.",
      "No mention of location, contact information, or any other relevant details.",
      "The format is unconventional and unprofessional.",
      "Doesn't showcase any skills relevant to leading tours, managing groups, or providing excellent customer service.",
      "The name provided appears to be incorrect.",
    ],
    suggestions: [
      "Expand on your experience as a tour guide, detailing the types of tours you led, the locations, and the duration of each role.",
      'Quantify your accomplishments whenever possible (e.g., "Led tours for an average of X people per week," "Increased positive customer feedback by Y%").',
      "Highlight skills relevant to the job description, such as communication, leadership, problem-solving, and customer service skills.",
      "Include your contact information (phone number, email address).",
      "Reformat the resume to be more professional and readable. Use bullet points to list responsibilities and achievements.",
      "Research the CN Tower and tailor your resume to demonstrate your knowledge of the attraction and its requirements for tour guides.",
      "Address the name discrepancy and provide your accurate name.",
    ],
    improvedResume:
      ' **[Jimmy McGill]**\n[Your Phone Number] | [Your Email Address] | [Your LinkedIn Profile (Optional)]\n\n**Summary**\nEnthusiastic and experienced tour guide with [Number] years of experience providing engaging and informative tours. Proven ability to connect with diverse audiences, manage groups effectively, and ensure a positive and memorable experience. Seeking a Tour Lead position at the CN Tower to utilize my passion for sharing knowledge and creating exceptional visitor experiences.\n\n**Experience**\n**Tour Guide** | [Previous Employer/Organization] | [City, Province] | [Dates of Employment (e.g., 2011 - Present)]\n*  Led tours for [Number] visitors per [Day/Week/Month], providing engaging and informative commentary.\n*  Managed group logistics, ensuring smooth and safe tour experiences.\n*  Responded to visitor questions and addressed concerns effectively.\n*  Maintained a positive and professional demeanor, creating a welcoming atmosphere.\n*  [Add another bullet point highlighting a specific achievement, e.g., "Consistently received positive feedback from tour participants, achieving an average satisfaction rating of X out of 5."]\n\n**Skills**\n*   Communication (Excellent verbal and written communication skills)\n*   Customer Service (Proven ability to provide exceptional customer service)\n*   Leadership (Experience leading and managing groups)\n*   Problem-Solving (Ability to quickly and effectively resolve issues)\n*   Public Speaking (Comfortable speaking to large groups)\n*   [Add any other relevant skills, e.g., Knowledge of local history, Fluency in multiple languages, First Aid/CPR certification]\n',
  });
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
        { resumeText, jobDescription }, // ✅ Send resume and job description
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
            Receive feedback on your resume based on the job you're applying for. The response will generate your
            resume's strengths, weaknesses, a match score and provide an improved resume.
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
                    className={`form__resume-text ${error.resumeText ? "form--invalid" : ""} `}
                  />
                  {error.resumeText && <p className="error-message">Resume is required</p>}
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
        {responseData && <Response response={responseData} />}
      </div>
      <Footer />
    </>
  );
}

function Response({ response }) {
  return (
    <div className="form__response-box">
      <ReactMarkdown>{response.improvedResume}</ReactMarkdown>
      <h2>Suggestions:</h2>
      {response.suggestions.map((s) => (
        <p key={s}>{s}</p>
      ))}
    </div>
  );
}

export default ResumePage;
