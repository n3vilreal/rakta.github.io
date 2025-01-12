import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navigation({ navbaeStatus, toggleNav }) {
  const navigate = useNavigate();

  const handleRedirectAndScroll = (section) => {
    // Navigate to "/" with the scrollTo parameter
    navigate(`/?scrollTo=${section}`);
    toggleNav(); // Close the navigation menu after redirect
  };

  return (
    <>
      <ul
        className={`flex text-white text-xl font-semibold w-[80%] space-x-6
          ${navbaeStatus ? "max-md:flex" : "max-md:hidden"}
          max-md:flex-col max-md:bg-inherit max-md:pl-4 max-md:pt-4 max-md:font-medium max-md:space-x-0
          max-md:absolute max-md:top-[72px] max-md:right-0 max-md:w-[100vw] max-md:h-[100vh] max-md:space-y-4`}
      >
        <span
          className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
          onClick={() => handleRedirectAndScroll("Home")}
        >
          Home
        </span>
        <span
          className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
          onClick={() => handleRedirectAndScroll("ourMission")}
        >
          Our Mission
        </span>
        <span
          className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
          onClick={() => handleRedirectAndScroll("map")}
        >
          Blood Compatibility
        </span>
        <span
          className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
          onClick={() => handleRedirectAndScroll("map")}
        >
          Map
        </span>
        <span
          className="cursor-pointer hover:text-red-500 transition-all duration-600 ease-in-out"
          onClick={() => handleRedirectAndScroll("map")}
        >
          Fundraiser
        </span>
      </ul>
    </>
  );
}
