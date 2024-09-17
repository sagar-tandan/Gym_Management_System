import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { AllContext } from "../../Context/Context";

const SearchComp = () => {
  //   const [searchActive, setsearchActive] = useState("Member");
  const [isActive, setIsActive] = useState(false);
  const { active, setActive } = useContext(AllContext);
  const divRef = useRef(null);
  const input = useRef(null);
  const [currentActive, setCurrentActive] = useState(
    localStorage.getItem("active")
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const { query, setQuery } = useContext(AllContext);

  const handleClick = (e, data) => {
    setActive(data);
    localStorage.setItem("active", data);
    setIsActive(false);
  };

  const FocusOnSearch = () => {
    input.current.focus();
  };

  useEffect(() => {
    if (currentActive === "Dashboard" || currentActive === "Admin") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [currentActive]);

  useEffect(() => {
    setCurrentActive(localStorage.getItem("active"));
  });

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div className="w-full flex justify-between gap-2">
      {/* SEARCH  */}
      <div className="w-[70%] flex relative justify-between m-3 px-1 py-1 border-[1px] border-purple-300 rounded-3xl">
        <div
          onClick={() => {
            setIsActive((prev) => !prev);
          }}
          className="flex items-center justify-center border-[1px] border-purple-200 rounded-3xl px-2 py-1 hover:bg-purple-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
        >
          <h2 className="font-nunito font-semibold">{currentActive}</h2>
          <MdOutlineKeyboardArrowDown className="w-6 h-6" />
        </div>

        <div className="w-full px-2">
          <input
            disabled={isDisabled}
            className={`w-full p-1 outline-none border-none ${
              isDisabled ? "cursor-not-allowed" : ""
            }`}
            type="text"
            placeholder="Search members, plans, equipments..."
            ref={input}
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div
          onClick={() => {
            FocusOnSearch();
          }}
          className={`flex justify-center items-center bg-purple-500 px-2 rounded-full  ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <CiSearch className="w-5 h-5 text-white" />
        </div>

        {isActive && (
          <div
            ref={divRef}
            className="absolute w-[150px] py-2 bottom-[-110px] rounded-lg flex flex-col bg-purple-500 text-white gap-2 font-nunito font-semibold z-40"
          >
            <div className="w-full flex flex-col">
              <p
                onClick={(e) => handleClick(e, "Member")}
                className="px-3 cursor-pointer"
              >
                Member
              </p>
              <hr className="w-full border-white" />
            </div>
            <div className="w-full flex flex-col">
              <p
                onClick={(e) => handleClick(e, "Plan")}
                className="px-3 cursor-pointer"
              >
                Plan
              </p>
              <hr className="w-full border-white" />
            </div>
            <div className="w-full flex flex-col">
              <p
                onClick={(e) => handleClick(e, "Inventory")}
                className="px-3 cursor-pointer"
              >
                Inventory
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComp;
