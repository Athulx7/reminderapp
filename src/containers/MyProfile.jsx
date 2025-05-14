import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faGear,
  faPhone,
  faCalendarAlt,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function MyProfile() {
  
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "Joined March 2023",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s",
  };

  return (
    <div className="h-screen bg-gray-100 p-4 pt-0 text-center md:text-start">
      <div className="md:pt-15 md:ps-12">
        <div className="text-2xl md:text-3xl font-bold">My Profile!!</div>
        <div className="text-md text-gray-600">
          Manage your personal information and preferences
        </div>
      </div>
      <div className=" p-10 mt-10 bg-white  ms-4 rounded-xl  shadow-sm">
        <div className="flex flex-col items-center py-4 border-b">
          <img
            className="w-20 h-20 rounded-full border-2 border-emerald-500 mb-3"
            src={user.avatar}
            alt={user.name}
          />
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="py-4 space-y-3 border-b">
          <div className="flex items-center text-gray-700">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-4 mr-3 text-emerald-500"
            />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FontAwesomeIcon
              icon={faPhone}
              className="w-4 mr-3 text-emerald-500"
            />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="w-4 mr-3 text-emerald-500"
            />
            <span>{user.joinDate}</span>
          </div>
        </div>

        <div className="py-3 space-y-2">
          <button className="w-full flex items-center py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faGear} className="w-4 mr-3 text-gray-500" />
            <span>Account Settings</span>
          </button>
          <button className="w-full flex items-center py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg">
            <FontAwesomeIcon icon={faCircleArrowLeft} className="w-4 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
