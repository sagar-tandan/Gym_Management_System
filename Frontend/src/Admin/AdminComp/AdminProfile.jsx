import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const AdminProfile = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [allUser, setAllUser] = useState([]);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [partAdminId, setPartAdminId] = useState(null);
  const [addAdmin, setAddAdmin] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [oldPassWrong, setOldPassWrong] = useState(false);
  const [passNoMatch, setPassNoMatch] = useState(false);

  const oldPass = useRef(null);
  const newPass = useRef(null);
  const cPass = useRef(null);

  const [adminInfo, setAdminInfo] = useState({
    username: localStorage.getItem("username"),
    profilePic: "",
    coverPic: "",
    role: localStorage.getItem("role"),
    email: localStorage.getItem("AdminEmail"),
  });

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "12345",
    role: "Admin",
    profilePic:
      "https://res.cloudinary.com/djpnst0u5/image/upload/v1726241924/amozhwvblhtctwjuosrl.webp",
    coverPic:
      "https://th.bing.com/th/id/OIP.cHpeU17GITn3ofCu_7fDagHaE8?rs=1&pid=ImgDetMain",
  });

  const [passwordCollection, setPasswordCollection] = useState({
    oldPasswword: "",
    newPassword: "",
    cPassword: "",
  });

  const fetchAdminDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/auth/get-profile/${uid}`
      );
      localStorage.setItem("AdminEmail", response.data.email);
      localStorage.setItem("username", response.data.username);

      setAdminInfo((prev) => ({
        ...prev,
        username: response.data.username,
        profilePic: response.data.profilePic,
        coverPic: response.data.coverPic,
        email: response.data.email,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllAdminDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/auth/getAllAdmins"
      );
      const allData = response.data.filter(
        (data) => data.username != adminInfo.username
      );
      setAllUser(allData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllAdminDetails();
  }, []);

  useEffect(() => {
    fetchAdminDetail();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(adminInfo);
  };

  const UpdateAdminProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    let uploadedProfile = adminInfo.profilePic;
    let uploadedCover = adminInfo.coverPic;

    if (adminInfo.profilePic instanceof File) {
      uploadedProfile = await uploadProfile();
    }
    if (adminInfo.coverPic instanceof File) {
      uploadedCover = await uploadCover();
    }
    await sendDataToBackend(uploadedProfile, uploadedCover);
    fetchAdminDetail();
    setLoading(false);
    setEditable(false);
  };

  const uploadProfile = async () => {
    const formData = new FormData();
    formData.append("file", adminInfo.profilePic);
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

  const uploadCover = async () => {
    const formData = new FormData();
    formData.append("file", adminInfo.coverPic);
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

  const sendDataToBackend = async (uploadedProfile, uploadedCover) => {
    // If no new image is uploaded, keep the old image URL
    const updatedAdmin = {
      ...adminInfo,
      profilePic: uploadedProfile,
      coverPic: uploadedCover,
    };

    try {
      const response = await axios.put(
        `http://localhost:5002/api/auth/update-info/${uid}`,
        updatedAdmin
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deactivateAccount = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5002/api/auth/deactivate/${id}`
      );
      setTimeout(() => {
        setDeleteModel(false);
      }, 100);
      fetchAllAdminDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const AddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5002/api/auth/register", register);
      fetchAllAdminDetails();
      setRegister((prev) => ({
        ...prev,
        username: "",
        email: "",
      }));
      setLoading(false);
      setAddAdmin(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAddAdmin(false);
    }
  };

  const newHandleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPasswordCollection((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(passwordCollection);
  };

  const changePassword = async (e) => {
    e.preventDefault();

    //Now check if both pass are same
    if (passwordCollection.newPassword != passwordCollection.cPassword) {
      setPassNoMatch(true);
      cPass.current.focus();
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5002/api/auth/changePassword/${uid}`,
          {
            oldPassword: passwordCollection.oldPasswword,
            newPassword: passwordCollection.newPassword,
          }
        );
        if (response.status == 500) {
          oldPass.current.focus();
          setOldPassWrong(true);
        } else if (response.status == 400) {
          console.log("Something went wrong!");
        }
        setChangePass(false);
        setPasswordCollection({
          oldPasswword: "",
          newPassword: "",
          cPassword: "",
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 h-screen mt-1 overflow-x-hidden">
      <div className="w-full flex flex-col gap-2 relative px-3 mb-20">
        <img
          className="w-full h-[200px] object-cover rounded-md"
          src={adminInfo.coverPic}
          alt="coverphoto"
        />

        <div className="absolute bottom-[-85px] left-[50px] flex flex-col">
          <img
            className="w-[130px] h-[130px] object-cover rounded-full"
            src={adminInfo.profilePic}
            alt="profile"
          />
          <div className="flex flex-col -translate-y-6 ml-[120px] font-nunito">
            <p className="font-bold text-[24px] text-[#b32fb1]">
              {adminInfo.username}
            </p>
            <p className="font-extralight text-[16px] text-[#b32fb1] -translate-y-1">
              {adminInfo.role}
            </p>
          </div>
        </div>

        <div className="absolute bottom-[-70px] right-[20px] flex gap-3">
          <button
            onClick={(e) => {
              setEditable(true);
            }}
            className="px-1 py-[5px] border-[2px] border-[#b32fb1] w-[150px] rounded-sm text-[#b32fb1] font-nunito text-[15px]"
          >
            Edit profile
          </button>

          <button
            onClick={(e) => {
              setChangePass(true);
            }}
            className="px-1 py-[5px] border-[2px] border-[#b32fb1] w-[150px] rounded-sm text-[#b32fb1] font-nunito text-[15px]"
          >
            Change Password
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              setAddAdmin(true);
            }}
            className="px-1 py-[5px] bg-purple-700 w-[150px] rounded-sm hover:bg-purple-900 transition-all duration-500 text-white font-nunito text-[15px]"
          >
            Add new Admin
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 h-screen">
        {/* <div className="w-full flex justify-start px-3">
          <button
            onClick={(e) => MountModel(e)}
            className="px-3 py-[6px] bg-purple-700 text-white rounded-sm hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out font-medium "
          >
            Add new Admin
          </button>
        </div> */}
        <section className="w-full py-1 px-3 relative">
          <table className="w-full">
            <thead>
              <tr className="w-full border-[1px] border-purple-200 bg-purple-100 rounded-sm ">
                <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                  S.No.
                </th>
                <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                  Username
                </th>
                <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                  Email
                </th>
                <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                  Role
                </th>

                <th className="font-medium text-left pl-4 py-2 text-[#636363]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUser.length > 0 ? (
                allUser.map((user, index) => (
                  <tr key={index} className="border-[1px] border-purple-200">
                    <td className="py-3 px-5 font-medium text-black">
                      {index}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {user.username}
                    </td>
                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {user.email}
                    </td>

                    <td className="py-3 px-5 font-normal text-[#636363]">
                      {user.role}
                    </td>

                    <td className="py-3 px-5">
                      <MdDeleteOutline
                        onClick={() => {
                          setPartAdminId(user.adminId);
                          setDeleteModel(true);
                        }}
                        className="w-6 h-6 text-[#636363] hover:text-red-500 cursor-pointer ml-4"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="absolute w-full text-center mt-3">
                  No data till now!!
                </p>
              )}
            </tbody>
          </table>
        </section>

        {editable && (
          <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
            <div className="w-[450px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
              <div className="w-full flex justify-between mb-4 items-center">
                <h1 className="font-medium text-lg text-purple-800">
                  Update Profile
                </h1>
                <RxCross2
                  onClick={() => {
                    setTimeout(() => {
                      setEditable(false);
                    }, 300);
                  }}
                  className="w-7 h-7 cursor-pointer active:scale-[0.95]"
                />
              </div>
              <form
                className="w-full flex flex-col"
                onSubmit={(e) => UpdateAdminProfile(e)}
              >
                <label class="block mb-2 font-medium" for="file_input">
                  Update Profile Picture
                </label>
                <input
                  class="w-full rounded-lg cursor-pointer py-1"
                  id="file_input"
                  type="file"
                  name="profilePic"
                  onChange={(e) =>
                    setAdminInfo((prev) => ({
                      ...prev,
                      profilePic: e.target.files[0],
                    }))
                  }
                />

                <label class="block mb-2 font-medium mt-4" for="file_input">
                  Update Cover Picture
                </label>
                <input
                  class="w-full rounded-lg cursor-pointer py-1"
                  id="file_input"
                  type="file"
                  name="coverPic"
                  onChange={(e) =>
                    setAdminInfo((prev) => ({
                      ...prev,
                      coverPic: e.target.files[0],
                    }))
                  }
                />

                <label class="block mb-2 font-medium mt-4 " for="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="p-2 w-full rounded-sm bg-purple-100"
                  placeholder="Username"
                  value={adminInfo.username}
                  onChange={handleChange}
                  required
                />

                <label class="block mb-2 font-medium mt-4 " for="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 w-full rounded-sm bg-purple-100"
                  placeholder="Email"
                  value={adminInfo.email}
                  onChange={handleChange}
                  required
                />

                <div className="w-full flex justify-end mt-5 px-[2px]">
                  <button
                    type="submit"
                    className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
                  >
                    {loading ? "updating.." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {addAdmin && (
          <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
            <div className="w-[450px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
              <div className="w-full flex justify-between mb-4 items-center">
                <h1 className="font-medium text-lg text-purple-800">
                  Add New Admin
                </h1>
                <RxCross2
                  onClick={() => {
                    setTimeout(() => {
                      setAddAdmin(false);
                    }, 300);
                  }}
                  className="w-7 h-7 cursor-pointer active:scale-[0.95]"
                />
              </div>
              <form
                className="w-full flex flex-col"
                onSubmit={(e) => AddNewAdmin(e)}
              >
                <label class="block mb-2 font-medium mt-4 " for="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="p-2 w-full rounded-sm bg-purple-100"
                  placeholder="Username"
                  value={register.username}
                  onChange={newHandleChange}
                  required
                />

                <label class="block mb-2 font-medium mt-4 " for="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 w-full rounded-sm bg-purple-100"
                  placeholder="Email"
                  value={register.email}
                  onChange={newHandleChange}
                  required
                />
                <p className="mt-2">
                  Default password is{" "}
                  <span className="font-semibold">12345</span>
                </p>

                <div className="w-full flex justify-end mt-5 px-[2px]">
                  <button
                    type="submit"
                    className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
                  >
                    {loading ? "Adding.." : "Add Admin"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {changePass && (
          <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center fixed overflow-y-auto">
            <div className="w-[450px] bg-white border-[1px] p-8 rounded-lg shadow-sm">
              <div className="w-full flex justify-between mb-4 items-center">
                <h1 className="font-medium text-lg text-purple-800">
                  Change your password
                </h1>
                <RxCross2
                  onClick={() => {
                    setPasswordCollection({
                      oldPasswword: "",
                      newPassword: "",
                      cPassword: "",
                    });
                    setOldPassWrong(false);
                    setPassNoMatch(false);
                    setChangePass(false);
                  }}
                  className="w-7 h-7 cursor-pointer active:scale-[0.95]"
                />
              </div>
              <form
                className="w-full flex flex-col"
                onSubmit={(e) => changePassword(e)}
              >
                <label class="block mb-2 font-medium mt-4 " for="oldPasswword">
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPasswword"
                  name="oldPasswword"
                  className={`p-2 w-full rounded-sm bg-purple-100 ${
                    oldPassWrong ? "outline-red-600" : ""
                  }`}
                  placeholder="Enter Old Password"
                  value={passwordCollection.oldPasswword}
                  onChange={handlePassword}
                  ref={oldPass}
                  required
                />
                {oldPassWrong && (
                  <p className="text-red-600">Your old password is wrong.</p>
                )}

                <label class="block mb-2 font-medium mt-4 " for="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={`p-2 w-full rounded-sm bg-purple-100 `}
                  placeholder="Enter new password"
                  value={passwordCollection.newPassword}
                  onChange={handlePassword}
                  ref={newPass}
                  required
                />

                <label class="block mb-2 font-medium mt-4 " for="cPassword">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="cPassword"
                  name="cPassword"
                  className={`p-2 w-full rounded-sm bg-purple-100 ${
                    passNoMatch ? "outline-red-600" : ""
                  }`}
                  placeholder="Confirm new password"
                  value={passwordCollection.cPassword}
                  onChange={handlePassword}
                  ref={cPass}
                  required
                />
                {passNoMatch && (
                  <p className="text-red-600">Password didn't matched</p>
                )}

                <div className="w-full flex justify-end mt-5 px-[2px]">
                  <button
                    type="submit"
                    className="bg-purple-700 text-[16px] px-6 py-[6px] text-white rounded-sm font-medium hover:bg-purple-900 transition-all duration-300 ease-in-out active:bg-purple-900"
                  >
                    {loading ? "Updating.." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteModel && (
          <div className="w-full top-0 left-0 right-0 bottom-0 backdrop-blur-[6px] flex justify-center items-center fixed overflow-y-auto">
            <div className="w-[450px] bg-white p-6 rounded-lg border-[1px]">
              <div className="w-full flex justify-between mb-1 items-center">
                <h1 className="font-medium text-2xl text-black">
                  Deactivate Admin
                </h1>
              </div>
              <p className="text-lg text-[#636363] mb-5">
                Are you sure you want to deactivate this email?{" "}
              </p>

              <div className="w-full flex justify-end">
                <div className="flex gap-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPartAdminId("");
                      setTimeout(() => {
                        setDeleteModel(false);
                      }, 200);
                    }}
                    className="font-medium text-[16px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => deactivateAccount(e, partAdminId)}
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
    </div>
  );
};

export default AdminProfile;
