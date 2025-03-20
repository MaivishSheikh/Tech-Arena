import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function ViewUsers(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/");
        const result = await response.json();
        if (result.success) {
          const sortedUsers = result.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUsers(sortedUsers);
        } else setError(result.message);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDeleteUser = async (username) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/users/deleteUser/${username}`
      );

      if (response.data) {
        alert("User deleted successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter(
            (user) => user.username !== username
          )
        );
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div
        className="mx-auto p-6 my-4 bg-white shadow-2xl rounded-lg"
        style={{ fontFamily: "Poppins", maxWidth: "1300px" }}
      >
        <div className="flex justify-between items-center">
          <h1 style={{ fontSize: "30px", fontWeight: 600 }}>Users</h1>
          <NavLink
            to=""
            className="py-2.5 px-5 rounded-3xl text-white"
            style={{
              background: "linear-gradient(120deg, #1200FF, #00E5FF",
              fontWeight: 500,
            }}
          >
            Add Users
          </NavLink>
        </div>
        <div className="h-full w-full px-4 mt-8">
          <table className="w-full min-w-max table-auto text-left rounded-md">
            <thead>
              <tr className="bg-gray-100 rounded-3xl">
                <th className="p-4 rounded-s-xl">S.No</th>
                <th className="p-4">Full Name</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Action</th>
                <th className="p-4 rounded-e-xl"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ username, fullname, email }, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast ? "px-4 py-2" : "px-4 py-1 border-b";
                const dropdownId = username; 
                return (
                  <tr
                    key={dropdownId}
                    className="hover:bg-gray-50"
                    style={{ fontSize: "14px" }}
                  >
                    <td
                      className={classes}
                      style={{ fontWeight: 600, fontSize: "15px" }}
                    >
                      {index + 1}
                    </td>
                    <td className={classes}>{fullname}</td>
                    <td className={classes}>{username}</td>
                    <td className={classes}>{email}</td>
                    <td className={classes}>
                      <NavLink
                        to=""
                        className="px-4 py-1.5 border rounded-md text-blue-600 hover:bg-blue-100"
                        style={{ fontWeight: 600 }}
                      >
                        Edit
                      </NavLink>
                    </td>
                    <td className={classes}>
                      <div className="relative group">
                        <button
                          onClick={() => toggleDropdown(dropdownId)}
                          className="py-2 px-2.5 hover:bg-slate-200 rounded-3xl focus:outline-none"
                        >
                          <i className="fa-solid fa-ellipsis fa-lg"></i>
                        </button>
                        {openDropdownId === dropdownId && (
                          <div className="absolute -left-2 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <ul className="">
                              <li>
                                <NavLink
                                  to={`/users/${username}`}
                                  className="px-4 py-2 flex first-letter:items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  <div className="pr-4">
                                    <i class="fa-solid fa-expand"></i>
                                  </div>
                                  <div>View</div>
                                </NavLink>
                              </li>
                              <li>
                                <div className="px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                  <div className="pr-4">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                  </div>
                                  <div>Update</div>
                                </div>
                              </li>
                              <li>
                                <div
                                  onClick={() =>
                                    handleDeleteUser(username)
                                  }
                                  className="px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  <div className="pr-4">
                                    <i class="fa-solid fa-trash"></i>
                                  </div>
                                  <div>Delete</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
