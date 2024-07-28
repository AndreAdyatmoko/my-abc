import React, { useState, useEffect } from "react";
import axios from "axios";
import { isWithinInterval } from "date-fns";
import ButtonPrimary from "../../component/button/button";
// import ConfirmationModal from "../../component/modals/confirmationModal";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    status: "All",
  });
  const [adminName, setAdminName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const storedAdminName = localStorage.getItem("username");
    setAdminName(storedAdminName || "Admin");

    fetchUsers();
  }, []);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const filteredUsers = users.filter((user) => {
    const { name, email, startDate, endDate, status } = filters;
    const userDate = new Date(user.registration_date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (name ? user.full_name.toLowerCase().includes(name.toLowerCase()) : true) &&
      (email ? user.email.toLowerCase().includes(email.toLowerCase()) : true) &&
      (status !== "All" ? user.status === status : true) &&
      (!start || !end || isWithinInterval(userDate, { start, end }))
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Selamat datang {adminName}</h1>
          <ButtonPrimary
            text="Logout"
            className="bg-red-700 hover:bg-red-900 w-16 p-2 font-bold"
            onClick={handleLogout}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Filters</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 rounded bg-gray-700 text-white"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded bg-gray-700 text-white"
              value={filters.email}
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              className="border p-2 rounded bg-gray-700 text-white"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              className="border p-2 rounded bg-gray-700 text-white"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
            <select
              name="status"
              className="border p-2 rounded bg-gray-700 text-white"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 shadow-md">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-700">No</th>
                <th className="py-2 px-4 border-b border-gray-700">Nama</th>
                <th className="py-2 px-4 border-b border-gray-700">Email</th>
                <th className="py-2 px-4 border-b border-gray-700">Tanggal Lahir</th>
                <th className="py-2 px-4 border-b border-gray-700">Gender</th>
                <th className="py-2 px-4 border-b border-gray-700">Registrasi</th>
                <th className="py-2 px-4 border-b border-gray-700">Status</th>
                <th className="py-2 px-4 border-b border-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.email}>
                  <td className="p-2 border-b border-gray-700">{indexOfFirstUser + index + 1}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.full_name}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.date_of_birth.split("T")[0]}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.gender}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{user.registration_date.split("T")[0]}</td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <span
                      className={`px-2 py-1 rounded ${user.status === "Active" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <ButtonPrimary
                        text="Edit"
                        className="bg-blue-500 font-bold hover:bg-blue-700 w-20"
                      />
                      <ButtonPrimary
                        text="Delete"
                        className={`font-bold w-20 ${user.status === "Inactive" ? "bg-red-700 hover:bg-red-700 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"}`}
                        disabled={user.status === "Inactive"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
