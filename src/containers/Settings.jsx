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
import { useNavigate } from "react-router-dom";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";
import {
  changeNotificationPrefeApi,
  resetPasswordApi,
  verifyingThePasswordApi,
} from "../Services/ApiCall";

function Settings() {
  const userData = JSON.parse(sessionStorage.getItem("logeduser"));
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [notificationPrefs, setNotificationPrefs] = useState({
    email: userData.notificationPreferences.email,
    sms: userData.notificationPreferences.mob,
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default",
    onConfirm: null,
  });

  const [passwordModal, setPasswordModal] = useState({
    isOpen: false,
    step: 1,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    loading: false,
  });

  const updateNotificationPrefs = async (type) => {
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const updatedPrefs = {
        ...notificationPrefs,
        [type]: !notificationPrefs[type],
      };

      if (!updatedPrefs.email && !updatedPrefs.sms) {
        showModal(
          "Warning",
          "You must enable at least one notification method",
          "warning"
        );
        return;
      }

      const response = await changeNotificationPrefeApi(
        { email: updatedPrefs.email, mob: updatedPrefs.sms },
        header
      );

      if (response.status === 201) {
        setNotificationPrefs(updatedPrefs);
        const updatedUser = {
          ...userData,
          notificationPreferences: {
            email: updatedPrefs.email,
            mob: updatedPrefs.sms,
          },
        };
        sessionStorage.setItem("logeduser", JSON.stringify(updatedUser));
      } else {
        throw new Error(response.message || "Failed to update preferences");
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      showModal("Error", "Failed to update notification preferences", "error");

      setNotificationPrefs((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordModal((prev) => ({
      ...prev,
      [name]: value,
      error: "",
    }));
  };

  const verifyCurrentPassword = async () => {
    if (!passwordModal.currentPassword) {
      setPasswordModal((prev) => ({
        ...prev,
        error: "Please enter current password",
      }));
      return;
    }

    setPasswordModal((prev) => ({ ...prev, loading: true }));

    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const pass = { pass: passwordModal.currentPassword };
      const response = await verifyingThePasswordApi(pass, header);

      if (response.status === 201) {
        setPasswordModal((prev) => ({
          ...prev,
          step: 2,
          loading: false,
          error: "",
        }));
      } else if (response.status === 401) {
        setPasswordModal((prev) => ({
          ...prev,
          error: "Incorrect current password",
          loading: false,
        }));
      }
    } catch (error) {
      setPasswordModal((prev) => ({
        ...prev,
        error: "Failed to verify password",
        loading: false,
      }));
    }
  };

  const updatePassword = async () => {
    const { newPassword, confirmPassword } = passwordModal;

    if (!newPassword || !confirmPassword) {
      setPasswordModal((prev) => ({
        ...prev,
        error: "Please fill all fields",
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordModal((prev) => ({ ...prev, error: "Passwords don't match" }));
      return;
    }

    if (newPassword.length < 6) {
      setPasswordModal((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters",
      }));
      return;
    }

    setPasswordModal((prev) => ({ ...prev, loading: true }));

    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await resetPasswordApi({ pass: newPassword }, header);
      console.log(response);

      if (response.status === 201) {
        showModal("Success", "Password updated successfully", "success", () => {
          setPasswordModal({
            isOpen: false,
            step: 1,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
            loading: false,
          });
          setModalState((prev) => ({ ...prev, isOpen: false }));
        });
      } else {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      setPasswordModal((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  };

  // Modal helpers
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

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogOut = () => {
    showModal(
      "Logged Out",
      "You have been successfully logged out.",
      "info",
      () => {
        sessionStorage.clear();
        navigate("/");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 md:ps-6 pt-4 text-center md:text-start">
      <div className="mb-8">
        <div className="gap-3 mb-1">
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
                  onChange={() => updateNotificationPrefs("email")}
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
                  onChange={() => updateNotificationPrefs("sms")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800">
            <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-500" />
            Account Security
          </h2>

          <div className="space-y-3">
            <button
              onClick={() =>
                setPasswordModal((prev) => ({ ...prev, isOpen: true }))
              }
              className="w-full cursor-pointer text-left py-2 px-3 text-emerald-600 hover:bg-emerald-50 rounded-lg"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <button
            onClick={handleLogOut}
            className="w-full flex cursor-pointer items-center justify-center gap-2 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            Log Out
          </button>
        </div>
      </div>

      {passwordModal.isOpen && (
        <ReminderCommonModal
          isOpen={passwordModal.isOpen}
          onClose={() =>
            setPasswordModal((prev) => ({ ...prev, isOpen: false }))
          }
          title={
            passwordModal.step === 1
              ? "Verify Current Password"
              : "Set New Password"
          }
          type="default"
          primaryButtonText={
            passwordModal.step === 1 ? "Continue" : "Update Password"
          }
          onPrimaryButtonClick={
            passwordModal.step === 1 ? verifyCurrentPassword : updatePassword
          }
          secondaryButtonText={passwordModal.step === 2 ? "Back" : null}
          onSecondaryButtonClick={
            passwordModal.step === 2
              ? () => setPasswordModal((prev) => ({ ...prev, step: 1 }))
              : null
          }
          isLoading={passwordModal.loading}
        >
          {passwordModal.error && (
            <p className="text-red-500 mb-4">{passwordModal.error}</p>
          )}

          {passwordModal.step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordModal.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter current password"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordModal.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordModal.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          )}
        </ReminderCommonModal>
      )}

      {/* Common Modal */}
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

export default Settings;
