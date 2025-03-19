import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../scripts/utils";
import deleteButton from "../../assets/icons/delete.svg";
import editButton from "../../assets/icons/edit.svg";
import chevronButton from "../../assets/icons/typcn--chevron-right.svg";
import "./JobsTable.scss";
import { Link, useParams } from "react-router-dom";
import sortButton from "../../assets/icons/sort.svg";

export default function JobsTable({ jobs, setJobs }) {
  const { id } = useParams();
  const [editingField, setEditingField] = useState(null); // tracks field being edited
  const [editedJob, setEditedJob] = useState({}); // store updated values before save

  const handleFieldClick = (job, field) => {
    setEditingField({ jobId: job.id, field });
    setEditedJob({ ...job });
  };

  const handleSave = async () => {
    setEditingField(null);

    // 🔥 Ensure we're using the latest state update
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === editingField.jobId ? { ...job, ...editedJob } : job
      )
    );
    console.log("Edited Job Data BEFORE API Call:", { ...editedJob });
    const updatedJob = { ...editedJob };

    if (updatedJob.application_date) {
      updatedJob.application_date = new Date(updatedJob.application_date)
        .toISOString()
        .split("T")[0]; // Convert to YYYY-MM-DD
    }

    setTimeout(() => {
      console.log("Final Edited Job BEFORE Saving:", updatedJob);
    }, 0);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${baseURL}/jobs/${editingField.jobId}`, editedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // ✅ Ensure UI reflects changes by updating `jobs`
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editingField.jobId ? updatedJob : job
        )
      );
      console.log("Updated Job Data AFTER API Call:", updatedJob);
    } catch (e) {
      console.log("Error saving job edits:", e);
      alert("Unable to update job. Please try again.");
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (e) {
      console.log("Error deleting warehouse:", e);
    }
  };

  if (!jobs) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="main">
        <div className="main__header">
          <h1 className="main__header--name">Job Tracker</h1>
        </div>
        <div className="main__counter">
          <p className="main__count">Total Jobs: {jobs.length}</p>
        </div>
      </div>

      <div className="jobs__header">
        <div className="jobs__column">
          Company{" "}
          <img className="jobs__sort-icon" src={sortButton} alt="Sort" />
        </div>
        <div className="jobs__column">
          Job Title{" "}
          <img className="jobs__sort-icon" src={sortButton} alt="Sort" />
        </div>
        <div className="jobs__column">
          Location{" "}
          <img className="jobs__sort-icon" src={sortButton} alt="Sort" />
        </div>
        <div className="jobs__column">
          App Due Date{" "}
          <img className="jobs__sort-icon" src={sortButton} alt="Sort" />
        </div>
        <div className="jobs__column">
          Status <img className="jobs__sort-icon" src={sortButton} alt="Sort" />
        </div>
        <div className="jobs__column">Salary $</div>
        <div className="jobs__column">Notes</div>
        <div className="jobs__column jobs__delete">Delete</div>
      </div>

      {jobs.map((job) => {
        return (
          <div className="jobs__row" key={job.id}>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Company{" "}
                  <img
                    className="jobs__sort-icon"
                    src={sortButton}
                    alt="Sort"
                  />
                </div>

                <div
                  className="jobs__cell-item jobs__name"
                  onClick={() => handleFieldClick(job, "company_name")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "company_name" ? (
                    <input
                      type="text"
                      value={editedJob.company_name}
                      onChange={(e) =>
                        setEditedJob({
                          ...editedJob,
                          company_name: e.target.value,
                        })
                      }
                      onBlur={handleSave} // Save when clicking outside
                      onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter
                      autoFocus
                    />
                  ) : (
                    job.company_name
                  )}
                  <div className="jobs__arrow">
                    <Link to={`/jobs/${job.id}`} className="jobs__link">
                      <img src={chevronButton} alt="Arrow" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Job Title{" "}
                  <img
                    className="jobs__sort-icon"
                    src={sortButton}
                    alt="Sort"
                  />
                </div>
                <div
                  className="jobs__cell-item jobs__title"
                  onClick={() => handleFieldClick(job, "job_title")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "job_title" ? (
                    <input
                      type="text"
                      value={editedJob.job_title}
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
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Location{" "}
                  <img
                    className="jobs__sort-icon"
                    src={sortButton}
                    alt="Sort"
                  />
                </div>
                <div
                  className="jobs__cell-item jobs__location"
                  onClick={() => handleFieldClick(job, "job_location")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "job_location" ? (
                    <input
                      type="text"
                      value={editedJob.job_location}
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
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  App Due Date{" "}
                  <img
                    className="jobs__sort-icon"
                    src={sortButton}
                    alt="Sort"
                  />
                </div>
                <div
                  className="jobs__cell-item jobs__date"
                  onClick={() => handleFieldClick(job, "application_date")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "application_date" ? (
                    <input
                      type="date"
                      value={editedJob.application_date}
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
                    new Date(job.application_date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Status{" "}
                  <img
                    className="jobs__sort-icon"
                    src={sortButton}
                    alt="Sort"
                  />
                </div>
                <div
                  className={`jobs__cell-item jobs__status ${
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
                  onClick={() => handleFieldClick(job, "job_status")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "job_status" ? (
                    <select
                      value={editedJob.job_status || ""}
                      onChange={(e) => {
                        console.log("Updated Job Status:", e.target.value);
                        const newStatus = e.target.value;
                        setEditedJob((prev) => ({
                          ...prev,
                          job_status: newStatus,
                        }));
                      }}
                      onBlur={handleSave} // Save when clicking outside
                      onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter
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
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Salary ${" "}
                </div>
                <div
                  className="jobs__cell-item jobs__salary"
                  onClick={() => handleFieldClick(job, "salary")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "salary" ? (
                    <input
                      type="number"
                      value={editedJob.salary}
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
            </div>
            <div className="jobs__column">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Notes
                </div>
                <div
                  className="jobs__cell-item jobs__notes"
                  onClick={() => handleFieldClick(job, "notes")}
                >
                  {editingField?.jobId === job.id &&
                  editingField?.field === "notes" ? (
                    <input
                      type="text"
                      value={editedJob.notes}
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
            <div className="jobs__column jobs__delete">
              <div className="jobs__cell">
                <div className="jobs__cell-label jobs__cell-label--first">
                  Delete
                </div>
                <img
                  className="jobs__delete--icon"
                  src={deleteButton}
                  alt="Delete"
                  onClick={() => handleDelete(job.id)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
