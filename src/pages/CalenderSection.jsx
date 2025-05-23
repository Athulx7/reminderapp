import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBell,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";
import { useNavigate } from "react-router-dom";
import { getHomeReminderApi } from "../Services/ApiCall";
import { addNewReminderResponceContext } from "../contextShare/ContextShare";

function CalendarSection({ onClose }) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [reminderData, setReminderData] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const { addNewReminderRepsonce, setAddnewReminderResponce } = useContext(
    addNewReminderResponceContext
  );

  const fetchReminders = async () => {
    try {
      setIsLoading(true);
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getHomeReminderApi(header);
      if (result.status === 201) {
        setReminders(result.data);
      }
    } catch (err) {
      console.error("Error fetching reminders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [addNewReminderRepsonce]);

  // Convert the reminders array to an object with dates as keys for easier lookup
  const getRemindersByDate = () => {
    const remindersByDate = {};
    reminders.forEach((reminder) => {
      remindersByDate[reminder.date] = {
        title: reminder.title,
        description: reminder.description,
        reminderType: reminder.reminderType,
      };
    });
    return remindersByDate;
  };

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const daysFromNextMonth = totalCells - (daysInMonth + firstDay);

    const calendar = [];
    let row = [];

    for (let i = 0; i < firstDay; i++) {
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

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const monthYearFormat = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const hasReminder = (day) => {
    if (!day) return false;
    const dateKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return getRemindersByDate()[dateKey];
  };

  const isPastDate = (day) => {
    if (!day) return false;
    const today = new Date();
    const compareDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return (
      compareDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  const handleDateClick = (day) => {
    if (!day) return;

    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setSelectedDate(clickedDate);

    const dateKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const reminder = getRemindersByDate()[dateKey];

    if (reminder) {
      setReminderData(reminder);
      setShowReminderModal(true);
    } else if (clickedDate <= today) {
      setShowErrorModal(true);
    } else {
      setShowAddReminderModal(true);
    }
  };

  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();
  const todayDate = today.getDate();

  return (
    <div className="p-2 sm:p-4 md:p-6 w-full max-w-md mx-auto min-h-screen bg-gray-100 relative">
      <div className="absolute top-1 md:hidden">
        <button
          onClick={onClose}
          className="p-2 rounded-full transition-colors"
          aria-label="Close calendar"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-lg hover:text-red-600 text-gray-700"
          />
        </button>
      </div>

      {/* Calendar container */}
      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mt-8 sm:mt-20 ">
        <div className="flex justify-center mb-6 sm:mb-10 md:mb-12">
          <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 text-white py-2 px-3 sm:py-3 sm:px-4 rounded-lg sm:rounded-xl text-center shadow-md w-16 sm:w-20 md:w-24">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              {currentDate.toLocaleString("default", { month: "short" })}
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              {selectedDate ? selectedDate.getDate() : todayDate}
            </p>
            <p className="text-[10px] sm:text-xs font-light opacity-80">
              {selectedDate
                ? selectedDate.toLocaleString("default", { weekday: "long" })
                : today.toLocaleString("default", { weekday: "long" })}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={prevMonth}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>
            <p className="font-medium text-sm sm:text-base whitespace-nowrap">
              {monthYearFormat}
            </p>
            <button
              onClick={nextMonth}
              className="bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full w-6 h-6 flex items-center justify-center text-xs sm:text-sm transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>

          <button
            onClick={goToToday}
            className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-emerald-600 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarData.flat().map((date, idx) => {
            const hasRem = hasReminder(date);
            const isPast = isPastDate(date);
            const isToday = isCurrentMonth && date === todayDate;
            const isSelected =
              selectedDate &&
              currentDate.getMonth() === selectedDate.getMonth() &&
              date === selectedDate.getDate();

            return (
              <button
                key={idx}
                onClick={() => handleDateClick(date)}
                className={` h-6 sm:h-8 md:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm relative cursor-pointer
                      ${isSelected ? "bg-emerald-500 text-white font-bold" : ""}
                      ${
                        hasRem && !isSelected
                          ? isPast
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                          : ""
                      }
                      ${
                        isToday && !isSelected
                          ? "ring-2 ring-emerald-500"
                          : isPast && !hasRem
                          ? "text-gray-400"
                          : ""
                      }
                      ${
                        isPast && hasRem && !isSelected
                          ? "ring-1 ring-amber-500"
                          : ""
                      }
                      ${
                        !date ? "invisible" : "hover:bg-gray-100"
                      } transition-colors`}
                disabled={!date}
              >
                {date}
                {hasRem && (
                  <span
                    className={`absolute bottom-0 w-1 h-1 rounded-full ${
                      isPast ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* modals */}
      {/* Reminder Detail Modal */}
      <ReminderCommonModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        title={reminderData?.title || "Reminder"}
        type="info"
        primaryButtonText={
          selectedDate &&
          selectedDate >= new Date(new Date().setHours(0, 0, 0, 0))
            ? "Set New Reminder"
            : null
        }
        onPrimaryButtonClick={() => {
          navigate("/main/schedule", {
            state: { selectedDate: selectedDate.toLocaleDateString("en-CA") },
          });
          setShowReminderModal(false);
        }}
        secondaryButtonText="Close"
        onSecondaryButtonClick={() => setShowReminderModal(false)}
      >
        <div className="space-y-2">
          <p>{reminderData?.description}</p>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-3">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            <span className="text-center">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {selectedDate &&
            selectedDate < new Date(new Date().setHours(0, 0, 0, 0)) && (
              <p className="text-sm text-gray-500 mt-2">
                (Past date - cannot add new reminders)
              </p>
            )}
        </div>
      </ReminderCommonModal>

      {/* Add Reminder Modal */}
      <ReminderCommonModal
        isOpen={showAddReminderModal}
        onClose={() => setShowAddReminderModal(false)}
        title="Add Reminder"
        primaryButtonText="Schedule"
        onPrimaryButtonClick={() => {
          navigate("/main/schedule", {
            state: {
              selectedDate: selectedDate.toLocaleDateString("en-CA"),
            },
          });
          setShowAddReminderModal(false);
        }}
        secondaryButtonText="Cancel"
        onSecondaryButtonClick={() => setShowAddReminderModal(false)}
      >
        <p className="mb-4">
          Do you want to add a reminder for{" "}
          <span className="font-semibold">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
          ?
        </p>
      </ReminderCommonModal>

      {/* Error Modal for Past Dates */}
      <ReminderCommonModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Cannot Set Reminder"
        type="error"
        primaryButtonText="OK"
        onPrimaryButtonClick={() => setShowErrorModal(false)}
      >
        <p>You can't set reminders for past dates.</p>
      </ReminderCommonModal>
    </div>
  );
}

export default CalendarSection;
