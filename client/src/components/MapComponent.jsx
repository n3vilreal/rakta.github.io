import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for the missing marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow
});

// Function to handle map clicks and add markers
function LocationMarker({ markers, setMarkers }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkers(prevMarkers => [...prevMarkers, {
        position: [lat, lng],
        id: Date.now()
      }]);
    }
  });
  return null;
}

export default function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Center on Nepal
  const center = [27.7172, 85.3240];
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setMarkers(prev => [...prev, {
          position: [parseFloat(lat), parseFloat(lon)],
          id: Date.now(),
          title: display_name
        }]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const removeMarker = (markerId) => {
    setMarkers(markers.filter(marker => marker.id !== markerId));
  };

  return (
    <>
    <div className="w-[100vw]">
      {/* Search Form */}
      <div className="h-[70vh] rounded-lg shadow-lg">

          <div className='map-header'>
            <div className="relative z-[1000] bg-white p-3 shadow-md">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Blood "
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Display Markers */}
          {markers.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.position}
            >
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
          
          {/* Component to handle adding markers on click */}
          <LocationMarker markers={markers} setMarkers={setMarkers} />
        </MapContainer>
      </div>
    </div>

    </>
  );
}