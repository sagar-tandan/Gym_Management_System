import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { GiTireIronCross } from "react-icons/gi";

const AdminPlan = () => {
  const [PlanData, setPlanData] = useState();

  const [addPlan, setPlan] = useState({
    name: "",
    durationInMonths: "",
    cost: "",
  });

  const [openModel, setModel] = useState(false);
  const [openDeleteModel, setDeleteModel] = useState(false);
  const [editable, setEditable] = useState(false);
  const [itemID, setItemID] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPlan();
  }, []);

  const getAllPlan = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/plan");
      setPlanData(response.data);
      console.table(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const UnMountModel = () => {
    setTimeout(() => {
      setModel(false);
      setEditable(false);
    }, 200);
  };

  const MountModel = (e) => {
    e.preventDefault();
    setPlan("");
    setTimeout(() => {
      setModel(true);
    }, 200);
  };

  const handleEditModel = (e, data) => {
    setEditable(true);
    setPlan(data);
    setModel(true);
  };

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendDataToBackend();
    // Reset the form after submission
    setPlan({
      name: "",
      durationInMonths: "",
      cost: "",
    });
    setModel(false);
    setEditable(false);
    setLoading(false);
  };

  const sendDataToBackend = async () => {
    try {
      if (editable) {
        // Update existing item
        const response = await axios.put(
          `http://localhost:5002/api/plan/${addPlan.planId}`,
          addPlan
        );
        console.log(response);
      } else {
        // Add new item
        const response = await axios.post(
          "http://localhost:5002/api/plan",
          addPlan
        );
        console.log(response);
      }
      getAllPlan(); // Refresh data after adding/updating
    } catch (error) {
      console.log(error);
    }
  };

  //Function for deleting Data
  const deleteItem = async (e, id) => {
    try {
      // Send a DELETE request to the backend
      const response = await axios.delete(
        `http://localhost:5002/api/plan/${id}`
      );
      console.log(response);
      setTimeout(() => {
        setDeleteModel(false);
      }, 100);
      getAllPlan(); // Refresh data after deleting
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 h-screen">
      <div className="w-full flex justify-end px-5">
        <button
          onClick={(e) => MountModel(e)}
          className="px-3 py-[6px] bg-blue-500 text-white rounded-sm hover:bg-blue-600 active:bg-blue-900 transition-all duration-300 ease-in-out font-medium "
        >
          Add Plan
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
                Plan Name
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Validity
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Price
              </th>
              <th className="font-medium text-left pl-6 py-2 text-[#636363]">
                Enrolled
              </th>
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {PlanData &&
              PlanData.map((plan, index) => (
                <tr key={index} className="border-[1px] border-blue-100">
                  <td className="py-3 px-5 font-medium text-black">{index}</td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {plan.name}
                  </td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {plan.durationInMonths} months
                  </td>

                  <td className="py-3 px-5 font-normal text-[#636363]">
                    Rs. {plan.cost}
                  </td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {
                      (plan.memberRegistrations && plan.memberRegistrations)
                        .length
                    }{" "}
                    members
                  </td>

                  <td className="py-3 px-5 w-[200px]">
                    <div className="w-full flex gap-8">
                      <LiaEditSolid
                        onClick={(e) => handleEditModel(e, plan)}
                        className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer"
                      />
                      <MdDeleteOutline
                        onClick={() => {
                          setItemID(plan.planId);
                          setDeleteModel(true);
                        }}
                        className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {openModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
          <div className="w-[450px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
            <div className="w-full flex justify-between mb-0 items-center">
              <h1 className="font-medium text-lg text-blue-600">
                {editable ? "Edit Plan" : "Add Plan"}
              </h1>
              <GiTireIronCross
                onClick={() => UnMountModel()}
                className="w-5 h-5 text-red-600 cursor-pointer active:scale-[0.95]"
              />
            </div>
            <form className="w-full flex flex-col" onSubmit={(e) => addItem(e)}>
              <label class="block mb-2 font-medium mt-4 " for="planName">
                Plan Name
              </label>
              <input
                type="text"
                id="planName"
                name="name"
                className="p-2 w-full rounded-sm bg-blue-50"
                placeholder="Name of Plan"
                value={addPlan.name}
                onChange={handleChange}
                required
              />

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label
                    class="block mb-2 font-medium mt-4 "
                    for="durationInMonths"
                  >
                    Validity
                  </label>
                  <input
                    type="number"
                    id="durationInMonths"
                    name="durationInMonths"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Duration of plan"
                    value={addPlan.durationInMonths}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="cost">
                    Total Price
                  </label>
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Enter price"
                    value={addPlan.cost}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-end mt-5 px-[2px]">
                <button
                  type="submit"
                  className="bg-blue-500 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-blue-700 transition-all duration-300 ease-in-out active:bg-blue-900"
                >
                  {loading
                    ? "updating.."
                    : `${editable ? "Update Plan" : "Add Plan"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openDeleteModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-[6px] flex justify-center items-center fixed overflow-y-auto">
          <div className="w-[450px] bg-white p-6 rounded-lg border-[1px]">
            <div className="w-full flex justify-between mb-1 items-center">
              <h1 className="font-medium text-2xl text-black">Delete Plan</h1>
            </div>
            <p className="text-lg text-[#636363]">
              Are you sure you want to delete this plan?
            </p>
            <p className="mb-5 text-sm pr-20 text-red-500">
              All the members associated with this plan will be deleted.
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

export default AdminPlan;
