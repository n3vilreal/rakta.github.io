import { useState } from "react";
import MapComponent from "../components/MapComponent";
import Navbar from "../components/Navbar";
import NavbarResponsive from "../components/NavbarResponsive";

function Map() {
  return (
    <>
      <div className="main w-[100vw]">
        <NavbarResponsive />
        <Navbar />
        <div className=" container bg-red-600 w-[100vw]">
          <MapComponent />
        </div>
      </div>
    </>
  );
}

export default Map;
