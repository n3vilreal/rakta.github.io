import { useState } from "react";
import MapComponent from "../components/MapComponent";
import Navbar from "../components/Navbar";

function Map() {
  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-4">
        <h1 className=" flex justify-center text-2xl font-bold mb-4">
          Blood Donner Locations
        </h1>
        <MapComponent />
      </div>
    </>
  );
}

export default Map;
