import React from "react";
import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

const TaskItem = ({
  task, // The task object
  editingTaskId, // ID of the task being edited
  deleteTask, // Function to delete a task
  markTaskComplete, // Function to mark a task as complete
  handleTaskClick, // Function to handle task click
  handleTaskNameChange, // Function to handle task name change
  handleTaskBlur, // Function to handle task blur (when editing is finished)
  handleTaskKeyDown, // Function to handle keyboard events on tasks
  
}) => {
  const isEditing = editingTaskId === task.id;

  const handleButtonClick = () => {
    if (isEditing) {
      handleTaskClick(null);
    } else {
      handleTaskClick(task.id);
    }
  };
  return (
    <li className="flex flex-row items-center px-4 py-3 bg-white text-gray-900 rounded-xl shadow-md sm:flex-row">
      <div className="flex items-center flex-grow w-1/6">
        {isEditing ? (
          <input
            type="text"
            value={task.name}
            onChange={(e) => handleTaskNameChange(task.id, e.target.value)}
            onBlur={handleTaskBlur}
            onKeyDown={(e) => handleTaskKeyDown(task.id, e)}
            autoFocus
            className="text-gray-900 border border-gray-300 rounded-md px-2 py-1 ml-1 mr-3 w-full focus:outline-none"
          />
        ) : (
          <>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => markTaskComplete(task.id)}
              className="mr-3"
            />
            <span
              className={`${
                task.completed ? "line-through" : ""
              } cursor-pointer break-words w-1/2 text-md`}
              onClick={() => handleTaskClick(task.id)}
            >
            
              {task.name}
            </span>
          </>
        )}
      </div>
      <div className="flex">
        <button
          className={`px-2 sm:ml-3 ${
            isEditing
              ? "text-green-500 bg-transparent border border-green-500 rounded-md hover:bg-green-500 hover:text-white focus:outline-none"
              : "text-[#6B5DE8] bg-transparent border border-[#6B5DE8] rounded-md hover:bg-[#6B5DE8] hover:text-white focus:outline-none"
          }`}
          onClick={handleButtonClick}
        >
          {isEditing ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <PencilIcon className="h-5 w-5" />
          )}
        </button>
        <button
          className="px-2 py-1 ml-3 text-[#6B5DE8] bg-transparent border border-[#6B5DE8] rounded-md hover:bg-[#6B5DE8] hover:text-white focus:outline-none"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;