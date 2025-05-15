import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import clockImage from "../../../src/assets/clock.png";
import "./HomeDateResult.css";

function HomeDateResult() {
  const days = [
    { day: "Sun", date: 11 },
    { day: "Mon", date: 12 },
    { day: "Tue", date: 13 },
    { day: "Wed", date: 14 },
    { day: "Thu", date: 15 },
    { day: "Fri", date: 16 },
    { day: "Sat", date: 17 },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl w-full">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-y-2">
        <div className="font-semibold text-base sm:text-lg">
          August, 25 Tuesday
        </div>
        <div className="flex space-x-4">
          <button>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-4 max-w-full sm:max-w-xl mx-auto mb-4">
        {days.map((item) => (
          <div
            key={item.date}
            className={`flex flex-col items-center px-3 py-2 rounded-xl w-14 sm:w-12 text-sm font-semibold ${
              item.date === 11
                ? "bg-gradient-to-r from-emerald-200 to-emerald-500 text-white"
                : "bg-gray-100 text-emerald-600"
            }`}
          >
            <span>{item.day}</span>
            <span>{item.date}</span>
          </div>
        ))}
      </div>

      <div className="text-sm mt-3 mb-2 text-gray-400 text-center">
        Scroll down to see more
      </div>

      <div className="max-h-[300px] overflow-y-auto hide-scrollbar space-y-4">
        <div className="flex flex-col sm:flex-row bg-gradient-to-r from-white to-gray-100 p-4 rounded-2xl shadow-sm gap-4 items-start">
          <div className="shrink-0">
            <img src={clockImage} alt="clock" className="w-16 sm:w-[100px]" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h3 className="font-semibold text-gray-800 text-base">
                Design Study
              </h3>
              <span className="text-sm text-emerald-500">Loan Date</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 leading-snug">
              Collaborate, manage projects, and reach new product peaks. Study
              about Design and get knowledge.
            </p>
          </div>

          <div className="mt-2 sm:mt-10 text-gray-400 hidden sm:block">
            <FontAwesomeIcon className="text-2xl" icon={faEllipsisVertical} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDateResult;
