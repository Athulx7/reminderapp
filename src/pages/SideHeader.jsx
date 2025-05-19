import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCircleQuestion,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDay,
  faCircleArrowLeft,
  faClockRotateLeft,
  faGear,
  faHome,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";

function SideHeader({ onClose }) {
  const navigatedSection = ({ isActive }) =>
    `mt-5 ms-12 flex items-center h-10 cursor-pointer ${
      isActive
        ? "border-r-5 border-emerald-500 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-emerald-200 text-black font-semibold"
        : ""
    } hover:bg-gradient-to-r hover:from-gray-200 hover:via-gray-300`;

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default",
    onConfirm: null,
  });
  const showModal = (title, message, type, onConfirm = null) => {
    setModalState({
      isOpen: true,
      title,
      message,
      type,
      onConfirm:
        onConfirm ||
        (() => setModalState((prev) => ({ ...prev, isOpen: false }))),
    });
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
  showModal(
    "Logged Out",
    "You have been successfully logged out.",
    "info",
    () => {
      sessionStorage.clear(); 
      navigate("/");          g
    }
  );
};

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-gray-200 h-screen relative">
      <div className="absolute top-1 bottom-3 right-1 md:hidden block">
        <button onClick={onClose}>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-xl hover:text-red-600 text-gray-700"
          />
        </button>
      </div>

      <Link to={"/main"} className="p-3 flex items-center justify-center gap-2">
        <FontAwesomeIcon
          icon={faBell}
          className="text-2xl text-emerald-500 animate-pulse"
        />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          ReminderApp
        </h2>
      </Link>

      <div className="mt-21 text flex-col">
        <NavLink
          to="/main"
          end
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faHome} />
          <span className="ms-2">Home</span>
        </NavLink>

        <NavLink
          to="/main/profile"
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="ms-2">My profile</span>
        </NavLink>

        <NavLink
          to="/main/schedule"
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faCalendarDay} />
          <span className="ms-2">Schedule</span>
        </NavLink>

        <NavLink
          to="/main/history"
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <span className="ms-2">History</span>
        </NavLink>
      </div>

      <div className="mt-28 pb-24 text">
        <NavLink
          to="/main/settings"
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faGear} />
          <span className="ms-2">Settings</span>
        </NavLink>

        <NavLink
          to="/main/help"
          className={navigatedSection}
          onClick={handleNavClick}
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
          <span className="ms-2">Help?</span>
        </NavLink>

        <div
          onClick={handleLogOut}
          className="mt-5 ms-12 flex items-center cursor-pointer h-10 hover:bg-gradient-to-r hover:from-gray-200 hover:via-gray-300 hover:to-red-400"
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} />
          <span className="ms-2">Log out</span>
        </div>
      </div>

      {/* modal open  */}
      <ReminderCommonModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        type={modalState.type}
        primaryButtonText="OK"
        onPrimaryButtonClick={modalState.onConfirm}
      >
        <p>{modalState.message}</p>
      </ReminderCommonModal>
    </div>
  );
}

export default SideHeader;
