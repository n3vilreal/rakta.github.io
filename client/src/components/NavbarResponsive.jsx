import React from "react";
import LogoWhite from "../assets/logoForBlack.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

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
      <div className="main bg-[#28282B] flex items-center space-x-20 py-2 justify-between w-[100%] sticky top-0 z-10 md:hidden">
        {/* Logo */}
        <img src={LogoWhite} alt="" className="h-14 ml-6" />

        <div className="flex justify-end space-x-8 pr-5 w-[75%]">
          {/* Login */}
          <div className="flex items-center space-x-7 text-white text-md font-semibold">
            <button
              onClick={loginClick}
              className="bg-red-600 rounded-xl px-3 cursor-pointer hover:text-red-600 hover:bg-white ease-in-out transition-all duration-300"
            >
              Log In
            </button>
            
            <button>
                <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
