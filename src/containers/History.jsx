import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faCakeCandles,
  faMoneyBillWave,
  faCheckCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { getHomeReminderApi } from "../Services/ApiCall";
import LoadingComponent from "../basicCompoents/LoadingComponent";

function History() {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const getStatus = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reminderDate = new Date(dateString);
    reminderDate.setHours(0, 0, 0, 0);

    return reminderDate <= today ? "completed" : "upcoming";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchReminders = async () => {
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getHomeReminderApi(header);
      console.log(result);

      const formattedReminders = result.data.map((item) => ({
        id: item._id,
        type: item.reminderType,
        title: item.title,
        date: item.date,
        status: getStatus(item.date),
        message: item.description,
        notifiedVia: [
          ...(item.notifyByEmail ? ["email"] : []),
          ...(item.notifyBySMS ? ["sms"] : []),
        ],
      }));

      setReminders(formattedReminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const filteredReminders = reminders.filter((reminder) => {
    const matchesFilter = filter === "all" || reminder.type === filter;
    const matchesSearch =
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reminder.message &&
        reminder.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 text-center md:text-start">
      <div className="mb-6 md:mb-3">
        <div className="gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Reminder History
          </h1>
        </div>
        <p className="text-gray-600">Review past reminders and their status</p>
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
          {["all", "birthday", "loan", "custom"].map((filterType) => (
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
              {filterType === "custom" && <FontAwesomeIcon icon={faHistory} />}
              {filterType === "all"
                ? "All"
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 overflow-y-auto">
        {filteredReminders.length > 0 ? (
          <>
            <div className="text-sm text-gray-500 mb-1 text-center">
              Showing {filteredReminders.length} reminder(s)
              {filteredReminders.length > 4 && <p>Scroll down to see more</p>}
            </div>
            <div className="space-y-3 h-[430px] overflow-y-auto hide-scrollbar">
              {filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    reminder.status === "completed"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-amber-500 bg-amber-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {reminder.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {reminder.message}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <FontAwesomeIcon
                          icon={
                            reminder.type === "birthday"
                              ? faCakeCandles
                              : reminder.type === "loan"
                              ? faMoneyBillWave
                              : faHistory
                          }
                          className="mr-2"
                        />
                        <span>{formatDate(reminder.date)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          reminder.status === "completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {reminder.status}
                      </span>
                      <div className="mt-2 flex gap-1">
                        {reminder.notifiedVia?.includes("email") && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Email
                          </span>
                        )}
                        {reminder.notifiedVia?.includes("sms") && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            SMS
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            {reminders.length === 0
              ? "You don't have any reminders yet"
              : "No reminders found matching your criteria"}
          </div>
        )}
      </div>
    </div>
      {loading && <LoadingComponent />}
    </>
  );
}

export default History;
