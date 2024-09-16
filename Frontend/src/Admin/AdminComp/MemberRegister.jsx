import axios from "axios";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "../../Pagination.css";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GiTakeMyMoney } from "react-icons/gi";

const MemberRegister = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState("allMember");
  const [plan, setPlan] = useState([]);
  const [totalPages, setTotalPage] = useState();
  const [memberInfo, setMemberInfo] = useState();
  const [allMemberData, setAllMemberData] = useState();

  //Paid and Unpaid pagination
  const [allPaidandUnpaidMember, setallPaidandUnpaidMember] = useState([]);
  const [allPaidMember, setAllPaidMember] = useState([]);
  const [allUnPaidMember, setAllUnPaidMember] = useState([]);
  const [currentPagePaid, setCurrentPagePaid] = useState(1);
  const [currentPageUnpaid, setCurrentUnPagePaid] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Adjust as needed
  const [paginatedPaidMembers, setPaginatedPaidMembers] = useState([]);

  const [totalPaidPage, setTotalPagePaid] = useState();
  const [totalUnPaidPage, setTotalPageUnPaid] = useState();

  const [paginatedUnpaidMembers, setPaginatedUnpaidMembers] = useState([]);

  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [registerMember, setregisterMember] = useState({
    cardNo: "",
    memberName: "",
    enrolledDate: todayDate,
    expiryDate: "",
    email: "",
    contact: "",
    price: "",
    planName: "",
    planId: "",
  });

  const [openModel, setModel] = useState(false);
  const [openDeleteModel, setDeleteModel] = useState(false);
  const [editable, setEditable] = useState(false);
  const [renew, setRenew] = useState(false);
  const [itemID, setItemID] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMemberData();
  }, [currentPage]);

  // Pagination logic for paid and unpaid
  const paginate = (members, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return members && members.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    setTotalPagePaid(
      Math.ceil(allPaidMember && allPaidMember.length / itemsPerPage)
    );
    setTotalPageUnPaid(
      Math.ceil(allUnPaidMember && allUnPaidMember.length / itemsPerPage)
    );
    setPaginatedPaidMembers(
      paginate(allPaidMember, currentPagePaid, itemsPerPage)
    );
    setPaginatedUnpaidMembers(
      paginate(allUnPaidMember, currentPageUnpaid, itemsPerPage)
    );
  }, [allPaidMember, allUnPaidMember]);

  useEffect(() => {
    setPaginatedPaidMembers(
      paginate(allPaidMember, currentPagePaid, itemsPerPage)
    );
  }, [currentPagePaid]);

  useEffect(() => {
    setPaginatedUnpaidMembers(
      paginate(allUnPaidMember, currentPageUnpaid, itemsPerPage)
    );
  }, [currentPageUnpaid]);

  const fetchAllMemberData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/member/getAllMembers`
      );
      if (response.data) {
        setallPaidandUnpaidMember(response.data);
        const paid = response.data.filter(
          (info) => new Date(info.expiryDate) > new Date(todayDate)
        );
        const Unpaid = response.data.filter(
          (info) => new Date(info.expiryDate) <= new Date(todayDate)
        );
        setAllPaidMember(paid);
        setAllUnPaidMember(Unpaid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/member?pageNumber=${currentPage}&pageSize=8`
      );
      console.table(response.data);
      setAllMemberData(response.data.members);
      setMemberInfo(response.data);
      setTotalPage(Math.ceil(response.data.totalRecords / 8));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/plan`);
        const data = response.data;
        setPlan(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlan();
    fetchMemberData();
  }, []);

  //AUTO UPDATE PRICE AND EXPIRY DATE ON SELECTING PLAN

  useEffect(() => {
    const selectedPlan = plan.find(
      (plan) => plan.planId === parseInt(registerMember.planId)
    );

    if (selectedPlan) {
      if (renew) {
        // Renewing the plan by adding duration to the current expiry date
        const finalDate = new Date(registerMember.expiryDate);
        const expiry = new Date(
          finalDate.setMonth(
            finalDate.getMonth() + selectedPlan.durationInMonths
          )
        );
        setregisterMember((prev) => ({
          ...prev,
          price: selectedPlan.cost,
          expiryDate: expiry.toISOString().split("T")[0], // Format as YYYY-MM-DD
          planName: selectedPlan.name,
        }));
      } else {
        // New enrollment, add duration from enrollment date
        const enrollment = new Date(registerMember.enrolledDate);
        const expiry = new Date(
          enrollment.setMonth(
            enrollment.getMonth() + selectedPlan.durationInMonths
          )
        );
        setregisterMember((prev) => ({
          ...prev,
          price: selectedPlan.cost,
          expiryDate: expiry.toISOString().split("T")[0], // Format as YYYY-MM-DD
          planName: selectedPlan.name,
        }));
      }
    } else {
      // Reset when no plan is selected
      setregisterMember((prev) => ({ ...prev, price: 0, expiryDate: "" }));
    }
  }, [registerMember.planId, renew, plan]);

  const MountModel = (e) => {
    e.preventDefault();
    setregisterMember({
      cardNo: "",
      memberName: "",
      enrolledDate: todayDate,
      expiryDate: "",
      email: "",
      contact: "",
      price: "",
      planName: "",
      planId: "",
    });

    setModel(true);
  };

  const UnMountModel = () => {
    setTimeout(() => {
      setModel(false);
      setEditable(false);
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing planId to:", name, value); // Debugging line
    setregisterMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditModel = (e, data) => {
    setEditable(true);
    setregisterMember(data);
    setModel(true);
  };

  const handleRenewModel = (e, data) => {
    setRenew(true);
    setregisterMember(data);
  };

  const RenewMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5002/api/member/${registerMember.id}`,
        registerMember
      );
      console.log(response);
      fetchMemberData();
      fetchAllMemberData();
    } catch (error) {
      console.log(error);
    }
    setRenew(false);
  };

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendDataToBackend();
    // Reset the form after submission
    setregisterMember({
      cardNo: "",
      memberName: "",
      enrolledDate: todayDate,
      expiryDate: "",
      email: "",
      contact: "",
      price: "",
      planName: "",
      planId: "",
    });
    setModel(false);
    setEditable(false);
    setLoading(false);
  };

  const sendDataToBackend = async () => {
    try {
      if (editable) {
        // console.log(registerMember);
        // Update existing item
        const response = await axios.put(
          `http://localhost:5002/api/member/${registerMember.id}`,
          registerMember
        );
        // console.log(response);
      } else {
        // Add new member
        const response = await axios.post(
          "http://localhost:5002/api/member",
          registerMember
        );
        console.log(response);
      }
      fetchMemberData();
      fetchAllMemberData(); // Refresh data after adding/updating
    } catch (error) {
      console.log(error);
    }
  };

  const calculateExpiredDay = (today, expiry) => {
    const day = Math.floor(
      (new Date(today) - new Date(expiry)) / (1000 * 60 * 60 * 24)
    );
    return day;
  };

  //Function for deleting Data
  const deleteItem = async (e, id) => {
    try {
      // Send a DELETE request to the backend
      const response = await axios.delete(
        `http://localhost:5002/api/member/${id}`
      );
      setTimeout(() => {
        setDeleteModel(false);
      }, 100);
      fetchMemberData();
      fetchAllMemberData(0); // Refresh data after deleting
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      <div className="w-full flex justify-between px-3 items-center mt-5">
        <div className="flex gap-3">
          <span
            onClick={() => setSelected("allMember")}
            className={`w-[150px] text-center py-1 border-[1px] rounded-full cursor-pointer hover:bg-purple-700 hover:text-white transition-all duration-500 ease-in-out ${
              selected === "allMember" ? "bg-purple-700 text-white" : ""
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
          className="px-3 py-[6px] bg-purple-700 text-white rounded-sm hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out font-medium "
        >
          Register Member
        </button>
      </div>
      <section className="w-full py-1 px-3 relative">
        <table className="w-full ">
          <thead>
            <tr className="w-full border-[1px] border-purple-200 bg-purple-100 rounded-sm">
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Card No.
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Member Name
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Contact
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
          {selected === "allMember" ? (
            allMemberData && allMemberData.length > 0 ? (
              <tbody>
                {allMemberData.map((member, index) => (
                  <tr
                    key={index}
                    className={`border-[1px] border-purple-200 ${
                      new Date(member.expiryDate) <= new Date(todayDate)
                        ? calculateExpiredDay(todayDate, member.expiryDate) <= 5
                          ? "bg-red-50"
                          : calculateExpiredDay(todayDate, member.expiryDate) <=
                            10
                          ? "bg-red-100"
                          : "bg-red-200"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-5 font-medium text-black">
                      {member.cardNo}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.memberName}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.contact}
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.enrolledDate}
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.expiryDate}
                    </td>

                    <td className="py-3 px-5 w-[200px]">
                      <div className="w-full flex gap-8">
                        <LiaEditSolid
                          onClick={(e) => handleEditModel(e, member)}
                          className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer"
                        />
                        <GiTakeMyMoney
                          onClick={(e) => handleRenewModel(e, member)}
                          className="w-6 h-6 text-[#636363] hover:text-[#ee0979] cursor-pointer"
                        />

                        <MdDeleteOutline
                          onClick={() => {
                            setDeleteModel(true);
                            setItemID(member.id);
                          }}
                          className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="w-full py-2 text-center mt-10 absolute">
                No data found !
              </div>
            )
          ) : selected === "paid" ? (
            paginatedPaidMembers && paginatedPaidMembers.length > 0 ? (
              <tbody>
                {paginatedPaidMembers.map((member, index) => (
                  <tr key={index} className="border-[1px] border-purple-200">
                    <td className="py-3 px-5 font-medium text-black">
                      {member.cardNo}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.memberName}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.contact}
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.enrolledDate}
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {member.expiryDate}
                    </td>

                    <td className="py-3 px-5 w-[200px]">
                      <div className="w-full flex gap-8">
                        <LiaEditSolid
                          onClick={(e) => handleEditModel(e, member)}
                          className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer"
                        />
                        <GiTakeMyMoney
                          onClick={(e) => handleRenewModel(e, member)}
                          className="w-6 h-6 text-[#636363] hover:text-[#ee0979] cursor-pointer"
                        />

                        <MdDeleteOutline
                          onClick={() => {
                            setItemID(member.id);
                            setDeleteModel(true);
                          }}
                          className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="w-full py-2 text-center mt-10 absolute">
                No data found !
              </div>
            )
          ) : paginatedUnpaidMembers && paginatedUnpaidMembers.length > 0 ? (
            <tbody>
              {paginatedUnpaidMembers.map((member, index) => (
                <tr key={index} className="border-[1px] border-purple-200">
                  <td className="py-3 px-5 font-medium text-black">
                    {member.cardNo}
                  </td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {member.memberName}
                  </td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {member.contact}
                  </td>

                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {member.enrolledDate}
                  </td>

                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {member.expiryDate}
                  </td>

                  <td className="py-3 px-5 w-[200px]">
                    <div className="w-full flex gap-8">
                      <LiaEditSolid
                        onClick={(e) => handleEditModel(e, member)}
                        className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer"
                      />
                      <GiTakeMyMoney
                        onClick={(e) => handleRenewModel(e, member)}
                        className="w-6 h-6 text-[#636363] hover:text-[#ee0979] cursor-pointer"
                      />

                      <MdDeleteOutline
                        onClick={() => {
                          setItemID(member.id);
                          setDeleteModel(true);
                        }}
                        className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="w-[90%] py-2 text-center mt-10 absolute">
              No data found !
            </div>
          )}
        </table>
      </section>

      {allPaidandUnpaidMember.length > 7 && selected === "allMember" ? (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          className="pagination"
        />
      ) : allPaidMember.length > 7 && selected === "paid" ? (
        <ResponsivePagination
          current={currentPagePaid}
          total={totalPaidPage}
          onPageChange={setCurrentPagePaid}
          className="pagination"
        />
      ) : (
        allUnPaidMember.length > 7 && (
          <ResponsivePagination
            current={currentPageUnpaid}
            total={totalUnPaidPage}
            onPageChange={setCurrentUnPagePaid}
            className="pagination"
          />
        )
      )}

      {/* MODEL */}

      {openModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto z-30">
          <div className="w-[550px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-medium text-lg text-purple-800">
                {editable ? "Edit Member" : "Register Member"}
              </h1>
              <RxCross2
                onClick={() => UnMountModel()}
                className="w-7 h-7 cursor-pointer active:scale-[0.95]"
              />
            </div>
            <form className="w-full flex flex-col" onSubmit={(e) => addItem(e)}>
              {editable && (
                <div className="w-full flex gap-3">
                  <div className="w-full flex flex-col">
                    <label class="block mb-2 font-medium mt-2" for="cardNo">
                      Card Number
                    </label>
                    <input
                      type="number"
                      id="cardNo"
                      name="cardNo"
                      className="p-2 w-full rounded-sm bg-purple-100"
                      placeholder="Member card Number"
                      value={registerMember.cardNo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <label class="block mb-2 font-medium mt-2" for="memberName">
                      Member Name
                    </label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      className="p-2 w-full rounded-sm bg-purple-100"
                      placeholder="Full Name"
                      value={registerMember.memberName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
              {!editable && (
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-2" for="cardNo">
                    Card Number
                  </label>
                  <input
                    type="number"
                    id="cardNo"
                    name="cardNo"
                    className="p-2 w-full rounded-sm bg-purple-100"
                    placeholder="Member card Number"
                    value={registerMember.cardNo}
                    onChange={handleChange}
                  />
                </div>
              )}
              {!editable && (
                <div className="w-full flex gap-3">
                  <div className="w-full flex flex-col">
                    <label
                      class="block mb-2 font-medium mt-4 "
                      for="memberName"
                    >
                      Member Name
                    </label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      className="p-2 w-full rounded-sm bg-purple-100"
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
                      className="p-2 w-full rounded-sm bg-purple-100"
                      placeholder="Date"
                      value={registerMember.enrolledDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {editable && (
                <div className="w-full flex gap-3">
                  <div className="w-full flex flex-col">
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
                        className="p-2 w-full rounded-sm bg-purple-100"
                        placeholder="Date"
                        value={registerMember.enrolledDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      class="block mb-2 font-medium mt-4 "
                      for="expiryDate"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      className="p-2 w-full rounded-sm bg-purple-100"
                      placeholder="Date"
                      value={registerMember.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 w-full rounded-sm bg-purple-100"
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
                    className="p-2 w-full rounded-sm bg-purple-100"
                    placeholder="Contact number"
                    value={registerMember.contact}
                    max="9999999999"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {!editable && (
                <div className="w-full flex gap-3">
                  <div className="w-full flex flex-col">
                    <label class="block mb-2 font-medium mt-4 " for="planId">
                      Plan
                    </label>
                    <select
                      className="outline-none p-2 w-full rounded-sm bg-purple-100"
                      name="planId"
                      id="planId"
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
                      className="p-2 w-full rounded-sm bg-purple-100"
                      placeholder="Total amount"
                      value={registerMember.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex justify-end mt-6 px-[2px]">
                <button
                  type="submit"
                  className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
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

      {renew && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto z-30">
          <div className="w-[550px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-medium text-lg text-purple-800">
                Renew Member Plan
              </h1>
              <RxCross2
                onClick={() => setRenew(false)}
                className="w-7 h-7 cursor-pointer active:scale-[0.95]"
              />
            </div>
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => RenewMember(e)}
            >
              <div className="w-full flex flex-col">
                <label class="block mb-2 font-medium mt-2" for="memberName">
                  Member Name
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  className="p-2 w-full rounded-sm bg-purple-100"
                  placeholder="Full Name"
                  value={registerMember.memberName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4" for="planId">
                    Plan
                  </label>
                  <select
                    className="p-2 w-full rounded-sm bg-purple-100"
                    name="planId"
                    id="planId"
                    required
                    onChange={handleChange}
                  >
                    {registerMember.planId ? (
                      <option value={registerMember.planId}>
                        {registerMember.planName}
                      </option>
                    ) : (
                      <option value="NaN">Select Plan</option>
                    )}
                    {plan &&
                      plan.map((plan) => (
                        <option key={plan.planId} value={plan.planId}>
                          {plan.name}
                        </option>
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
                    className="p-2 w-full rounded-sm bg-purple-100"
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
                  className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
                >
                  {loading ? "Renewing.." : `Renew`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openDeleteModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-[6px] flex justify-center items-center fixed overflow-y-auto z-30">
          <div className="w-[450px] bg-white p-6 rounded-lg border-[1px]">
            <div className="w-full flex justify-between mb-1 items-center">
              <h1 className="font-medium text-2xl text-black">Delete Member</h1>
            </div>
            <p className="text-lg text-[#636363] mb-3">
              Are you sure you want to delete this Member?
            </p>

            <div className="w-full flex justify-end">
              <div className="flex gap-5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setItemID("");
                    setTimeout(() => {
                      setDeleteModel(false);
                    }, 200);
                  }}
                  className="font-medium text-[16px]"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => deleteItem(e, itemID)}
                  className="font-medium text-red-500 text-[16px]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberRegister;
