import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import TaskItem from "./TaskItem";
import FilterButtons from "./FilterButtons";
import ClearCompletedButton from "./ClearCompletedButton";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showNotification, setShowNotification] = useState(false);


  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the task list
  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), name: newTask, completed: false },
      ];
      setTasks(updatedTasks);
      setNewTask("");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4000)
    }
  };

  // Delete a task from the task list
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle the completion status of a task
  const markTaskComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Clear all completed tasks from the task list
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  // Set the task ID being edited
  const handleTaskClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  // Update the name of a task
  const handleTaskNameChange = (taskId, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  };

  // Clear the currently edited task
  const handleTaskBlur = () => {
    setEditingTaskId(null);
  };

  // Handle keyboard events on tasks add and task edit
  const handleTaskKeyDown = (taskId, event) => {
    if (event.key === "Enter") {
      if (taskId === null) {
        addTask(); 
      } else {
        handleTaskBlur();
      }
    } else if (event.key === "Escape") {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        setEditingTaskId(null);
        handleTaskNameChange(taskId, task.name);
      }
    }
  };

  // Filter the tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Animation
  const taskItemsContainerRef = useRef(null);
  useEffect(() => {
    const taskItemsContainer = taskItemsContainerRef.current;
    gsap.fromTo(
      taskItemsContainer.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
    );
  }, [filter]);



  

  return (
    <div className="container mx-auto p-4 w-full sm:w-full md:w-full lg:w-1/2">
      <h1 className="text-4xl font-bold text-center mb-4">Task App</h1>
      <div className="flex flex-col md:flex-row mb-2 md:mb-4">
        {/* Input for adding new tasks */}
        <input
          type="text"
          className="flex-1 px-2 py-3 rounded-md text-black mb-2 md:mr-2 md:mb-0"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => handleTaskKeyDown(null, e)}
        />
        {/* Button for adding new tasks */}
        <button
          className="px-4 py-2 bg-[#6B5DE8] rounded-xl text-white"
          onClick={addTask}
        >
          Add
        </button>
        {showNotification && (
          <div className="fixed bottom-1 right-1 bg-green-500 text-white p-3 mt-2 rounded-md md:h-12 md:fixed md:top-10 md:right-10 z-20">
            Task added successfully!
        </div>
        )}
      </div>
      <div className="flex flex-col mb-4 md:flex-row md:justify-between">
        {/* Filter buttons */}
        <FilterButtons
          activeFilter={activeFilter}
          setFilter={setFilter}
          setActiveFilter={setActiveFilter}
        />
        {/* Button to clear completed tasks */}
        <ClearCompletedButton clearCompletedTasks={clearCompletedTasks} />
      </div>
      <ul className="space-y-5" ref={taskItemsContainerRef}>
        {/* Render the list of tasks */}
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingTaskId={editingTaskId}
            deleteTask={deleteTask}
            markTaskComplete={markTaskComplete}
            handleTaskClick={handleTaskClick}
            handleTaskNameChange={handleTaskNameChange}
            handleTaskBlur={handleTaskBlur}
            handleTaskKeyDown={handleTaskKeyDown}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
