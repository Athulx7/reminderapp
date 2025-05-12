import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faCalendarAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-50 p-6">
      <header className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faBell}
            className="text-2xl text-emerald-500 animate-pulse"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ReminderApp
          </h2>
        </div>

        <div className="flex gap-3">
          <NavLink
            to={"/login"}
            className="px-4 py-2 rounded-full bg-white border border-emerald-100 text-emerald-600 text-sm hover:bg-emerald-50 transition-colors"
          >
            Log in
          </NavLink>
          <NavLink
            to={"/register"}
            className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition-colors shadow-md"
          >
            Sign up
          </NavLink>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row items-center justify-between gap-12 mx-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Never miss important dates{" "}
            <span className="text-emerald-500">again</span>
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            ReminderApp helps you remember birthdays, anniversaries, and special
            events with timely notifications via email, SMS, or push alerts.
          </p>
          <div className="flex flex-col sm:flex-row ms-44 mb-10">
            <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <img
                  key={item}
                  src={`https://randomuser.me/api/portraits/${
                    item % 2 === 0 ? "women" : "men"
                  }/${item + 20}.jpg`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="User"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-medium">Trusted by 10,000+ users</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform ">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                How it works
              </h3>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-emerald-500 text-2xl"
              />
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

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-emerald-500 mt-1"
                />
                <div>
                  <h4 className="font-medium text-gray-800">
                    Mark Important Dates
                  </h4>
                  <p className="text-sm text-gray-600">
                    Highlight birthdays, anniversaries, and more
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-emerald-500 mt-1"
                />
                <div>
                  <h4 className="font-medium text-gray-800">Get Reminders</h4>
                  <p className="text-sm text-gray-600">
                    Receive notifications via email or SMS
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-emerald-500 mt-1"
                />
                <div>
                  <h4 className="font-medium text-gray-800">Never Forget</h4>
                  <p className="text-sm text-gray-600">
                    Customize reminder timing and frequency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
