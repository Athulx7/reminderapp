import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faMobileScreen,
  faLock,
  faSignOutAlt,
  faUserCog,
  faShieldAlt,
  faCircleArrowLeft,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

function Settings() {
  // Settings state
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // const [darkMode, setDarkMode] = useState(false);
  // const [accentColor, setAccentColor] = useState("emerald");

  const handleLogout = () => {
    // Add logout logic here
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 md:ps-6 pt-4 text-center md:text-start">
      <div className="mb-8">
        <div className=" gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Account Settings
          </h1>
        </div>
        <p className="text-gray-600">
          Manage your notification preferences and security settings
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <FontAwesomeIcon icon={faBell} className="text-emerald-500" />
            Notification Preferences
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                <span>Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationPrefs.email}
                  onChange={() =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      email: !notificationPrefs.email,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faMobileScreen}
                  className="text-gray-500"
                />
                <span>SMS Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationPrefs.sms}
                  onChange={() =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      sms: !notificationPrefs.sms,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <FontAwesomeIcon icon={faPalette} className="text-emerald-500" />
            Appearance
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMoon} className="text-gray-500" />
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <div className="flex gap-2">
                {["emerald", "blue", "purple", "amber"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-8 h-8 rounded-full ${
                      color === "emerald" ? "bg-emerald-500" : ""
                    }${color === "blue" ? "bg-blue-500" : ""}${
                      color === "purple" ? "bg-purple-500" : ""
                    }${color === "amber" ? "bg-amber-500" : ""} ${
                      accentColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500" />
            Account Security
          </h2>

          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 text-emerald-600 hover:bg-emerald-50 rounded-lg">
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
