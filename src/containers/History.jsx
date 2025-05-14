import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faCakeCandles,
  faMoneyBillWave,
  faCheckCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function History() {
  const [reminders] = useState([
    {
      id: 1,
      type: "birthday",
      title: "Emma's Birthday",
      date: "2024-05-10",
      status: "completed",
      message: "Called and wished happy birthday! 🎂",
      notifiedVia: ["email"],
    },
    {
      id: 2,
      type: "loan",
      title: "Car Loan Payment",
      date: "2024-05-05",
      status: "completed",
      amount: "$350",
      notifiedVia: ["sms", "email"],
    },
    {
      id: 3,
      type: "custom",
      title: "Dentist Appointment",
      date: "2024-04-28",
      status: "missed",
      message: "Rescheduled to May 15",
      notifiedVia: ["email"],
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReminders = reminders.filter((reminder) => {
    const matchesFilter = filter === "all" || reminder.type === filter;
    const matchesSearch =
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.message?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-16 text-center md:text-start">
      <div className="mb-6 md:mb-8">
        <div className=" gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Reminder History!!
          </h1>
        </div>
        <p className="text-gray-600">
          Review past reminders and their status
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by title or message..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto pb-2 gap-2 md:gap-3">
          {["all", "birthday", "loan", "completed"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-full whitespace-nowrap flex items-center gap-1 ${
                filter === filterType
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterType === "birthday" && (
                <FontAwesomeIcon icon={faCakeCandles} />
              )}
              {filterType === "loan" && (
                <FontAwesomeIcon icon={faMoneyBillWave} />
              )}
              {filterType === "completed" && (
                <FontAwesomeIcon icon={faCheckCircle} />
              )}
              {filterType === "all"
                ? "All"
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm mt-5 mb-2 text-gray-400 text-center ">
        Scroll down to see more
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 overflow-y-auto hide-scrollbar">
        {filteredReminders.length > 0 ? (
          <>
            <div className="text-sm text-gray-500 mb-3 text-center">
              Showing {filteredReminders.length} reminder(s)
            </div>
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    reminder.status === "completed"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-amber-500 bg-amber-50"
                  }`}
                ></div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No reminders found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
