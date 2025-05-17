import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faEllipsisVertical,
  faCalendarDay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import clockImage from "../../../src/assets/clock.png";
import "./HomeDateResult.css";
import { useNavigate } from "react-router-dom";

function HomeDateResult() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);

  const dummyReminders = {
    "2025-5-17": [
      {
        id: 1,
        title: "Design Study",
        description:
          "Collaborate, manage projects, and reach new product peaks.",
        type: "work",
        time: "10:00 AM",
      },
    ],
    "2025-5-20": [
      {
        id: 2,
        title: "Team Meeting",
        description: "Weekly sync with the design team",
        type: "meeting",
        time: "2:30 PM",
      },
      {
        id: 3,
        title: "Dentist Appointment",
        description: "Regular dental checkup",
        type: "personal",
        time: "4:00 PM",
      },
      {
        id: 5,
        title: "Dentist Appointment",
        description: "Regular dental checkup",
        type: "personal",
        time: "4:00 PM",
      },
    ],
    "2025-5-22": [
      {
        id: 4,
        title: "Project Deadline",
        description: "Submit final project deliverables",
        type: "work",
        time: "11:59 PM",
      },
    ],
  };

  // Generate week days based on current date
  useEffect(() => {
    const generateWeekDays = () => {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        days.push({
          date: day.getDate(),
          day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day.getDay()],
          fullDate: day,
          isToday: day.toDateString() === new Date().toDateString(),
          isPast:
            day < new Date() &&
            !(day.toDateString() === new Date().toDateString()),
        });
      }
      setWeekDays(days);
    };

    generateWeekDays();
  }, [currentDate]);

  const hasReminders = (date) => {
    const dateKey = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    return dummyReminders[dateKey] || [];
  };

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (day) => {
    setSelectedDate(day.fullDate);
  };

  const formatDateDisplay = (date) => {
    const options = {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleAddReminder = () => {
    navigate("/main/schedule", {
      state: {
        selectedDate: selectedDate.toISOString(),
        isNewReminder: true,
      },
    });
  };

  const selectedDateReminders = hasReminders(selectedDate);
  const isPastDate =
    selectedDate < new Date() &&
    !(selectedDate.toDateString() === new Date().toDateString());

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl w-full">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-y-2">
        <div className="font-semibold text-base sm:text-lg">
          {formatDateDisplay(selectedDate)}
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={goToToday}
            className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center"
          >
            <FontAwesomeIcon icon={faCalendarDay} className="mr-1" />
            Today
          </button>
          <div className="flex space-x-2">
            <button
              onClick={prevWeek}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={nextWeek}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-between gap-2 sm:gap-4 max-w-full sm:max-w-xl mx-auto mb-4">
        {weekDays.map((day) => {
          const isSelected =
            selectedDate.toDateString() === day.fullDate.toDateString();
          const reminders = hasReminders(day.fullDate);

          return (
            <button
              key={`${day.date}-${day.day}`}
              onClick={() => handleDateClick(day)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl w-14 sm:w-12 text-sm font-semibold relative transition-colors ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-200 to-emerald-500 text-white shadow-md"
                  : day.isToday
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : day.isPast
                  ? "bg-gray-100 text-gray-500"
                  : "bg-gray-100 text-emerald-600 hover:bg-gray-200"
              }`}
            >
              <span>{day.day}</span>
              <span>{day.date}</span>
              {reminders.length > 0 && (
                <span
                  className={`absolute -bottom-1 w-2 h-2 rounded-full ${
                    isSelected ? "bg-white" : "bg-emerald-500"
                  }`}
                ></span>
              )}
            </button>
          );
        })}
      </div>
      {selectedDateReminders.length >= 3 && (
        <div className="text-sm  text-gray-400 text-center ">
          Scroll down to see more
        </div>
      )}

      <div className="text-sm mb-1 text-gray-400 text-center">
        {selectedDateReminders.length > 0
          ? `${selectedDateReminders.length} reminder${
              selectedDateReminders.length > 1 ? "s" : ""
            }`
          : isPastDate
          ? "Past date - no reminders can be added"
          : "No reminders for this date"}
      </div>

      <div className="max-h-[300px] overflow-y-auto hide-scrollbar space-y-4">
        {selectedDateReminders.length > 0 ? (
          selectedDateReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col sm:flex-row bg-gradient-to-r from-white to-gray-50 p-4 rounded-2xl shadow-sm gap-4 items-start border border-gray-100"
            >
              <div className="shrink-0">
                <img
                  src={clockImage}
                  alt="clock"
                  className="w-16 sm:w-[100px]"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h3 className="font-semibold text-gray-800 text-base">
                    {reminder.title}
                  </h3>
                  <div className="">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        reminder.type === "work"
                          ? "bg-blue-100 text-blue-800"
                          : reminder.type === "meeting"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {reminder.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  {reminder.description}
                </p>
              </div>
              <button className="md:mt-10 sm:mt-0 text-gray-400 md:block hidden text-2xl hover:text-gray-600">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <FontAwesomeIcon icon={faClock} className="text-4xl mb-2" />
            <p>
              {isPastDate ? "This date has passed" : "No reminders scheduled"}
            </p>
            {!isPastDate && (
              <button
                onClick={handleAddReminder}
                className="mt-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm flex items-center mx-auto"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Reminder
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeDateResult;
