import React from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

const equipment = [
  {
    name: "Lats Pulldown",
    quantity: "2",
    defect: "1",
  },
  {
    name: "Chest Press",
    quantity: "2",
    defect: "0",
  },
  {
    name: "Chest Press",
    quantity: "3",
    defect: "2",
  },
];

const Inventory = () => {
  return (
    <div className="w-full flex flex-col gap-2 h-screen">
      <div className="w-full flex justify-end px-5">
        <button className="px-3 py-[6px] bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-900 transition-all duration-300 ease-in-out font-medium ">
          Add Inventory
        </button>
      </div>
      <hr className="w-full mt-1 border-[1px]" />
      <section className="w-full py-1 px-3">
        <table className="w-full">
          <thead>
            <tr className="w-full border-[1px] border-blue-100 bg-blue-50 rounded-sm">
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                S.No.
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Equipment Name
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Quantity
              </th>
              <th className="font-medium text-left pl-6 py-2 text-[#636363]">
                Status
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {equipment.map((equip, index) => (
              <tr key={index} className="border-[1px] border-blue-100">
                <td className="py-3 px-5 font-medium text-black">{index}</td>
                <td className="py-3 px-5 font-normal text-[#636363]">
                  {equip.name}
                </td>
                <td className="py-3 px-5 font-normal text-[#636363]">
                  {equip.quantity}
                </td>
                <td
                  className={`py-3 px-5 font-normal text-[#636363] flex justify-start`}
                >
                  <span
                    className={`${
                      parseInt(equip.defect) / parseInt(equip.quantity) > 0.5
                        ? "bg-red-200 text-red-500 px-2 py-[1px] rounded-xl"
                        : "bg-green-200 text-green-500 px-3 py-[1px] rounded-xl"
                    } flex items-center justify-center`}
                  >
                    {parseInt(equip.defect) / parseInt(equip.quantity) > 0.5
                      ? "Inactive"
                      : "Active"}
                  </span>
                </td>

                <td className="py-3 px-5 w-[200px]">
                  <div className="w-full flex gap-8">
                    <LiaEditSolid className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer" />
                    <MdDeleteOutline className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed">
        <div className="w-[400px] bg-[#efefef] p-8 rounded-lg ">
          <form className="w-full flex flex-col gap-4" action="">
            <label>Equipment Image</label>
            <input type="file" />

            <label htmlFor="">Equipment Name</label>
            <input type="text" />

            <label htmlFor="">Number of Equipment</label>
            <input type="number" />

            <label htmlFor="">Number of defective Equipment</label>
            <input type="number" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
