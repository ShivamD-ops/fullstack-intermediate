import React from "react";
import { useState, useEffect } from "react";
// import "../App.css";
function ToDoApp() {
  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/todos?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFetchedTasks(data.todos); // correct assignment
        setFetchError(null);
      })
      .catch((error) => {
        setFetchError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };
  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput("");
  };
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  return (
    <div className="container">
      <h2>My To-Do List</h2>
      <input
        type="text"
        placeholder="Enter new task"
        value={taskInput}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button
              onClick={() => handleDeleteTask(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Tasks Fetched from API</h3>
      {isLoading && <p>Loading tasks from API...</p>}
      {fetchError && <p style={{ color: "red" }}>Error: {fetchError}</p>}
      {!isLoading && !fetchError && (
        <ul>
          {fetchedTasks.map((task) => (
            <li key={task.id}>
              {task.todo} {task.completed ? "(Completed)" : "(Pending)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ToDoApp;
