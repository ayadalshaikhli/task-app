import React, { useState } from "react";

const ClearCompletedButton = ({ clearCompletedTasks }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleClearCompleted = () => {
    clearCompletedTasks();
    setShowNotification(true);

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div>
      <button
        className="px-5 py-2 bg-[#6B5DE8] rounded-xl text-white"
        onClick={handleClearCompleted}
      >
        Clear Completed
      </button>

      {showNotification && (
        <div className="fixed bottom-1 right-1 bg-green-500 text-white p-3 mt-2 rounded-md md:h-12 md:top-10 md:right-10 z-20">
          All completed tasks have been cleared!
        </div>
      )}
    </div>
  );
};

export default ClearCompletedButton;
