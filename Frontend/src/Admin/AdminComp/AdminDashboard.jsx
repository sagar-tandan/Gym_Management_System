import React, { useEffect, useState } from "react";

import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import { CgGym } from "react-icons/cg";

import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    // Retrieve login date from localStorage
    const storedLoginDate = localStorage.getItem("loginDate");
    if (storedLoginDate) {
      const loginDate = new Date(storedLoginDate);
      const timeAgo = formatDistanceToNow(loginDate, { addSuffix: true });
      setLastLogin(timeAgo);
    } else {
      setLastLogin("No login data available");
    }
  }, []);

  return (
    <div className="min-h-screen text-gray-900 px-3 mt-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-nunito">
        {/* Admin Profile Summary */}
        <div className="bg-purple-100 px-6 rounded-lg shadow-lg flex items-center justify-between py-4">
          <div>
            <h2 className="text-2xl font-semibold font-nunito">
              Admin Profile
            </h2>
            <p className="text-lg font-nunito">
              {localStorage.getItem("username")}
            </p>
            <p>
              Last Login: <span className="text-gray-500">{lastLogin}</span>
            </p>
          </div>
          <MdAdminPanelSettings className="text-purple-700 w-9 h-9" />
        </div>

        <div className="bg-purple-100 px-6 rounded-lg shadow-lg flex items-center justify-between py-4">
          <div>
            <h2 className="text-2xl font-semibold font-nunito">Members</h2>

            <p>
              Total Members: <span className="text-gray-500">{250}</span>
            </p>
            <p>
              New Today: <span className="text-gray-500">{10}</span>
            </p>
          </div>
          <MdOutlinePeopleAlt className="text-purple-700 w-9 h-9" />
        </div>

        {/* Plans Summary */}

        <div className="bg-purple-100 px-6 rounded-lg shadow-lg flex items-center justify-between py-4">
          <div>
            <h2 className="text-2xl font-semibold font-nunito">Plan</h2>

            <p>
              Total Plans: <span className="text-gray-500">{20}</span>
            </p>
            <p>
              Popular Plan: <span className="font-bold">ActivePro 3</span>
            </p>
          </div>
          <GiBlackBook className="text-purple-700 w-9 h-9" />
        </div>

        {/* Inventory Summary */}

        <div className="bg-purple-100 px-6 rounded-lg shadow-lg flex items-center justify-between py-4">
          <div>
            <h2 className="text-2xl font-semibold font-nunito">Inventory</h2>

            <p>
              Total Items: <span className="text-gray-500">{20}</span>
            </p>
            <p>
              Active items: <span className="font-bold text-green-500">5</span>
            </p>
          </div>
          <CgGym className="text-purple-700 w-9 h-9" />
        </div>
      </div>

      {/* Section Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Growth Summary */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Member Growth</h2>
          <div className="flex justify-between items-center">
            <p>Growth Rate:</p>
            <p className="text-3xl font-bold text-green-500">8%</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">
              New members are joining at a steady rate this month.
            </p>
          </div>
        </div> */}

        {/* Section Availability Summary */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gym Sections</h2>
          <div className="flex justify-between items-center">
            <p>Classes Available:</p>
            <p className="text-3xl font-bold text-blue-500">12</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Most popular section: Yoga Classes</p>
          </div>
        </div> */}

        {/* Expiring Subscriptions */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Expiring Subscriptions
          </h2>
          <div className="flex justify-between items-center">
            <p>Expiring Soon:</p>
            <p className="text-3xl font-bold text-red-500">5</p>
          </div>
          <p className="text-gray-600 mt-2">
            Send reminders to renew subscriptions for these members.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
