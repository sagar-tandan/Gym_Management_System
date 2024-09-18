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
import SearchComp from "./AdminComp/SearchComp";

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
    setActive("Dashboard");
    localStorage.setItem("active", "Dashboard");
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
              onClick={(e) => handleClick(e, "Dashboard")}
              className={`${
                active === "Dashboard"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-30% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-500 ease-in-out group `}
            >
              <LuLayoutDashboard
                className={`w-6 h-6 ${
                  active === "Dashboard" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={` ${
                  active === "Dashboard" ? "text-orange-400" : ""
                }`}
              >
                Dashboard
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "Admin")}
              className={`${
                active === "Admin"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-30% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineAdminPanelSettings
                className={`w-6 h-6 ${
                  active === "Admin" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={` ${active === "Admin" ? "text-orange-400" : ""}`}>
                Admin Profile
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "Member")}
              className={`${
                active === "Member"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineGroupAdd
                className={`w-6 h-6 ${
                  active === "Member" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={` ${active === "Member" ? "text-orange-400" : ""}`}
              >
                Members
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "Plan")}
              className={`${
                active === "Plan"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <RiTodoLine
                className={`w-6 h-6 ${
                  active === "Plan" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={` ${active === "Plan" ? "text-orange-400" : ""}`}>
                Plan
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "Inventory")}
              className={`w-full text-white flex gap-2 cursor-pointer py-[6px] px-8 transition-colors duration-300 ease-in-out ${
                active === "Inventory"
                  ? "text-orange-400 bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90% font-normal"
                  : "hover:text-[#FBB03B]"
              }`}
            >
              <CgGym
                className={`w-6 h-6 ${
                  active === "Inventory" ? "text-orange-400" : ""
                }`}
              />
              <h1
                className={`${active === "Inventory" ? "text-orange-400" : ""}`}
              >
                Inventory
              </h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "Report")}
              className={`${
                active === "Report"
                  ? "text-orange-400 font-normal bg-gradient-to-r from-[#FBB03B] from-1% via-transparent via-25% to-transparent to-90%"
                  : ""
              } w-full text-white flex gap-2 cursor-pointer hover:text-[#FBB03B] py-[6px] px-8 transition-all duration-300 ease-in-out group`}
            >
              <TbMessageReport
                className={`w-6 h-6 ${
                  active === "Report" ? "text-orange-400" : ""
                }`}
              />
              <h1 className={`${active === "Report" ? "text-orange-400" : ""}`}>
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
        <div className="w-full py-2 flex items-center justify-between px-3">
          <SearchComp />
          <img
            className="w-10 h-10 bg-purple-600 rounded-full object-cover"
            src={logo}
            alt=""
          />
        </div>

        {active === "Dashboard" ? (
          <AdminDashboard />
        ) : active === "Admin" ? (
          <AdminProfile />
        ) : active === "Member" ? (
          <MemberRegister />
        ) : active === "Plan" ? (
          <AdminPlan />
        ) : active === "Inventory" ? (
          <Inventory />
        ) : (
          <AdminReport />
        )}
      </section>
    </div>
  );
};

export default AdminPage;
