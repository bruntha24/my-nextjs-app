import React from "react";

interface YearFilterProps {
  years: (number | "All")[];
  selectedYear: number | "All";
  onYearChange: (year: number | "All") => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ years, selectedYear, onYearChange }) => {
  return (
    <div className="flex gap-4 justify-center mb-6">
      {years.map((year) => (
        <button
          key={year}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
            ${selectedYear === year ? "bg-red-700 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
          onClick={() => onYearChange(year)}
        >
          {year === "All" ? "All Years" : year}
        </button>
      ))}
    </div>
  );
};

export default YearFilter;