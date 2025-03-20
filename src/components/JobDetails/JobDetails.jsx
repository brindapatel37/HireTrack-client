import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../scripts/utils";
import deleteButton from "../../assets/icons/delete_white.svg";
import editButton from "../../assets/icons/edit.svg";
import backButton from "../../assets/icons/back.svg";
import "./JobDetails.scss";
import { Link, useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [editingField, setEditingField] = useState(null); // tracks field being edited
  const [editedJob, setEditedJob] = useState({}); // store updated values before save

  async function fetchJob() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${baseURL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(data);
    } catch (e) {
      console.log("Error fetching job details:", e);
      alert("Unable to fetch job information. Please try again.");
    }
  }

  useEffect(() => {
    fetchJob();
  }, []);

  const handleFieldClick = (field) => {
    setEditingField({ field });
    setEditedJob({ ...job });
  };

  const handleSave = async () => {
    setEditingField(null);

    try {
      const updatedJob = { ...editedJob };

      if (updatedJob.application_date) {
        updatedJob.application_date = new Date(updatedJob.application_date)
          .toISOString()
          .split("T")[0];
      }

      const token = localStorage.getItem("token");
      await axios.patch(`${baseURL}/jobs/${job.id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setJob(updatedJob);
      setEditingField(null);
    } catch (e) {
      console.log("Error saving job edits:", e);
      alert("Unable to update job. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/jobs/${job.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setJob(null);
    } catch (e) {
      console.log("Error deleting job", e);
    }
  };

  if (!job) {
    return <div>Loading...No Job with this ID exists</div>;
  }

  return (
    <>
      <div className="details">
        <div className="details__head">
          <div className="details__header">
            <Link to={`/jobs`} className="details__header--back-link">
              <img
                className="details__header--back"
                alt="back-icon"
                src={backButton}
              />
            </Link>
            <h1 className="details__header--name">{job.company_name}</h1>
          </div>
          <div className="details__delete">
            <img
              className="jobs__delete--icon"
              src={deleteButton}
              alt="Delete"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="details__main">
          <div className="details__main-info">
            <h2 className="details__title">Company Details</h2>
            <div className="details__cell">
              <div className="details__cell-label">Company </div>

              <div
                className="details__cell-item details__name"
                onClick={() => handleFieldClick("company_name")}
              >
                {editingField?.field === "company_name" ? (
                  <input
                    className="details__input details__input--company"
                    type="text"
                    value={editedJob.company_name || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        company_name: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.company_name
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Job Title </div>

              <div
                className="details__cell-item details__title"
                onClick={() => handleFieldClick("job_title")}
              >
                {editingField?.field === "job_title" ? (
                  <input
                    className="details__input details__input--title"
                    type="text"
                    value={editedJob.job_title || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        job_title: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.job_title
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Job Location </div>

              <div
                className="details__cell-item details__location"
                onClick={() => handleFieldClick("job_location")}
              >
                {editingField?.field === "job_location" ? (
                  <input
                    className="details__input details__input--location"
                    type="text"
                    value={editedJob.job_location || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        job_location: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.job_location
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Application Due Date </div>

              <div
                className="details__cell-item details__date"
                onClick={() => handleFieldClick("application_date")}
              >
                {editingField?.field === "application_date" ? (
                  <input
                    className="details__input details__input--date"
                    type="text"
                    value={editedJob.application_date || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        application_date: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  new Date(job.application_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Application Status </div>

              <div
                className={`details__cell-item details__status ${
                  job.job_status === "Offer Received"
                    ? "offer-received"
                    : job.job_status === "Applied"
                    ? "applied"
                    : job.job_status === "Accepted"
                    ? "Accepted"
                    : job.job_status === "Rejected"
                    ? "rejected"
                    : "other-status"
                }`}
                onClick={() => handleFieldClick("job_status")}
              >
                {editingField?.field === "job_status" ? (
                  <select
                    className="details__input details__input--job-status"
                    value={editedJob.job_status || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        job_status: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  >
                    <option value="In progress">In-progress</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Final Interview">Final Interview</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                    <option value="Ghosted">Ghosted</option>
                  </select>
                ) : (
                  job.job_status
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Job Description </div>
              <div
                className="details__cell-item details__description"
                onClick={() => handleFieldClick("job_description")}
              >
                {editingField?.field === "job_description" ? (
                  <textarea
                    className="details__input details__input--description"
                    value={editedJob.job_description || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        job_description: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.job_description
                )}
              </div>
            </div>
          </div>
          <div className="divider"> </div>
          <div className="details__additional-info">
            <h2 className="details__title">Additional Information</h2>
            <div className="details__cell">
              <div className="details__cell-label">Recruiter Name </div>
              <div
                className="details__cell-item details__recruiter-name"
                onClick={() => handleFieldClick("recruiter_name")}
              >
                {editingField?.field === "recruiter_name" ? (
                  <input
                    className="details__input details__input--name"
                    type="text"
                    value={editedJob.recruiter_name || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        recruiter_name: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.recruiter_name
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Recruiter Email </div>
              <div
                className="details__cell-item details__email"
                onClick={() => handleFieldClick("recruiter_email")}
              >
                {editingField?.field === "recruiter_email" ? (
                  <input
                    className="details__input details__input--email"
                    type="text"
                    value={editedJob.recruiter_email || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        recruiter_email: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.recruiter_email
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Recruiter Phone </div>
              <div
                className="details__cell-item details__phone"
                onClick={() => handleFieldClick("recruiter_phone")}
              >
                {editingField?.field === "recruiter_phone" ? (
                  <input
                    className="details__input details__input--phone"
                    type="text"
                    value={editedJob.recruiter_phone || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        recruiter_phone: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.recruiter_phone
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Salary </div>
              <div
                className="details__cell-item details__salary"
                onClick={() => handleFieldClick("salary")}
              >
                {editingField?.field === "salary" ? (
                  <input
                    className="details__input details__input--salary"
                    type="number"
                    value={editedJob.salary || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        salary: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.salary
                )}
              </div>
            </div>
            <div className="details__cell">
              <div className="details__cell-label">Notes</div>
              <div
                className="details__cell-item details__notes"
                onClick={() => handleFieldClick("notes")}
              >
                {editingField?.field === "notes" ? (
                  <textarea
                    className="details__input details__input--notes"
                    value={editedJob.notes || ""}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        notes: e.target.value,
                      })
                    }
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                  />
                ) : (
                  job.notes
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
