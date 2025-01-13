import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for the missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Function to handle map clicks and add markers
function LocationMarker({ markers, setMarkers }) {
  

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          position: [lat, lng],
          id: Date.now(),
        },
      ]);
    },
  });
  return null;
}

export default function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  // Center on Nepal
  const center = [27.7172, 85.324];

  // Fetch donors from Firebase Realtime Database
  useEffect(() => {
    const donorsRef = ref(database, "donors");

    const unsubscribe = onValue(donorsRef, (snapshot) => {
      const donorsData = [];
      snapshot.forEach((childSnapshot) => {
        const donor = childSnapshot.val();
        if (donor.latitude && donor.longitude) {
          donorsData.push({
            id: childSnapshot.key,
            position: [parseFloat(donor.latitude), parseFloat(donor.longitude)],
            fullName: donor.fullName,
            phoneNumber: donor.phoneNumber,
            bloodGroup: donor.bloodGroup,
          });
        }
      });
      setDonors(donorsData);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedBloodGroup(searchQuery);
  };

  // Filter donors based on blood group
  const filteredDonors = selectedBloodGroup
    ? donors.filter((donor) => donor.bloodGroup === selectedBloodGroup)
    : donors;

  const removeMarker = (markerId) => {
    setMarkers(markers.filter((marker) => marker.id !== markerId));
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="w-[100vw]">
      <div className="h-[100vh] rounded-lg shadow-lg">
        <div className="map-header">
          <div className="relative z-[15] bg-white shadow-md">
            <form
              onSubmit={handleSearch}
              className="z-15 flex gap-2 absolute top-10 right-5"
            >
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Display User-added Markers */}
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <div className="min-w-[200px]">
                  {marker.title && (
                    <h3 className="font-semibold mb-2">{marker.title}</h3>
                  )}
                  <p className="text-sm mb-1">
                    Latitude: {marker.position[0].toFixed(4)}
                  </p>
                  <p className="text-sm mb-2">
                    Longitude: {marker.position[1].toFixed(4)}
                  </p>
                  <button
                    onClick={() => removeMarker(marker.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove Marker
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Display Donor Markers */}
          {filteredDonors.map((donor) => (
            <Marker key={donor.id} position={donor.position}>
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-semibold mb-2">{donor.fullName}</h3>
                  <p className="text-sm mb-1">
                    Blood Group: {donor.bloodGroup}
                  </p>
                  <p className="text-sm mb-1">Phone: {donor.phoneNumber}</p>
                  <p className="text-sm mb-1">
                    Location: {donor.position[0].toFixed(4)},{" "}
                    {donor.position[1].toFixed(4)}
                  </p>
                  <button
                    onClick={handleCallNow}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Call now
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Component to handle adding markers on click */}
          {/* <LocationMarker markers={markers} setMarkers={setMarkers} /> */}
        </MapContainer>
      </div>
    </div>
  );
}
