import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerApi } from "../Services/ApiCall";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullname: "",
    phnno: "",
    email: "",
    password: "",
    confrimPass: "",
  });

  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "default",
    onConfirm: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const validation = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10}$/;

    if (!registerData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!registerData.phnno.trim()) {
      newErrors.phnno = "Phone number is required";
    } else if (!phoneRegex.test(registerData.phnno.trim())) {
      newErrors.phnno = "Enter a valid phone number";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(registerData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.confrimPass) {
      newErrors.confrimPass = "Confirm your password";
    } else if (registerData.confrimPass !== registerData.password) {
      newErrors.confrimPass = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const result = await registerApi(registerData);
        // console.log(result.response.data.error);
        if (result.status === 201) {
          showModal(
            "Registration Successful!",
            "Account created successfully. Please log in.",
            "success",
            () => {
              setModalState((prev) => ({ ...prev, isOpen: false }));
              navigate("/login");
            }
          );
        } else if (result.status === 400) {
          showModal(
            "Registration Conflict",
            result.response.data.error,
            "info"
          );
        } else {
          showModal(
            "Registration Failed",
            "Something went wrong. Please try again later.",
            "error"
          );
        }
      } catch (err) {
        showModal(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection.",
          "error"
        );
      }
    }
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-50 flex items-center justify-center p-4 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 sm:left-10 flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faUser} className="text-emerald-500 text-xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-600">
          ReminderApp
        </h2>
        <div className="text-[10px] mt-2">
          can you wait 50 to 60 second for the every button click becouse the site is deployed in a free service 🥲
        </div>
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-5">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <FontAwesomeIcon
                icon={faUser}
                className="text-emerald-500 text-2xl"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Get started with your reminder management
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="fullname"
                  value={registerData.fullname}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  name="phnno"
                  value={registerData.phnno}
                  onChange={handleChange}
                  placeholder="your phone number"
                  // maxLength={10}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.phnno && (
                <p className="text-red-500 text-sm mt-1">{errors.phnno}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confrimPass"
                  value={registerData.confrimPass}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              </div>
              {errors.confrimPass && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confrimPass}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="block text-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign in
          </Link>
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

export default Register;
