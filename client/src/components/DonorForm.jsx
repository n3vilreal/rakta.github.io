import React, { useState, useEffect } from "react";
import { push, ref } from "firebase/database";
import { database } from "../firebase/firebase";

export default function DonorForm({ showForm, toggleForm }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    bloodGroup: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        () => {
          setError("Error getting location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await push(ref(database, "donors"), {
        ...formData,
        timestamp: Date.now(),
      });

      setSuccess(true);
      setFormData({
        fullName: "",
        phoneNumber: "",
        bloodGroup: "",
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
    } catch {
      setError("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) return null; // Don't render if form is not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative">
        <button
          onClick={toggleForm}
          className="absolute top-2 right-2 text-red-500 hover:text-red-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Donor Registration</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Form submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              maxLength={10}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              readOnly
              placeholder="Latitude"
              className="w-full px-4 py-2 border rounded bg-gray-50"
            />
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              readOnly
              placeholder="Longitude"
              className="w-full px-4 py-2 border rounded bg-gray-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
