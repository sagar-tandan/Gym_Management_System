import React, { useContext, useEffect, useState } from "react";
import { CgPassword } from "react-icons/cg";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllContext } from "./Context/Context";

const AdminiLoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { token, setToken } = useContext(AllContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function LoginDataSubmit(e) {
    e.preventDefault();
    console.log(loginForm);
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        loginForm
      );
      console.log(response);
      if (response.status == 200) {
        SaveDataToLocalStorage(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function SaveDataToLocalStorage(data) {
    const expiryTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    localStorage.setItem("username", data.username);
    localStorage.setItem("AdminEmail", data.email);
    localStorage.setItem("token", data.token);
    localStorage.setItem("uid", data.userId);
    localStorage.setItem("role", data.roles[0]);
    localStorage.setItem("expiryTime", expiryTime);
    setToken(data.token);
    navigate("/adminDashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2148c0] relative overflow-x-hidden max-w-screen-2xl mx-auto">
      <div className="absolute right-[-60px] top-0">
        <svg
          className="w-[700px] h-[500px]"
          viewBox="0 0 861 786"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M262.749 152.516C124.115 166.46 29.8191 56.6486 0 0L883.326 3.81289V786H784.667C479.184 744.603 530.609 579.559 594.507 502.212C631.823 447.924 699.3 317.123 670.673 228.229C634.891 117.11 436.04 135.085 262.749 152.516Z"
            fill="#264ECA"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 z-10">
        <svg
          className="w-[400px] h-[275px]"
          viewBox="0 0 434 275"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="140.096"
            cy="308.975"
            rx="293.096"
            ry="308.975"
            fill="#244BC5"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0">
        <svg
          className="w-[600px] h-[500px]"
          viewBox="0 0 648 567"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="255" cy="434" rx="393" ry="434" fill="#264ECA" />
        </svg>
      </div>

      <div className="w-full max-w-lg p-8 space-y-6 z-20">
        <p className="w-full font-medium text-white text-center text-lg">
          Dharan Fitness Club Login
        </p>
        <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-blue-custom rounded-lg">
          <div className="text-center mb-10">
            <p className="mt-2 text-sm text-gray-600">
              Please fill in your unique admin login details below.
            </p>
          </div>
          <form className="space-y-4" onSubmit={LoginDataSubmit}>
            {/* Username */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[#6f6f6f]" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={loginForm.email}
                  className="w-full pl-10 pr-4 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[#6f6f6f]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password}
                  className="w-full pl-10 pr-4 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>

            <p className="text-right text-[#6f6f6f] ">
              <span className="cursor-pointer hover:text-blue-600">
                Forget Password?
              </span>
            </p>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-sm hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminiLoginPage;
