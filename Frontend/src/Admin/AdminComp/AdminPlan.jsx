import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { AllContext } from "../../Context/Context";
import "../../Pagination.css";
import ResponsivePagination from "react-responsive-pagination";

const AdminPlan = () => {
  const [PlanData, setPlanData] = useState([]);

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

  // QUERY
  const { query, setQuery } = useContext(AllContext);
  const [queriedPlan, setQueriedPlan] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState();

  useEffect(() => {
    getAllPlan();
  }, []);

  useEffect(() => {
    getAllPlan();
  }, [currentPage]);

  useEffect(() => {
    const activee = localStorage.getItem("active");
    if (activee === "Plan" && query.trim() != "") {
      fetchQueriedPlan();
    }
  }, [query]);

  const fetchQueriedPlan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/dashboard/searchPlan?searchQuery=${query}`
      );
      setQueriedPlan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPlan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/plan/paginated?pageNumber=${currentPage}&pageSize=8`
      );
      console.table(response.data);
      setPlanData(response.data.members);
      setTotalPage(Math.ceil(response.data.totalRecords / 8));
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
    setModel(true);
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
      fetchQueriedPlan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 mt-3">
      <div className="w-full flex justify-end px-3">
        <button
          onClick={(e) => MountModel(e)}
          className="px-8 py-[6px] bg-purple-700 text-white rounded-sm hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out font-medium "
        >
          Add Plan
        </button>
      </div>
      <section className="w-full py-1 px-3 relative">
        <table className="w-full">
          <thead>
            <tr className="w-full border-[1px] border-purple-200 bg-purple-100 rounded-sm">
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
          {query.trim() === "" ? (
            <tbody>
              {PlanData &&
                PlanData.map((plan, index) => (
                  <tr key={index} className="border-[1px] border-purple-200">
                    <td className="py-3 px-5 font-medium text-black">
                      {index}
                    </td>
                    <td className="py-3 px-5 font-medium text-black">
                      {plan.name}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {plan.durationInMonths} months
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      Rs. {plan.cost}
                    </td>
                    <td className="py-3 px-5 font-medium text-black">
                      {plan.memberRegistrationCount} members
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
          ) : queriedPlan.length > 0 ? (
            <tbody>
              {queriedPlan &&
                queriedPlan.map((plan, index) => (
                  <tr key={index} className="border-[1px] border-purple-200">
                    <td className="py-3 px-5 font-medium text-black">
                      {index}
                    </td>
                    <td className="py-3 px-5 font-medium text-black">
                      {plan.name}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {plan.durationInMonths} months
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      Rs. {plan.cost}
                    </td>
                    <td className="py-3 px-5 font-medium text-black">
                      {plan.memberRegistrationCount} members
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
          ) : (
            <div className="w-full py-2 text-center mt-5 absolute">
              No data found !
            </div>
          )}
        </table>
      </section>

      {query.trim() === "" && (
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          className="pagination"
        />
      )}

      {openModel && (
        <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
          <div className="w-[450px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
            <div className="w-full flex justify-between mb-0 items-center">
              <h1 className="font-medium text-lg text-purple-800">
                {editable ? "Edit Plan" : "Add Plan"}
              </h1>
              <RxCross2
                onClick={() => UnMountModel()}
                className="w-7 h-7 cursor-pointer active:scale-[0.95]"
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
                className="p-2 w-full rounded-sm bg-purple-100"
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
                    className="p-2 w-full rounded-sm bg-purple-100"
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
                    className="p-2 w-full rounded-sm bg-purple-100"
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
                  className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
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
