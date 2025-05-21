import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { loginApi } from "../Services/ApiCall";
import ReminderCommonModal from "../basicCompoents/ReminderCommonModal";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

    if (validate()) {
      try {
        const apiResult = await loginApi(formData);
        console.log(apiResult);
        if (apiResult.status === 201) {
          showModal(
            `Login Successful!`,
            "You're logged in! Let's get your reminders set",
            "success",
            () => {
              setModalState((prev) => ({ ...prev, isOpen: false }));
              navigate("/main");
              sessionStorage.setItem(
                "logeduser",
                JSON.stringify(apiResult.data.data)
              );
              sessionStorage.setItem("token", apiResult.data.token);
            }
          );
        } else if (apiResult.status === 400) {
          showModal("Login Conflict", apiResult.response.data, "info");
        } else {
          showModal(
            "Login Failed",
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
        to={"/"}
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

      
      

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
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
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to manage your reminders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
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
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-emerald-500 hover:underline"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="block text-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign up
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

export default Login;
