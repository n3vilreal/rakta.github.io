import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'; // Add this
import { useAuth } from '../contexts/authContext/Index'; // Add this
import Logo from "../assets/logo.svg";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpWithEmail, saveUserToFirestore } from "../firebase/auth";

export default function SignUp({ handelToggle }) {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password, name);
      await saveUserToFirestore(user);
      console.log("Sign up successful");
      // Add navigation here
      navigate('/'); // or wherever you want to redirect after signup
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.message || "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
};

  return (
    
    <div className="main flex h-screen">
      {userLoggedIn && <Navigate to="/" replace={true} />}
      {/* Left half */}
      <div className="w-[50%] bg-red-700 flex items-center justify-center text-white max-sm:hidden">
        <div className="right-main flex flex-col items-center justify-center">
          {/* motto */}
          <div className="text-4xl w-[550px] text-center font-bold">
            Join Nepal's best blood providing platform
          </div>
          {/* describe */}
          <div className="text-md mt-5 w-[300px] ml-8">
            Enter your personal details with us and start your journey with us
          </div>
          {/* sign up button */}
          <div
            onClick={handelToggle}
            className="mt-5 text-xl rounded-3xl border-white border-2 p-2 font-bold px-5 shadow-[2px_3px_4px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:text-red-700 cursor-pointer"
          >
            <button type="button" className="relative z-10">
              SIGN IN
            </button>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        </div>
      </div>

      {/* Right Half */}
      <div className="left-half w-[50%] flex flex-col align-center justify-center max-sm:w-[100%]">
        {/* Logo */}
        <div className="logo items-center justify-center flex w-full mt-14 max-md:mt-4">
          <img src={Logo} alt="" className="h-28" />
        </div>
        {/* Sign In Options */}
        <div className="sign-in-options w-full mt-5 flex flex-col items-center justify-center">
          <div className="sign-in text-4xl font-bold text-center">Sign Up</div>
          <div className="options flex justify-center items-center mt-5 space-x-3 max-md:hidden">
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl cursor-pointer">
              <CiFacebook size={42} style={{ strokeWidth: 0.7 }} />
            </div>
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl cursor-pointer">
              <CiLinkedin size={42} style={{ strokeWidth: 0.7 }} />
            </div>
            <div className="p-[3px] shadow-[2px_2px_2px_rgba(0,0,0,0.2)] h-10 w-10 flex border-solid border-[1px] border-slate-300 items-center justify-center rounded-2xl cursor-pointer">
              <FaGoogle size={28} style={{ strokeWidth: 0.7 }} />
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <form
          id="signup-form"
          onSubmit={handleSignUp}
          className="sign-in-form flex flex-col items-center justify-center mt-5 space-y-2 max-sm:w-full"
        >
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#E4DEDE] w-[50%] h-12 rounded-[7px] p-4 focus:outline-none focus:ring-2 focus:ring-red-500 max-sm:w-[90%]"
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#E4DEDE] w-[50%] h-12 rounded-[7px] p-4 focus:outline-none focus:ring-2 focus:ring-red-500 max-sm:w-[90%]"
            placeholder="Email"
            required
          />
          <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] focus-within:ring-2 focus-within:ring-red-500 max-sm:w-[90%]">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={handlePasswordClick}
              className="text-xl cursor-pointer mr-4 hover:text-red-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] focus-within:ring-2 focus-within:ring-red-500 max-sm:w-[90%]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              onClick={handleConfirmPasswordClick}
              className="text-xl cursor-pointer mr-4 hover:text-red-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Sign up button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 text-xl text-white w-32 font-semibold bg-red-600 py-2 rounded-2xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 disabled:bg-red-400 disabled:transform-none"
          >
            {isLoading ? "..." : "SIGN UP"}
          </button>
          
          <button
            type="button"
            className="sm:hidden underline text-red-600"
            onClick={handelToggle}
          >
            or Sign In
          </button>
        </form>
      </div>
    </div>
  );
}