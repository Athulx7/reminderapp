import React, { useEffect, useState } from "react";
import SideHeader from "../pages/SideHeader";
import CalenderSection from "../pages/CalenderSection";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { getSpeceficDateReminderApi } from "../Services/ApiCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainDashboard() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const token = sessionStorage.getItem('token');
  const [dateReminder, setDateReminder] = useState([]);
  
  const apiCall = async () => {
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getSpeceficDateReminderApi(header);
      
      if (result.status === 201) {
        setDateReminder(result.data);
        
        const uniqueReminders = result.data.filter(
          (reminder, index, self) =>
            index === self.findIndex((r) => r._id === reminder._id)
        );

        uniqueReminders.forEach((reminder) => {
          showReminderToast(reminder);
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reminders");
    }
  };

  const showReminderToast = (reminder) => {
    switch(reminder.reminderType) {
      case 'birthday':
        toast.info(
          `🎉 Today is ${reminder.title}'s birthday! 🎂\nDon't forget to wish them!`,
          { 
            autoClose: 6000,
            position: "top-right",
            className: 'birthday-toast'
          }
        );
        break;
        
      case 'loan':
        toast.warning(
          `⚠️ Loan Payment Due: ${reminder.title}\nPlease make the payment today!`,
          { 
            autoClose: 6000,
            position: "top-right"
          }
        );
        break;
        
      default:
        toast.info(
          `🔔 Reminder: ${reminder.title}\n${reminder.description}`,
          { 
            autoClose: 4000,
            position: "top-right"
          }
        );
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 h-screen relative">
        <div
          className={`${
            showLeft ? "block fixed z-40 bg-white h-full w-64 shadow-lg p-4" : "hidden"
          } md:block md:col-span-2`}
        >
          <SideHeader onClose={() => setShowLeft(false)} />
        </div>

        <div className="col-span-12 md:col-span-7 relative overflow-y-auto md:overflow-y-hidden">
          <div className="flex justify-between items-center p-3 md:hidden">
            <button
              onClick={() => setShowLeft((prev) => !prev)}
              className="p-2 rounded-md bg-emerald-500 text-white shadow hover:bg-emerald-600"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <button
              onClick={() => setShowRight((prev) => !prev)}
              className="p-2 rounded-md bg-emerald-500 text-white shadow hover:bg-emerald-600"
            >
              <FontAwesomeIcon icon={faCalendarDays} />
            </button>
          </div>

          <Outlet />
        </div>

        <div
          className={`${
            showRight ? "block fixed z-40 bg-white h-full w-64 shadow-lg right-0 p-4" : "hidden"
          } md:block md:col-span-3`}
        >
          <CalenderSection onClose={() => setShowRight(false)}/>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default MainDashboard;