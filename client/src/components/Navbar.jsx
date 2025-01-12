import React from "react";
import LogoWhite from "../assets/logoForBlack.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

export default function Navbar() {
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="main bg-[#28282B] flex items-center space-x-20 py-2 justify-between w-[100%] sticky top-0 z-10 max-md:hidden">
        {/* Logo */}
        <img src={LogoWhite} alt="" className="h-24 ml-6" />

        <div className="flex  items-center  space-x-8 mr-10 w-[75%]">
          {/* Navigation */}
          <Navigation />
          {/* Login */}
          <div className="flex flex-col justify-center  w-[10%] text-white text-xl font-semibold space-y-2">
            <button
              onClick={loginClick}
              className="bg-red-600 py-1 rounded-xl cursor-pointer hover:text-red-600 hover:p-2 hover:bg-white ease-in-out transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
