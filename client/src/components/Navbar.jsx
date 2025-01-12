import React from "react";
import LogoWhite from "../assets/logoForBlack.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/login");
  };
  const handleRedirectAndScroll = (section) => {
    // Navigate to "/" with the scrollTo parameter
    navigate(`/?scrollTo=${section}`);
  };
  return (
    <>
      <div className="main bg-[#28282B] flex items-center space-x-20 py-2 justify-between w-[100%] sticky top-0 z-10 max-md:hidden">
        {/* Logo */}
        <img src={LogoWhite} alt="" className="h-24 ml-6" />

        <div className="flex  items-center  space-x-8 mr-10 w-[75%]">
          {/* Navigation */}
          <ul className="flex text-white text-xl font-semibold w-[80%] space-x-6 ">
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
              fundraiser
            </span>
          </ul>
          {/* Login */}
          <div className="flex flex-col justify-center  w-[10%] text-white text-xl font-semibold space-y-2">
            <button
              onClick={loginClick}
              className="underline cursor-pointer hover:text-red-500 ease-in-out transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
