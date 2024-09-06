import React, { useState } from "react";

const MemberRegister = () => {
  const [selected, setSelected] = useState("allMember");
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
                Card.No.
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
              {/* <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Actions
              </th> */}
            </tr>
          </thead>
        </table>
      </section>
    </div>
  );
};

export default MemberRegister;
