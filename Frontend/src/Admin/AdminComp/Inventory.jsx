import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { GiTireIronCross } from "react-icons/gi";
import axios from "axios";

const Inventory = () => {
  const [equipments, setEquipment] = useState({
    imageUrl: "",
    itemName: "",
    quantity: "",
    defect: "",
    price: "",
  });

  const [allData, setAllData] = useState();
  const [openModel, setModel] = useState(false);
  const [openDeleteModel, setDeleteModel] = useState(false);
  const [editable, setEditable] = useState(false);
  const [itemID, setItemID] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipment((prev) => ({ ...prev, [name]: value }));
    console.log(equipments);
  };

  const UnMountModel = () => {
    setTimeout(() => {
      setModel(false);
      setEditable(false);
    }, 200);
  };

  const MountModel = (e) => {
    e.preventDefault();
    setEquipment("");
    setTimeout(() => {
      setModel(true);
    }, 200);
  };

  const handleEditModel = (e, data) => {
    setEditable(true);
    setEquipment(data);
    setModel(true);
  };

  const addItem = async (e) => {
    setLoading(true);
    e.preventDefault();

    let uploadedImageUrl = equipments.imageUrl;

    // If the user has uploaded a new image, only then upload it
    if (equipments.imageUrl instanceof File) {
      uploadedImageUrl = await uploadImage();
    }

    await sendDataToBackend(uploadedImageUrl);

    // Reset the form after submission
    setEquipment({
      imageUrl: "",
      itemName: "",
      quantity: "",
      defect: "",
      price: "",
    });
    setModel(false);
    setEditable(false);
    setLoading(false);
  };

  const sendDataToBackend = async (uploadedImageUrl) => {
    // If no new image is uploaded, keep the old image URL
    const updatedEquip = { ...equipments, imageUrl: uploadedImageUrl };

    try {
      if (editable) {
        // Update existing item
        const response = await axios.put(
          `http://localhost:5002/api/inventory/${equipments.id}`,
          updatedEquip
        );
        console.log(response);
      } else {
        // Add new item
        const response = await axios.post(
          "http://localhost:5002/api/inventory",
          updatedEquip
        );
        console.log(response);
      }
      getAllData(); // Refresh data after adding/updating
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", equipments.imageUrl);
    formData.append("upload_preset", "Dharan Fitness Club");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djpnst0u5/image/upload",
        formData
      );
      return response.data.url; // Return the image URL after upload
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  // GETTING ALL THE INVENTORY DATA
  const getAllData = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/inventory");
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Function for deleting Data

  const deleteItem = async (e, id) => {
    try {
      // Send a DELETE request to the backend
      const response = await axios.delete(
        `http://localhost:5002/api/inventory/${id}`
      );
      console.log(response);
      setTimeout(() => {
        setDeleteModel(false);
      }, 100);
      getAllData(); // Refresh data after deleting
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
          Add Equipment
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
              <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                Price
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
            {allData &&
              allData.map((equip, index) => (
                <tr key={index} className="border-[1px] border-blue-100">
                  <td className="py-3 px-5 font-medium text-black">{index}</td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {equip.itemName}
                  </td>
                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {equip.quantity}
                  </td>

                  <td className="py-3 px-5 font-normal text-[#636363]">
                    {equip.price}
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
                      <LiaEditSolid
                        onClick={(e) => handleEditModel(e, equip)}
                        className="w-6 h-6 text-[#636363] hover:text-green-500 cursor-pointer"
                      />
                      <MdDeleteOutline
                        onClick={() => {
                          setItemID(equip.id);
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
            <div className="w-full flex justify-between mb-4 items-center">
              <h1 className="font-medium text-lg text-blue-600">
                {editable ? "Edit Inventory" : "Add Inventory"}
              </h1>
              <GiTireIronCross
                onClick={() => UnMountModel()}
                className="w-5 h-5 text-red-600 cursor-pointer active:scale-[0.95]"
              />
            </div>
            <form className="w-full flex flex-col" onSubmit={(e) => addItem(e)}>
              <label class="block mb-2 font-medium" for="file_input">
                Upload file
              </label>
              <input
                class="w-full rounded-lg cursor-pointer py-1"
                id="file_input"
                type="file"
                name="imageUrl"
                onChange={(e) =>
                  setEquipment((prev) => ({
                    ...prev,
                    imageUrl: e.target.files[0],
                  }))
                }
              />

              <label class="block mb-2 font-medium mt-4 " for="itemName">
                Equipment Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className="p-2 w-full rounded-sm bg-blue-50"
                placeholder="Name of Equipment"
                value={equipments.itemName}
                onChange={handleChange}
                required
              />

              <div className="w-full flex gap-3">
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="quantity">
                    Total Equipment
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="Total Equipments"
                    value={equipments.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label class="block mb-2 font-medium mt-4 " for="defect">
                    Defective Equipment
                  </label>
                  <input
                    type="number"
                    id="defect"
                    name="defect"
                    className="p-2 w-full rounded-sm bg-blue-50"
                    placeholder="No. of defective Equipments"
                    value={equipments.defect}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label class="block mb-2 font-medium mt-4 " for="price">
                Total Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="p-2 w-full rounded-sm bg-blue-50"
                placeholder="Total price"
                value={equipments.price}
                onChange={handleChange}
                required
              />

              <div className="w-full flex justify-end mt-5 px-[2px]">
                <button
                  type="submit"
                  className="bg-blue-500 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-blue-700 transition-all duration-300 ease-in-out active:bg-blue-900"
                >
                  {loading
                    ? "updating.."
                    : `${editable ? "Update Item" : "Add Item"}`}
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
              <h1 className="font-medium text-2xl text-black">Delete item</h1>
            </div>
            <p className="text-lg text-[#636363] mb-5">
              Are you sure you want to delete this item?{" "}
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

export default Inventory;
