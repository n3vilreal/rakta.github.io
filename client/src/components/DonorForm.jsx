import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { push, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext/Index"; // Added this import

export default function DonorForm({ showForm, toggleForm }) {
  const { currentUser } = useAuth(); // Added this line
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

  const [mapCenter, setMapCenter] = useState([27.7172, 85.3240]); // Default center (Kathmandu)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));
          setMapCenter([latitude, longitude]);
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
        userId: currentUser?.uid || null, // Added this line
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

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6).toString(),
          longitude: lng.toFixed(6).toString(),
        }));
      },
    });
    return null;
  };

  if (!showForm) return null;

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
          <p className="text-sm text-gray-500 mt-2">
              This is your current location.
            </p>
            <br />
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
          <div className="h-64 w-full mb-4">
          <p className="text-sm text-gray-500 mt-2">
              Or Mark on the map to select your location.
            </p>
            <MapContainer
              center={mapCenter}
              zoom={13}
              className="h-full w-full rounded"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  parseFloat(formData.latitude),
                  parseFloat(formData.longitude),
                ]}
              />
              <MapClickHandler />
            </MapContainer>
            
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