import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faCalendarAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function LandingPage() {

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysFromPrevMonth = firstDay;
    const prevMonthDays = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7;
    const daysFromNextMonth = totalCells - (daysInMonth + daysFromPrevMonth);

    const calendar = [];
    let row = [];

    for (let i = 0; i < daysFromPrevMonth; i++) {
      row.push("");
    }

    for (let i = 1; i <= daysInMonth; i++) {
      row.push(i);
      if (row.length === 7) {
        calendar.push([...row]);
        row = [];
      }
    }

    for (let i = 0; i < daysFromNextMonth; i++) {
      row.push("");
    }
    if (row.length > 0) calendar.push([...row]);

    return calendar;
  };

  const calendarData = generateCalendar(currentDate);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthYearFormat = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();
  const todayDate = today.getDate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-50 p-4 sm:p-6">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-4">
        <Link to={"/"} className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faBell}
            className="text-2xl text-emerald-500 animate-pulse"
          />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ReminderApp
          </h2>
        </Link>

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

      <main className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Never miss important dates{" "}
            <span className="text-emerald-500">again</span>
          </h1>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            ReminderApp helps you remember birthdays, anniversaries, and special
            events with timely notifications via email, SMS, or push alerts.
          </p>
          <div className="flex justify-center lg:justify-start mb-10">
            <Link
              to={"/register"}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
            >
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
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
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium">Trusted by 10,000+ users</p>
              <div className="flex justify-center sm:justify-start gap-1">
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

        {/* Calendar Section */}
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                How it works
              </h3>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-emerald-500 text-xl sm:text-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center text-black mb-3">
              <div className="flex items-center mb-2 sm:mb-0">
                <button
                  onClick={prevMonth}
                  className="bg-gray-200 rounded-full w-6 h-6 text-sm cursor-pointer"
                >
                  {"<"}
                </button>
                <p className="font-medium mx-4">{monthYearFormat}</p>
                <button
                  onClick={nextMonth}
                  className="bg-gray-200 rounded-full w-6 h-6 text-sm cursor-pointer"
                >
                  {">"}
                </button>
              </div>
              <div
                onClick={() => {
                  setCurrentDate(new Date());
                }}
                className="text-black font-semibold text-sm cursor-pointer"
              >
                Today
              </div>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-emerald-500">
              {days.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mt-2 text-gray-700 text-sm">
              {calendarData.flat().map((date, idx) => {
                const isSelected = isCurrentMonth && date === todayDate;

                return (
                  <div
                    key={idx}
                    className={`h-10 w-10 flex items-center justify-center rounded-full md:ms-4
                    ${
                      isSelected
                        ? " ring-2 bg-emerald-50 ring-emerald-500 font-bold"
                        : ""
                    }
                  `}
                  >
                    {date}
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 mt-5 text-left">
              {[
                {
                  title: "Mark Important Dates",
                  desc: "Highlight birthdays, anniversaries, and more",
                },
                {
                  title: "Get Reminders",
                  desc: "Receive notifications via email or SMS",
                },
                {
                  title: "Never Forget",
                  desc: "Customize reminder timing and frequency",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-emerald-500 mt-1"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
