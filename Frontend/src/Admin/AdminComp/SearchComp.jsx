import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const SearchComp = () => {
  return (
    <div className="w-full flex justify-between gap-2 ">
      {/* SEARCH  */}
      <div className="w-[70%] flex relative justify-between m-3 px-1 py-1 border-[1px] border-purple-300 rounded-3xl">
        <div className="flex items-center justify-center border-[1px] border-purple-200 rounded-3xl px-2 py-1">
          <h2 className="font-nunito font-semibold">Member</h2>
          <MdOutlineKeyboardArrowDown className="w-6 h-6" />
        </div>
        <div className="w-full px-2">
          <input
            className="w-full p-1 outline-none border-none"
            type="text"
            placeholder="Search members, plans, equipments..."
          />
        </div>
        <div className="flex justify-center items-center bg-purple-400 px-2 rounded-full ">
          <CiSearch className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchComp;
