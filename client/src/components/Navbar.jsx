import React from "react";
import LogoWhite from "../assets/logoForBlack.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useAuth } from "../contexts/authContext/Index";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="main bg-[#28282B] flex items-center py-2 justify-between w-[100%] sticky top-0 z-10 max-md:hidden">
        {/* Logo */}
        <div className="flex items-center">
          <img src={LogoWhite} alt="" className="h-24 ml-6" />
        </div>
        
        {/* Navigation */}
        <div className="flex-grow flex justify-center">
          <Navigation />
        </div>

        {/* Login/Logout */}
        <div className="flex items-center justify-end text-white text-xl font-semibold space-x-4 mr-6">
          {userLoggedIn ? (
            <button
              onClick={logoutClick}
              className="bg-red-600 py-1 px-4 rounded-xl cursor-pointer hover:text-red-600 hover:bg-white ease-in-out transition-all duration-300"
            >
              Log Out
            </button>
          ) : (
            <button
              onClick={loginClick}
              className="bg-red-600 py-1 px-4 rounded-xl cursor-pointer hover:text-red-600 hover:bg-white ease-in-out transition-all duration-300"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </>
  );
}
