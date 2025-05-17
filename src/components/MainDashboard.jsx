import React, { useState } from "react";
import SideHeader from "../pages/SideHeader";
import CalenderSection from "../pages/CalenderSection";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function MainDashboard() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

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
    </>
  );
}

export default MainDashboard;
