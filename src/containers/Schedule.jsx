import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCakeCandles,
  faMoneyBillWave,
  faBell,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { addReminderApi } from "../Services/ApiCall";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";
import { addNewReminderResponceContext } from "../contextShare/ContextShare";

function Schedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedUserData = JSON.parse(sessionStorage.getItem("logeduser")) || {};
  const token = sessionStorage.getItem("token");

  // Form state
  const [reminderType, setReminderType] = useState("birthday");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [notifyByEmail, setNotifyByEmail] = useState(
    loggedUserData.notificationPreferences?.email || true
  );
  const [notifyBySMS, setNotifyBySMS] = useState(
    loggedUserData.notificationPreferences?.mob || false
  );

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    title: false,
    date: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    type: "success",
    message: "",
    secondaryButtonText: "Close",
  });

  const {addNewReminderRepsonce, setAddnewReminderResponce} = useContext(addNewReminderResponceContext)

  useEffect(() => {
    if (location.state?.selectedDate) {
      setDate(location.state.selectedDate);
      setTouched((prev) => ({ ...prev, date: true }));
    }
  }, [location.state]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title is required";
        } else if (value.length > 50) {
          error = "Title must be less than 50 characters";
        }
        break;
      case "date":
        if (!value) {
          error = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate <= today) {
            error = "Cannot set reminders for today or past dates";
          }
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.length > 50) {
          error = "Message must be less than 50 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") setTitle(value);
    if (name === "date") setDate(value);
    if (name === "message") setMessage(value);

    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: validateField("title", title),
      date: validateField("date", date),
      message: validateField("message", message),
    };

    setErrors(newErrors);
    setTouched({
      title: true,
      date: true,
      message: true,
    });

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const reminderData = {
          reminderType,
          title,
          date,
          message,
          notifyByEmail,
          notifyBySMS,
          loggedUserData,
        };

        const result = await addReminderApi(reminderData, reqHeader);
        if (result.status === 201) {
          setModalData({
            title: "Success!",
            type: "success",
            message: "Reminder has been successfully set.",
            secondaryButtonText: "Close",
          });
          setShowModal(true);
          // context 
          setAddnewReminderResponce(result) 
          
          setTitle("");
          setMessage("");
          setDate("");
          setReminderType("birthday");
          setTouched({
            title: false,
            date: false,
            message: false,
          });
          setIsSubmitting(false);

        } else if (result.status === 400) {
          setModalData({
            title: "Conflict",
            type: "info",
            message: result.response.data.message,
            secondaryButtonText: "Close",
          });
          setShowModal(true);
          setTitle("");
          setMessage("");
          setDate("");
          setReminderType("birthday");
          setTouched({
            title: false,
            date: false,
            message: false,
          });
          setIsSubmitting(false)

        } else {
          showModal(
            "Login Failed",
            "Something went wrong. Please try again later.",
            "error"
          );
          setShowModal(true);
          setIsSubmitting(false);
        }

      } catch (err) {
        showModal(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection.",
          "error"
        );
        setShowModal(true);
        setIsSubmitting(false);
      }
    }
  };

  const shouldShowError = (field) => touched[field] && errors[field];

  return (
    <div className="h-screen bg-gray-100 p-4 pt-0 text-center md:text-start">
      <div className="md:pt-10 md:ps-12">
        <div className="text-2xl md:text-3xl font-bold">
          Schedule New Reminder!!
        </div>
        <div className="text-md text-gray-600">
          Set reminders for birthdays, loans, or custom events
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-2 p-4 rounded-xl bg-white shadow-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Reminder Type</label>
          <div className="grid grid-cols-3 gap-2">
            {["birthday", "loan", "custom"].map((type) => (
              <button
                key={type}
                type="button"
                className={`py-1 px-3 rounded-lg flex items-center justify-center gap-1 ${
                  reminderType === type
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setReminderType(type)}
              >
                <FontAwesomeIcon
                  icon={
                    type === "birthday"
                      ? faCakeCandles
                      : type === "loan"
                      ? faMoneyBillWave
                      : faBell
                  }
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              shouldShowError("title") ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={
              reminderType === "birthday" ? "Person's name" : "Reminder title"
            }
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {shouldShowError("title") && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.title}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              shouldShowError("date") ? "border-red-500" : "border-gray-300"
            }`}
            value={date}
            onChange={handleChange}
            onBlur={handleBlur}
            min={minDate}
          />
          {shouldShowError("date") && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.date}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              shouldShowError("message") ? "border-red-500" : "border-gray-300"
            }`}
            rows="3"
            placeholder={
              reminderType === "birthday"
                ? "Happy birthday! 🎉"
                : reminderType === "loan"
                ? "Loan payment due: $"
                : "Custom reminder message"
            }
            value={message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {shouldShowError("message") && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.message}
            </p>
          )}
          <p className="text-xs text-gray-500 text-right mt-1">
            {message.length}/50 characters
          </p>
        </div>

        <div className="mb-2">
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
          disabled={isSubmitting}
          className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Set Reminder
            </>
          )}
        </button>
      </form>

      {/* Reminder Modal */}
      <ReminderCommonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalData.title}
        type={modalData.type}
        primaryButtonText={modalData.primaryButtonText}
        onPrimaryButtonClick={() => {
          setShowModal(false);
          if (modalData.type === "success") {
            document.querySelector("input[name='title']")?.focus();
          }
        }}
        secondaryButtonText={modalData.secondaryButtonText}
        onSecondaryButtonClick={() => setShowModal(false)}
      >
        <div className="space-y-2">
          <p>{modalData.message}</p>
          {date && (
            <div className="flex items-center justify-center text-sm text-gray-500 mt-3">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              <span className="text-center">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </ReminderCommonModal>
    </div>
  );
}

export default Schedule;
