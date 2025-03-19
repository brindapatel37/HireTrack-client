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

const CreateJobModal = ({ isOpen, closeModal, addJob, fetchJobs }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    job_location: "",
    application_date: "",
    job_status: "",
    job_description: "",
    recruiter_phone: "",
    recruiter_email: "",
    recruiter_name: "",
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

    if (!formData["company_name"])
      newErrors["company_name"] = "Company Name is required";
    if (!formData["job_title"])
      newErrors["job_title"] = "Job Title is required";
    if (!formData["job_status"])
      newErrors["job_status"] = "Job Status is required";
    if (
      formData["recruiter_phone"] &&
      !validatePhoneNumber(formData["recruiter_phone"])
    ) {
      newErrors["recruiter_phone"] = "Phone Number must start with +1";
    }
    if (
      formData["recruiter_email"] &&
      !validateEmail(formData["recruiter_email"])
    ) {
      newErrors["recruiter_email"] = "Invalid Email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, application_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newJob = {
        ...formData,
        salary: formData.salary ? parseInt(formData.salary) : null,
      };
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      console.log("Job Data Being Sent:", newJob);

      const response = await axios.post(`${baseURL}/jobs`, newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      navigate("/jobs");
      addJob(response.data);
      setFormData({});
      closeModal();
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Unable to create job. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
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

        <form className="create-job__form" onSubmit={handleSubmit}>
          <div className="create-job__divider"></div>
          <div className="create-job__divider-horizontal"></div>
          <div className="create-job__divider-vertical"></div>
          <div className="create-job__section">
            <h2 className="create-job__section-title">Company Details</h2>
            <div className="create-job__form-group">
              <label>Company Name*</label>
              <input
                type="text"
                name="company_name"
                value={formData["company_name"]}
                onChange={handleChange}
                className={errors["company_name"] ? "error" : ""}
              />
              {errors["company_name"] && (
                <span className="error-message">{errors["company_name"]}</span>
              )}
            </div>
            <div className="create-job__form-group">
              <label>Job Title*</label>
              <input
                type="text"
                name="job_title"
                value={formData["job_title"]}
                onChange={handleChange}
                className={errors["job_title"] ? "error" : ""}
              />
              {errors["job_title"] && (
                <span className="error-message">{errors["job_title"]}</span>
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
                name="job_status"
                value={formData["job_status"]}
                onChange={handleChange}
                className={errors["job_status"] ? "error" : ""}
              >
                <option value="">Please select</option>
                {status.map((statusOption, index) => (
                  <option key={index} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
              {errors["job_status"] && (
                <span className="error-message">{errors["job_status"]}</span>
              )}
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Job Description</label>
              <textarea
                name="job_description"
                value={formData["job_description"]}
                onChange={handleChange}
                className="create-job__input"
                placeholder="Paste relevant job description details..."
              />
            </div>
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
                name="recruiter_name"
                value={formData["recruiter_name"]}
                onChange={handleChange}
                className="create-job__input"
                placeholder="Optional. Ex. Jane Doe"
              />
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Recruiter Email</label>
              <input
                type="text"
                name="recruiter_email"
                value={formData["recruiter_email"]}
                onChange={handleChange}
                className={`create-job__input ${
                  errors["recruiter_email"] ? "create-job__input--error" : ""
                }`}
                placeholder="Optional Ex. jane.doe@gmail.com"
              />
              {errors["recruiter_email"] && (
                <span className="create-job__error-message">
                  {errors["recruiter_email"]}
                </span>
              )}
            </div>
            <div className="create-job__form-group">
              <label className="create-job__label">Recruiter Phone</label>
              <input
                type="text"
                name="recruiter_phone"
                value={formData["recruiter_phone"]}
                onChange={handleChange}
                className={`create-job__input ${
                  errors["recruiter_phone"] ? "create-job__input--error" : ""
                }`}
                placeholder="Optional. Please ensure number starts with +1"
              />
              {errors["recruiter_phone"] && (
                <span className="create-job__error-message">
                  {errors["recruiter_phone"]}
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
                placeholder="Enter salary, if available"
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
