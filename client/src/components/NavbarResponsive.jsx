import React, { useState } from "react";
import LogoWhite from "../assets/logoForBlack.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navigation from "./Navigation";
import { useAuth } from "../contexts/authContext/Index";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const [navbaeStatus, setNavbaeStatus] = useState(false);
    const { userLoggedIn } = useAuth();

  const loginClick = () => {
    navigate("/login");
  };

  const logoutClick = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleNav = () => {
    setNavbaeStatus(!navbaeStatus);
  };

  return (
    <>
      <div className="main bg-[#28282B] flex items-center py-2 w-[100%] sticky top-0 z-50 md:hidden">
        {/* Logo */}
        <Navigation navbaeStatus={navbaeStatus} toggleNav={toggleNav} />
        <img src={LogoWhite} alt="" className="h-14 ml-6 " />
        <div className="flex justify-end space-x-8 pr-5 w-[75%]">
          {/* Login */}
          <div className="flex items-center space-x-7 text-white text-md font-semibold">
          {userLoggedIn ? (
              <button
                onClick={logoutClick}
                className="bg-red-600 rounded-xl px-3 cursor-pointer hover:text-red-600 hover:bg-white ease-in-out transition-all duration-300"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={loginClick}
                className="bg-red-600 rounded-xl px-3 cursor-pointer hover:text-red-600 hover:bg-white ease-in-out transition-all duration-300"
              >
                Log In
              </button>
            )}
            <button onClick={toggleNav} className="flex items-center space-x-2 text-2xl">
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
