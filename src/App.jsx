import React from "react";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./components/MainDashboard";
import Login from "./auth/Login";
import Home from "./containers/Home";
import MyProfile from "./containers/MyProfile";
import Schedule from "./containers/Schedule";
import History from "./containers/History";
import Settings from "./containers/Settings";
import Help from "./containers/Help";
import LandingPage from "./landingPage/LandingPage";
import Register from "./auth/Register";
import RouteProtection from "./route-protection/RouteProtection";

function App() {
  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/main"
          element={
            <RouteProtection>
              <MainDashboard />
            </RouteProtection>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
