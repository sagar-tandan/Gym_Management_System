import React, { useContext, useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { MdOutlineGroupAdd } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { RiTodoLine } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { TbMessageReport } from "react-icons/tb";
import AdminDashboard from "./AdminComp/AdminDashboard";
import AdminProfile from "./AdminComp/AdminProfile";
import MemberRegister from "./AdminComp/MemberRegister";
import AdminPlan from "./AdminComp/AdminPlan";
import Inventory from "./AdminComp/Inventory";
import AdminReport from "./AdminComp/AdminReport";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../Context/Context";

import logo from "../assets/dfc.png";

const AdminPage = () => {
  const { active, setActive } = useContext(AllContext);
  const { token, setToken } = useContext(AllContext);

  const handleClick = (e, act) => {
    setActive(act);
    localStorage.setItem("active", act);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const activenow = localStorage.getItem("active");
    if (activenow != null) {
      setActive(activenow);
    }
  }, []);

  const handleClickLogo = () => {
    navigate("/adminDashboard");
    setActive("dashboard");
    localStorage.setItem("active", "dashboard");
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto flex relative h-screen">
      {/* ADMIN MENU */}
      <aside className="w-[230px] h-screen fixed bg-[#490057] flex flex-col gap-4 overflow-auto">
        {/* LOGO Section */}
        <div className="w-full py-6 flex gap-3 justify-center items-center px-3 ">
          <img
            onClick={handleClickLogo}
            className="w-[120px] h-[120px] object-cover cursor-pointer"
            src={logo}
            alt="img"
          />
          {/* <span className=" text-start font-semibold mt-4 text-[26px] text-white font-nunito">
            DFC
          </span> */}
          {/* <hr className="w-full mt-[16px] border-[1px]" /> */}
        </div>

        <nav className="w-full flex flex-col justify-between h-full pb-5 mt-4">
          <div className="w-full flex flex-col gap-4">
            <div
              onClick={(e) => handleClick(e, "dashboard")}
              className={`${
                active === "dashboard"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-30% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-500 ease-in-out group `}
            >
              <LuLayoutDashboard
                className={`w-6 h-6 ${
                  active === "dashboard" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={` ${
                  active === "dashboard" ? "text-orange-400" : ""
                }`}
              >
                Dashboard
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "admin")}
              className={`${
                active === "admin"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-30% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineAdminPanelSettings
                className={`w-6 h-6 ${
                  active === "admin" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={` ${active === "admin" ? "text-orange-400" : ""}`}>
                Admin Profile
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "register")}
              className={`${
                active === "register"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineGroupAdd
                className={`w-6 h-6 ${
                  active === "register" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={` ${active === "register" ? "text-orange-400" : ""}`}
              >
                Members
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "plan")}
              className={`${
                active === "plan"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <RiTodoLine
                className={`w-6 h-6 ${
                  active === "plan" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={` ${active === "plan" ? "text-orange-400" : ""}`}>
                Plan
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "inventory")}
              className={`w-full text-white flex gap-2 cursor-pointer py-[6px] px-8 transition-colors duration-300 ease-in-out ${
                active === "inventory"
                  ? "text-orange-400 bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90% font-normal"
                  : "hover:text-[#FBB03B]"
              }`}
            >
              <CgGym
                className={`w-6 h-6 ${
                  active === "inventory" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={`${active === "inventory" ? "text-orange-400" : ""}`}
              >
                Inventory
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "report")}
              className={`${
                active === "report"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <TbMessageReport
                className={`w-6 h-6 ${
                  active === "report" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={`${active === "report" ? "text-orange-400" : ""}`}>
                Report
              </h1>
            </div>
          </div>

          <div
            onClick={(e) => {
              setToken(null);
              navigate("/adminlogin");
              localStorage.clear();
            }}
            className={`w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 rounded-sm transition-all duration-300 ease-in-out group`}
          >
            <IoMdLogOut className="w-6 h-6" />
            <h1>Log out</h1>
          </div>
        </nav>
      </aside>

      <section className="w-full min-h-screen ml-[230px] flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white">
        <div className="w-full py-2 flex flex-col items-center">
          <img className="w-[100px] h-[24px] object-cover" src="" alt="" />
          <h1 className="w-full text-center font-semibold text-xl mt-1">
            Dharan Fitness Club
          </h1>
        </div>

        {active === "dashboard" ? (
          <AdminDashboard />
        ) : active === "admin" ? (
          <AdminProfile />
        ) : active === "register" ? (
          <MemberRegister />
        ) : active === "plan" ? (
          <AdminPlan />
        ) : active === "inventory" ? (
          <Inventory />
        ) : (
          <AdminReport />
        )}
      </section>
    </div>
  );
};

export default AdminPage;
