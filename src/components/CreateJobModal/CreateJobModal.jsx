import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../scripts/utils";
import ReactModal from "react-modal";
import axios from "axios";
import closeIcon from "../../assets/icons/typcn--times.svg";
import "./CreateJobModal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ReactModal.setAppElement("#root");

const CreateJobModal = ({ isOpen, closeModal, addJob }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobLocation: "",
    applicationDate: "",
    jobStatus: "",
    jobDescription: "",
    recruiterPhone: "",
    recruiterEmail: "",
    recruiterName: "",
    salary: "",
    notes: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState([
    "Application in progress",
    "Applied",
    "Interviewing",
    "Final Interview",
    "Offer Received",
    "Negotiating",
    "Accepted",
    "Rejected",
    "Withdrawn",
    "Ghosted",
  ]);

  const validateEmail = (email) => email.includes("@") && email.includes(".");
  const validatePhoneNumber = (phone) => phone.startsWith("+1");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.jobStatus) newErrors.jobStatus = "Job Status is required";
    if (!validatePhoneNumber(formData.recruiterPhone)) {
      newErrors.recruiterPhone = "Phone Number must start with +1";
    }
    if (!validateEmail(formData.recruiterEmail)) {
      newErrors.recruiterEmail = "Invalid Email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, applicationDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newJob = {
        ...formData,
        salary: formData.salary ? parseInt(formData.salary) : null,
      };
      const token = localStorage.getItem("authToken");
      await axios.post(`${baseURL}/jobs`, newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/jobs");
      addJob(response.data);
      closeModal();
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Unable to create job. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create new job"
      className="create-job-modal"
      overlayClassName="create-job-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="create-job">
        <div className="create-job-modal__header">
          <h2 className="create-job-modal__title">Create new Job</h2>
          <button className="create-job-modal__close" onClick={closeModal}>
            <img src={closeIcon} alt="Close Button" />
          </button>
        </div>
        <div className="create-job__divider"></div>
        <form className="create-job__form" onSubmit={handleSubmit}>
          <div className="create-job__form-group">
            <label>Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={errors.companyName ? "error" : ""}
            />
            {errors.companyName && (
              <span className="error-message">{errors.companyName}</span>
            )}
          </div>
          <div className="create-job__form-group">
            <label>Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className={errors.jobTitle ? "error" : ""}
            />
            {errors.jobTitle && (
              <span className="error-message">{errors.jobTitle}</span>
            )}
          </div>
          <div className="create-job__form-group">
            <label>Application Due Date</label>
            <DatePicker
              selected={selectedDate}
              dateFormat="MM-dd-yyyy"
              onChange={handleDateChange}
              className="create-job__input"
              placeholderText="Select the application due date"
            />
          </div>
          <div className="create-job__form-group">
            <label>Application Status*</label>
            <select
              name="jobStatus"
              value={formData.jobStatus}
              onChange={handleChange}
              className={errors.jobStatus ? "error" : ""}
            >
              <option value="">Please select</option>
              {status.map((statusOption, index) => (
                <option key={index} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
            {errors.jobStatus && (
              <span className="error-message">{errors.jobStatus}</span>
            )}
          </div>
          <div className="create-job__form-group">
            <label className="create-job__label">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="create-job__input"
              placeholder="Paste relevant job description details..."
            />
          </div>
          <div className="create-job__divider-horizontal"></div>
          <div className="create-job__divider-vertical"></div>
          <div className="create-job__section">
            <h2 className="create-job__section-title">
              Additional Information
            </h2>
            <div className="create-job__form-group">
              <label className="create-job__label">Recruiter Name</label>
              <input
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleChange}
                className="create-job__input"
                placeholder="Optional. Ex. Jane Doe"
              />
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Recruiter Email</label>
              <input
                type="text"
                name="recruiterEmail"
                value={formData.recruiterEmail}
                onChange={handleChange}
                className={`create-job__input ${
                  errors.recruiterEmail ? "create-job__input--error" : ""
                }`}
                placeholder="Optional Ex. jane.doe@gmail.com"
              />
              {errors.recruiterEmail && (
                <span className="create-job__error-message">
                  {errors.recruiterEmail}
                </span>
              )}
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Recruiter Phone</label>
              <input
                type="text"
                name="recruiterPhone"
                value={formData.recruiterPhone}
                onChange={handleChange}
                className={`create-job__input ${
                  errors.recruiterPhone ? "create-job__input--error" : ""
                }`}
                placeholder="Optional. Please ensure number starts with +1"
              />
              {errors.recruiterPhone && (
                <span className="create-job__error-message">
                  {errors.recruiterPhone}
                </span>
              )}
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="create-job__input"
                placeholder="Enter salary information, if available"
              />
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="create-job__input"
                placeholder="Add any additional notes..."
              />
            </div>
            <div className="create-job-modal__buttons">
              <button
                className="create-job-modal__cancel"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className="create-job-modal__save" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default CreateJobModal;
