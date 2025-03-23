import { useState } from "react";
import axios from "axios";
import "./CreateTask.scss";
import { baseURL } from "../../scripts/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTask = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    task_title: "",
    duedate: "",
    task_status: "",
  });

  const [status, setStatus] = useState(["To Do", "In-progress", "Done"]);

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, duedate: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (selectedDate) {
        formData.duedate = new Date(selectedDate).toISOString().split("T")[0]; // Convert to YYYY-MM-DD
      }
      const response = await axios.post(`${baseURL}/task`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Task created successfully:", response.data);

      setFormData({
        task_title: "",
        duedate: "",
        task_status: "",
      });
      setSelectedDate(null);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Unable to create task. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <form className="create-task" onSubmit={handleSubmit}>
        <div className="create-task__section">
          <div className="create-task__form-group">
            <input
              type="text"
              name="task_title"
              value={formData["task_title"]}
              onChange={handleChange}
              className="create-task__input"
              placeholder="Enter task"
            />
          </div>
          <div className="create-task__other">
            <div className="create-task__form-group">
              <select
                name="task_status"
                value={formData["task_status"]}
                onChange={handleChange}
                className="task_status"
                placeholder="Status"
              >
                {status.map((statusOption, index) => (
                  <option key={index} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="create-task__form-group">
              <DatePicker
                selected={selectedDate}
                dateFormat="MM-dd-yyyy"
                onChange={handleDateChange}
                className="create-task__input due-date"
                calendarClassName="create-task__date-picker" // Apply the new styles
                placeholderText="Due date"
              />
            </div>
            <div className="create-task__button">
              <button className="create-task__add" type="submit">
                ➕
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTask;
