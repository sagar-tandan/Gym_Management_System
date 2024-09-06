import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { GiTireIronCross } from "react-icons/gi";

const MemberRegister = () => {
  const [selected, setSelected] = useState("allMember");
  const [plan, setPlan] = useState([]);

  const [registerMember, setregisterMember] = useState({
    cardNo: "",
    memberName: "",
    enrolledDate: "",
    expiryDate: "",
    email: "",
    contact: "",
    plan: "",
    price: "",
  });

  const [openModel, setModel] = useState(false);
  const [openDeleteModel, setDeleteModel] = useState(false);
  const [editable, setEditable] = useState(false);
  const [itemID, setItemID] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    // console.log("Setting enrolledDate to:", todayDate); // Debug log
    setregisterMember((prev) => ({
      ...prev,
      enrolledDate: todayDate,
    }));
    const fetchPlan = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/plan");
        const data = response.data;
        setPlan(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlan();
  }, []);

  //AUTO UPDATE PRICE AND EXPIRY DATE ON SELECTING PLAN
  useEffect(() => {
    const selectedPlan = plan.find(
      (plan) => plan.planId === parseInt(registerMember.plan)
    );

    if (selectedPlan) {
      const enrollment = new Date(registerMember.enrolledDate);
      const expiry = new Date(
        enrollment.setMonth(
          enrollment.getMonth() + selectedPlan.durationInMonths
        )
      );
      setregisterMember((prev) => ({
        ...prev,
        price: selectedPlan.cost,
        expiryDate: expiry && expiry.toISOString().split("T")[0],
      }));
    } else {
      setregisterMember((prev) => ({ ...prev, price: 0, expiryDate: 0 }));
    }
    console.log(registerMember);
  }, [registerMember.plan]);

  const MountModel = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setModel(true);
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterMember((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-2 h-screen">
      <div className="w-full flex justify-between px-5 items-center mt-[3px]">
        <div className="flex gap-3">
          <span
            onClick={() => setSelected("allMember")}
            className={`w-[150px] text-center py-1 border-[1px] rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out ${
              selected === "allMember" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All Members
          </span>
          <span
            onClick={() => setSelected("paid")}
            className={`w-[150px] text-center py-1 border-[1px] rounded-full cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-500 ease-in-out ${
              selected === "paid" ? "bg-green-500 text-white" : ""
            }`}
          >
            Paid
          </span>
          <span
            onClick={() => setSelected("unpaid")}
            className={`w-[150px] text-center py-1 border-[1px] rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-500 ease-in-out ${
              selected === "unpaid" ? "bg-red-500 text-white" : ""
            }`}
          >
            Unpaid
          </span>
        </div>
        <button
          onClick={(e) => MountModel(e)}
          className="px-3 py-[6px] bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-900 transition-all duration-300 ease-in-out font-medium "
        >
          Register Member
        </button>
      </div>
      <hr className="w-full mt-1 border-[1px]" />
      <section className="w-full py-1 px-3">
        <table className="w-full">
          <thead>
            <tr className="w-full border-[1px] border-blue-100 bg-blue-50 rounded-sm">
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Card No.
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Member Name
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Enrolled Date
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Expiration Date
              </th>
              <th className="font-medium text-left pl-6 py-2 text-[#636363]">
                Actions
              </th>
            </tr>
          </thead>
        </table>
      </section>

      {/* MODEL */}

      {openModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
          <div className="w-[550px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-medium text-lg text-blue-600">
                {editable ? "Edit Member" : "Register Member"}
              </h1>
              <GiTireIronCross
                // onClick={() => UnMountModel()}
                className="w-5 h-5 text-red-600 cursor-pointer active:scale-[0.95]"
              />
            </div>
            <form className="w-full flex flex-col" onSubmit={(e) => addItem(e)}>
              <label class="block mb-2 font-medium mt-2" for="cardNo">
                Card Number
              </label>
              <input
                type="number"
                id="cardNo"
                name="cardNo"
                className="p-2 w-full rounded-sm bg-blue-50"
                placeholder="Member card Number"
                value={MemberRegister.cardNo}
                onChange={handleChange}
              />

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="memberName">
                    Member Name
                  </label>
                  <input
                    type="text"
                    id="memberName"
                    name="memberName"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Full Name"
                    value={registerMember.memberName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label
                    class="block mb-2 font-medium mt-4 "
                    for="enrolledDate"
                  >
                    Enrolled Date
                  </label>
                  <input
                    type="date"
                    id="enrolledDate"
                    name="enrolledDate"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Date"
                    value={registerMember.enrolledDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Email address"
                    value={registerMember.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="contact">
                    Contact
                  </label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Contact number"
                    value={registerMember.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="plan">
                    Plan
                  </label>
                  <select
                    className="outline-none p-2 w-full rounded-sm bg-blue-50"
                    name="plan"
                    id="plan"
                    required
                    onChange={handleChange}
                  >
                    <option value="NaN">Select Plan</option>
                    {plan &&
                      plan.map((plan) => (
                        <option value={plan.planId}>{plan.name}</option>
                      ))}
                  </select>
                </div>
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Total amount"
                    value={registerMember.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-end mt-6 px-[2px]">
                <button
                  type="submit"
                  className="bg-blue-500 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-blue-700 transition-all duration-300 ease-in-out active:bg-blue-900"
                >
                  {loading
                    ? "updating.."
                    : `${editable ? "Update Member" : "Register Member"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberRegister;
