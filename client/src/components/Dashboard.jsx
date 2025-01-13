import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext/Index";
import Navbar from "./Navbar";
import NavbarResponsive from "./NavbarResponsive";

function Dashboard() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, "donors");
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredData = Object.entries(data)
            .filter(([key, value]) => value.userId === currentUser.uid)
            .map(([key, value]) => ({ id: key, ...value }));
          setUserData(filteredData);
        }
      });
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `donors/${id}`));
      alert("Entry deleted successfully");
    } catch (error) {
      alert("Error deleting entry");
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(ref(database, `donors/${editData.id}`), editData);
      alert("Entry updated successfully");
      setEditData(null);
    } catch (error) {
      alert("Error updating entry");
    }
  };

  return (
    <>
    <Navbar />
    <NavbarResponsive />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {editData ? (
        <form onSubmit={handleEditSubmit} className="mb-4">
          <input
            type="text"
            value={editData.fullName}
            onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
            placeholder="Full Name"
            className="block w-full p-2 border rounded mb-2"
          />
          <input
            type="tel"
            value={editData.phoneNumber}
            onChange={(e) =>
              setEditData({ ...editData, phoneNumber: e.target.value })
            }
            placeholder="Phone Number"
            className="block w-full p-2 border rounded mb-2"
          />
          <select
            value={editData.bloodGroup}
            onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
            className="block w-full p-2 border rounded mb-2"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </form>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-red-300 bg-[#28282b]">
              <th className="border-2 border-black p-2">Full Name</th>
              <th className="border-2 border-black p-2">Phone Number</th>
              <th className="border-2 border-black p-2">Blood Group</th>
              <th className="border-2 border-black p-2">Actions</th>
            </tr>
          </thead>
                <tbody className="text-center bg-red-100"> 
                  {userData.map((data) => (
                    <tr key={data.id} className="">
                      <td className="border-2 border-black p-2 ">{data.fullName}</td>
                      <td className="border-2 border-black p-2">{data.phoneNumber}</td>
                      <td className="border-2 border-black p-2">{data.bloodGroup}</td>
                      <td className="border-2 border-black p-2">
                        <button
                          onClick={() => handleEdit(data)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
        </table>
      )}
    </div>
    </>
  );
}

export default Dashboard;
