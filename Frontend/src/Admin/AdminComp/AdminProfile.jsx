import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminProfile = () => {
  const [uid, setUid] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [profile, setProfile] = useState();
  const [cover, setCover] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const getUidFromLocalStorage = () => {
    const id = localStorage.getItem("uid");
    if (id) {
      setUid(id);
    }
  };

  const fetchAdminDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/auth/${uid}`);
      // console.log(response);
      setProfile(response.data.profilePic);
      setCover(response.data.coverPic);
      setUsername(response.data.username);
      localStorage.setItem("AdminEmail", response.data.email);
      localStorage.setItem("username", response.data.username);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5002/api/auth/verify-token"
  //     );
  //   } catch (error) {}
  // };

  useEffect(() => {
    getUidFromLocalStorage();
  }, []);

  useEffect(() => {
    fetchAdminDetail();
  }, [uid]);

  return (
    <div className="w-full flex flex-col gap-2 h-screen mt-1">
      <div className="w-full flex flex-col gap-2 relative px-3 mb-20">
        <img
          className="w-full h-[200px] object-cover rounded-md"
          src={cover}
          alt="coverphoto"
        />

        <div className="absolute bottom-[-85px] left-[50px] flex flex-col">
          <img
            className="w-[130px] h-[130px] object-cover rounded-full"
            src={profile}
            alt=""
          />
          <div className="flex flex-col -translate-y-6 ml-[120px] font-nunito">
            <p className="font-bold text-[24px] text-[#b32fb1]">{username}</p>
            <p className="font-extralight text-[16px] text-[#b32fb1] -translate-y-1">
              {role}
            </p>
          </div>
        </div>

        <button className="absolute bottom-[-70px] right-[20px] px-1 py-[5px] border-[2px] border-[#b32fb1] w-[150px] rounded-md text-[#b32fb1] font-nunito text-[15px]">
          Edit profile
        </button>
      </div>

      <div className="w-full bg-blue-500 p-4"></div>
    </div>
  );
};

export default AdminProfile;
