import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function CalendarSection({ onClose }) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [
    ["", "", "", "", "", "", 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, "", "", "", "", ""],
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 w-full max-w-md mx-auto min-h-screen bg-gray-100 relative">
     
      <div className="absolute top-1 md:hidden">
        <button 
          onClick={onClose}
          className="p-2 rounded-full transition-colors"
          aria-label="Close calendar"
        >
          <FontAwesomeIcon icon={faXmark} className="text-lg hover:text-red-600 text-gray-700" />
        </button>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mt-8 sm:mt-10">
       
        <div className="flex justify-center mb-6 sm:mb-10 md:mb-12">
          <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 text-white py-2 px-3 sm:py-3 sm:px-4 rounded-lg sm:rounded-xl text-center shadow-md w-16 sm:w-20 md:w-24">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider">Aug</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">25</p>
            <p className="text-[10px] sm:text-xs font-light opacity-80">Wednesday</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm transition-colors">
              {"<"}
            </button>
            <p className="font-medium text-sm sm:text-base whitespace-nowrap">May 2025</p>
            <button className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm transition-colors">
              {">"}
            </button>
          </div>

          <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs sm:text-sm transition-colors">
            Today
          </button>
        </div>

        
        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-emerald-600 mb-1">
          {days.map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        
        <div className="grid grid-cols-7 gap-1 text-center">
          {dates.flat().map((date, idx) => {
            const isSelected = date === 25;
            const isRange = [10, 11, 12, 13, 14, 15].includes(date);
            const isToday = date === new Date().getDate(); 

            return (
              <button
                key={idx}
                className={`
                  h-6 sm:h-8 md:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm
                  ${isSelected ? "bg-emerald-500 text-white font-bold" : ""}
                  ${isRange && !isSelected ? "bg-emerald-50 text-emerald-600" : ""}
                  ${isToday && !isSelected ? "border border-emerald-500" : ""}
                  ${!date ? "invisible" : "hover:bg-gray-100"}
                  transition-colors
                `}
                disabled={!date}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarSection;