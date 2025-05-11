import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCakeCandles,
  faMoneyBillWave,
  faBell,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

function Schedule() {
  // Form state
  const [reminderType, setReminderType] = useState("birthday");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [notifyBySMS, setNotifyBySMS] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      reminderType,
      title,
      date,
      message,
      notifyByEmail,
      notifyBySMS,
    });
    // Add your API call or state management here
  };

  return (
    <div className="h-screen bg-gray-100 p-4 pt-0">
      <div className="pt-10 ps-12">
        <div className="text-4xl font-bold">Schedule New Reminder!!</div>
        <div className="text-md text-gray-600">
          Set reminders for birthdays, loans, or custom events
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-3 p-4 rounded-xl  bg-white shadow-sm">
        
        <div className="">
          <label className="block text-gray-700 mb-2">Reminder Type</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1 ${
                reminderType === "birthday"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setReminderType("birthday")}
            >
              <FontAwesomeIcon icon={faCakeCandles} />
              Birthday
            </button>
            <button
              type="button"
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1 ${
                reminderType === "loan"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setReminderType("loan")}
            >
              <FontAwesomeIcon icon={faMoneyBillWave} />
              Loan
            </button>
            <button
              type="button"
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1 ${
                reminderType === "custom"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setReminderType("custom")}
            >
              <FontAwesomeIcon icon={faBell} />
              Custom
            </button>
          </div>
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder={
              reminderType === "birthday" ? "Person's name" : "Reminder title"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            rows="3"
            placeholder={
              reminderType === "birthday"
                ? "Happy birthday! 🎉"
                : reminderType === "loan"
                ? "Loan payment due: $"
                : "Custom reminder message"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Notify Me Via</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-emerald-500 focus:ring-emerald-500"
                checked={notifyByEmail}
                onChange={() => setNotifyByEmail(!notifyByEmail)}
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-emerald-500 focus:ring-emerald-500"
                checked={notifyBySMS}
                onChange={() => setNotifyBySMS(!notifyBySMS)}
              />
              <span className="ml-2 text-gray-700">SMS</span>
            </label>
          </div>
        </div>

        
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          <FontAwesomeIcon icon={faBell} className="mr-2" />
          Set Reminder
        </button>
      </form>
    </div>
  );
}

export default Schedule;
