import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../../scripts/utils";
import deleteButton from "../../assets/icons/delete.svg";
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

    // 🔥 Ensure we're using the latest state update
    // setJob((prevJob) =>
    //   prevJob.map((job) =>
    //     job.id === editingField.jobId ? { ...job, ...editedJob } : job
    //   )
    // );
    // console.log("Edited Job Data BEFORE API Call:", { ...editedJob });
    try {
      const updatedJob = { ...editedJob };

      if (updatedJob.application_date) {
        updatedJob.application_date = new Date(updatedJob.application_date)
          .toISOString()
          .split("T")[0]; // Convert to YYYY-MM-DD
      }

      // setTimeout(() => {
      //   console.log("Final Edited Job BEFORE Saving:", updatedJob);
      // }, 0);

      const token = localStorage.getItem("token");
      await axios.patch(`${baseURL}/jobs/${job.id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // ✅ Ensure UI reflects changes by updating `jobs`
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
          <div className="details__company-info">
            <div className="jobs__cell">
              <div className="jobs__cell-label">Company </div>

              <div
                className="jobs__cell-item jobs__name"
                onClick={() => handleFieldClick("company_name")}
              >
                {editingField?.field === "company_name" ? ( // ✅ Corrected condition
                  <input
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
          </div>
          <div className="details__additional-info">
            <h1>hi</h1>
          </div>
        </div>
      </div>
    </>
  );
}
