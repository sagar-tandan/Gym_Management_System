import React, { useState } from "react";
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
import ViewMember from "./AdminComp/ViewMember";
import Inventory from "./AdminComp/Inventory";
import AdminReport from "./AdminComp/AdminReport";

const AdminPage = () => {
  const [active, setActive] = useState("dashboard");

  const handleClick = (e, act) => {
    setActive(act);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto flex">
      {/* ADMIN MENU */}
      <aside className="w-[250px] px-2 h-screen fixed bg-white flex flex-col gap-4">
        {/* LOGO Section */}
        <div className="w-full py-2 flex flex-col items-center">
          <img
            className="w-[100px] object-cover"
            src="https://cdn3.f-cdn.com/contestentries/1981694/57156482/6119296dad926_thumb900.jpg"
            alt=""
          />
          <h1 className="w-full text-center font-semibold mt-1 text-xl">
            Dharan Fitness Club
          </h1>
          <hr className="w-full mt-1 border-[1px]" />
        </div>

        <nav className="w-full flex flex-col justify-between h-full pb-5">
          <div className="w-full flex flex-col gap-4">
            <div
              onClick={(e) => handleClick(e, "dashboard")}
              className={`${
                active === "dashboard"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <LuLayoutDashboard className="w-6 h-6" />
              <h1>Dashboard</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "admin")}
              className={`${
                active === "admin"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineAdminPanelSettings className="w-6 h-6" />
              <h1>Admin Profile</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "register")}
              className={`${
                active === "register"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineGroupAdd className="w-6 h-6" />
              <h1>Register Member</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "plan")}
              className={`${
                active === "plan" ? "bg-blue-200 text-blue-600 font-normal" : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <RiTodoLine className="w-6 h-6" />
              <h1>Plan</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "member")}
              className={`${
                active === "member"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <MdOutlineSportsGymnastics className="w-6 h-6" />
              <h1>View Members</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "inventory")}
              className={`${
                active === "inventory"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <CgGym className="w-6 h-6" />
              <h1>Inventory</h1>
            </div>

            <div
              onClick={(e) => handleClick(e, "report")}
              className={`${
                active === "report"
                  ? "bg-blue-200 text-blue-600 font-normal"
                  : ""
              } w-full flex gap-2 cursor-pointer hover:bg-blue-200 hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
            >
              <TbMessageReport className="w-6 h-6" />
              <h1>Report</h1>
            </div>
          </div>

          <div
            // onClick={(e) => handleClick(e)}
            className={`w-full flex gap-2 cursor-pointer hover:text-blue-600 py-[6px] px-3 rounded-sm transition-all duration-300 ease-in-out group`}
          >
            <IoMdLogOut className="w-6 h-6" />
            <h1>Log out</h1>
          </div>
        </nav>
      </aside>

      <section className="w-full h-screen ml-[250px] flex flex-col gap-3 overflow-y-auto">
        <div className="w-full py-2 flex flex-col items-center">
          <img className="w-[100px] h-[90px] object-cover" src="" alt="" />
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
        ) : active === "member" ? (
          <ViewMember />
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
