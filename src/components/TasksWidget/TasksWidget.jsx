import "./TasksWidget.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../scripts/utils";
import closeButton from "../../assets/icons/typcn--times.svg";
import notesButton from "../../assets/icons/notes-plus.svg";

function TasksWidget() {
  const [expand, setExpand] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [taskStatus, setTaskStatus] = useState({});

  async function fetchTasks() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${baseURL}/task`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(data);
    } catch (e) {
      console.log("Error fetching tasks:", e);
      alert("Unable to fetch tasks. Please try again.");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFieldClick = (task, field) => {
    setEditingField({ taskId: task.id, field });
    setEditedTask({ ...task });
  };

  function handleChange(e, taskId) {
    const newStatus = e.target.value;
    setEditedTask((prev) => ({
      ...prev,
      task_status: newStatus, // ✅ Update the edited task directly
    }));
  }

  const handleSave = async () => {
    if (!editingField) return;
    console.log(taskStatus[3]);
    setEditingField(null);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingField.taskId ? { ...task, ...editedTask } : task
      )
    );

    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${baseURL}/task/${editingField.taskId}`, editedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log("Error saving task edits:", e);
      alert("Unable to update task. Please try again.");
    }
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <>
      <div className="notes__button" onClick={toggleExpand}>
        <img
          className="notes__button--icon"
          src={notesButton}
          alt="Notes Icon"
        />
      </div>
      <div className={`widget${expand ? " widget__fullview" : ""}`}>
        <section className={`content${expand ? " content__fullview" : ""}`}>
          <div className="close__button" onClick={toggleExpand}>
            <img
              className="close__button--icon"
              src={closeButton}
              alt="Close Icon"
            />
          </div>
          <div className="content__expand">
            {tasks.map((task) => (
              <div className="tasks__row" key={task.id}>
                {/* Task Title */}
                <div className="tasks__column">
                  <div
                    className="tasks__cell-item tasks__name"
                    onClick={() => handleFieldClick(task, "task_title")}
                  >
                    {editingField?.taskId === task.id &&
                    editingField?.field === "task_title" ? (
                      <input
                        className="tasks__input tasks__input--name"
                        type="text"
                        value={editedTask.task_title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            task_title: e.target.value,
                          })
                        }
                        onBlur={handleSave}
                        autoFocus
                      />
                    ) : (
                      task.task_title
                    )}
                  </div>
                </div>

                {/* Due Date */}
                <div className="tasks__other">
                  <div className="tasks__column">
                    <div
                      className="tasks__cell-item tasks__date"
                      onClick={() => handleFieldClick(task, "duedate")}
                    >
                      {editingField?.taskId === task.id &&
                      editingField?.field === "duedate" ? (
                        <input
                          className="tasks__input"
                          type="date"
                          value={editedTask.duedate}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              duedate: e.target.value,
                            })
                          }
                          onBlur={handleSave}
                          autoFocus
                        />
                      ) : (
                        new Date(task.duedate).toLocaleDateString()
                      )}
                    </div>
                  </div>

                  {/* Task Status */}
                  <div className="tasks__column">
                    <div
                      className="tasks__cell-item tasks__status"
                      onClick={() => handleFieldClick(task, "task_status")}
                    >
                      {editingField?.taskId === task.id &&
                      editingField?.field === "task_status" ? (
                        <select
                          className="tasks__input"
                          value={editedTask.task_status || task.task_status}
                          onChange={(e) => handleChange(e, task.id)}
                          onBlur={handleSave}
                          autoFocus
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Blocked">Blocked</option>
                          <option value="Done">Done</option>
                        </select>
                      ) : (
                        task.task_status
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default TasksWidget;
