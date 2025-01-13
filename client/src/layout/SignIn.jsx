import React from "react";
import Logo from "../assets/logo.svg";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function SignIn({ handelToggle }) {
  const [showPassword, setShowPassword] = React.useState(true);
  const [nullPassword, setNullPassword] = React.useState(true);

  const handelClick = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (e) => {
    if (e.target.value === "") {
      setNullPassword(true);
    } else {
      setNullPassword(false);
    }
  };
  

  return (
    <div className="main flex h-screen transition-all duration-300">
      <div className="left-half w-[50%] flex flex-col align-center justify-center max-sm:w-[100%]">
        {/* Logo */}
        <div className="logo items-center justify-center flex w-full mt-14">
          <img src={Logo} alt="" className="h-28" />
        </div>
        {/* Sign In Options */}
        <div className="sign-in-options  w-full mt-5 flex flex-col items-center justify-center">
          <div className="sign-in text-4xl font-bold text-center">Sign In</div>
          <div className="options flex justify-center items-center mt-5 space-x-3">
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl">
              <CiFacebook size={42} style={{ strokeWidth: 0.7 }} />
            </div>
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl">
              <CiLinkedin size={42} style={{ strokeWidth: 0.7 }} />
            </div>
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl">
              <FaGoogle size={28} style={{ strokeWidth: 0.7 }} />
            </div>
          </div>
          <div className="mt-5 font-light text-center">
            or use existing account
          </div>
        </div>

        {/* Sign In Form? */}
        <div className="sign-in-form flex flex-col items-center justify-center mt-5 space-y-7 max-sm:w-full">
            <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] max-sm:w-[90%]">
              <input
                type="email"
                className="bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
                placeholder="Email"
              />
            </div>
          <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] max-sm:w-[90%]">
              <input
                type={showPassword ? "password" : "text"}
                className=" bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <p onClick={handelClick} className="text-xl cursor-pointer mr-4 active:text-red-600">
                
                {nullPassword ? null : (showPassword ? <FaEye /> : <FaEyeSlash />)}
              </p>
        </div>
        </div>
        {/* forgot password */}
        <div className="forgot-password font-light text-center mt-5 font-">
          Forgot your Password?
        </div>
        {/* Confirm sign in */}
        <div className="mt-5 text-xl text-white w-32 font-semibold bg-red-600 flex self-center items-center justify-center pt-2 pb-2 rounded-2xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300">
          <button>SIGN IN</button>
        </div>
        <button className="mt-2 sm:hidden underline" onClick={handelToggle}>or Create New Account</button>
        
      </div>
      {/* Right half */}
      <div className="w-[50%] bg-red-700 flex items-center justify-center text-white max-sm:hidden">
        <div className="right-main flex flex-col items-center justify-center">
          {/* motto */}
          <div className="text-4xl w-[550px] text-center font-bold">
            Join the Nepal’s best blood providing platform
          </div>
          {/* describe */}
          <div className="text-md mt-5 w-[300px] ml-8">
            Enter you personal details with us and start journey with us
          </div>
          {/* sign up button */}
          {/* code not understood for hover effect using relative absolute */}
          <div onClick={handelToggle} className="mt-5 text-xl rounded-3xl border-white border-2 p-2 font-bold px-5 shadow-[2px_3px_4px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:text-red-700 cursor-pointer">
            <button  className="relative z-10">
              SIGN UP
            </button>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
        </div>
      </div>
    </div>
  );
}