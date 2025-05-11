import React from "react";

function CalenderSection() {
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
    <div className="p-6 max-w-md mx-auto h-screen bg-gray-100">
      <div className="bg-white rounded-xl p-5 mt-10">

        <div className="flex justify-center mb-20 mt-8">
          <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 text-white p-4 rounded-xl text-center shadow-lg w-24">
            <p className="text-sm font-medium uppercase tracking-wider">Aug</p>
            <p className="text-4xl font-bold leading-tight">25</p>
            <p className="text-xs font-light opacity-80">Wednesday</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-black mb-2">
          <div className="flex">
            <button className="bg-gray-200  rounded-full w-6">{"<"}</button>
            <p className="font-medium mx-5">May 2025</p>
            <button className="bg-gray-200 rounded-full w-6">{">"}</button>
          </div>

          <div className="text-black font-semibold">Today</div>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-emerald-500">
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mt-2 text-gray-700">
          {dates.flat().map((date, idx) => {
            const isSelected = date === 25;
            const isRange = [10, 11, 12, 13, 14, 15].includes(date);

            return (
              <div
                key={idx}
                className={`h-10 flex items-center justify-center rounded-full
                ${
                  isSelected ? "bg-white ring-2 ring-emerald-500 font-bold" : ""
                }
                ${isRange ? "bg-emerald-50 text-emerald-500" : ""}
                ${!date ? "text-transparent" : ""}
              `}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalenderSection;
