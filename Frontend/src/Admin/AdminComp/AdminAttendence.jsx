import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAttendance = () => {
  const [paginatedMembers, setPaginatedMembers] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const handleChangeCheck = (memberId, cardNo) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setAttendanceStatus((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        status: !prev[memberId]?.status,
        cardNo,
        date: currentDate,
      },
    }));

    console.log(attendanceStatus);
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/member?pageNumber=1&pageSize=8`
      );
      setPaginatedMembers(response.data.members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 mt-3">
      <div className="w-full flex justify-end px-3">
        <button className="px-8 py-2 bg-purple-700 text-white rounded-sm hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out font-medium">
          {new Date().toLocaleDateString()}
        </button>
      </div>
      <section className="w-full py-1 px-3 relative">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100">
              <th className="font-medium text-left pl-4 py-2 text-purple-800">
                S.No.
              </th>
              <th className="font-medium text-left pl-4 py-2 text-purple-800">
                Card No.
              </th>
              <th className="font-medium text-left pl-4 py-2 text-purple-800">
                Member Name
              </th>
              <th className="font-medium text-left pl-4 py-2 text-purple-800">
                Enrolled Plan
              </th>
              <th className="font-medium text-left pl-6 py-2 text-purple-800">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map((member, index) => (
              <tr
                key={member.id}
                className="border-b border-purple-200 hover:bg-purple-50"
              >
                <td className="py-3 px-5 font-medium text-purple-900">
                  {index + 1}
                </td>
                <td className="py-3 px-5 font-medium text-purple-900">
                  {member.cardNo}
                </td>
                <td className="py-3 px-5 font-normal text-purple-700">
                  {member.memberName}
                </td>
                <td className="py-3 px-5 font-normal text-purple-700">
                  {member.planName}
                </td>
                <td className="py-3 px-5 font-normal text-purple-700">
                  <div className="w-full px-3 flex items-center gap-2">
                    <input
                      onChange={() =>
                        handleChangeCheck(member.id, member.cardNo)
                      }
                      checked={attendanceStatus[member.id]?.status || false}
                      className="form-checkbox h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
                      type="checkbox"
                      id={`attendance-${member.id}`}
                    />
                    <label
                      htmlFor={`attendance-${member.id}`}
                      className="text-purple-700"
                    >
                      {attendanceStatus[member.id]?.status
                        ? "Present"
                        : "Absent"}
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminAttendance;
