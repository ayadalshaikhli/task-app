import React from "react";

const FilterButtons = ({ activeFilter, setFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap w-full space-x-6">
      <button
        className={` mb-2 ${
          activeFilter === "all"
            ? "bg-[#6B5DE8] text-white rounded-md px-5 py-2"
            : "bg-white text-black rounded-md px-5 py-2"
        }`}
        onClick={() => {
          setFilter("all");
          setActiveFilter("all");
        }}
      >
        All
      </button>
      <button
        className={`mb-2 ${
          activeFilter === "active"
            ? "bg-[#6B5DE8]  text-white rounded-md px-5 py-2"
            : "bg-white text-black rounded-md px-5 py-2"
        }`}
        onClick={() => {
          setFilter("active");
          setActiveFilter("active");
        }}
      >
        Active
      </button>
      <button
        className={`mb-2 ${
          activeFilter === "completed"
            ? "bg-[#6B5DE8]  text-white rounded-md px-5 py-2"
            : "bg-white text-black rounded-md px-5 py-2"
        }`}
        onClick={() => {
          setFilter("completed");
          setActiveFilter("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
