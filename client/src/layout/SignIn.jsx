import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import { Navigate } from "react-router-dom";
import {
  setupRecaptcha,
  doSignInWithPhoneNumber,
  verifyOTP,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext/Index";

export default function SignIn({ handelToggle }) {
  const { userLoggedIn, loading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setupRecaptcha("sign-in-button");
    return () => {
      // Cleanup recaptcha on unmount
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn && phoneNumber) {
      try {
        setIsSigningIn(true);
        setErrorMessage("");

        await doSignInWithPhoneNumber(phoneNumber);
        setShowOtpInput(true);
        setTimer(60); // Start 60 second timer for resend
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onVerifyOTP = async (e) => {
    e.preventDefault();
    if (!isSigningIn && otp) {
      try {
        setIsSigningIn(true);
        setErrorMessage("");
        await verifyOTP(otp);
        // Success will redirect via userLoggedIn state
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      onSubmit({ preventDefault: () => {} });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className="main flex h-[100vh] transition-all duration-300">
        {/* Left half */}
        <div className="left-half w-[50%] flex flex-col align-center justify-center max-sm:w-[100%]">
          <div className="logo items-center justify-center flex w-full mt-14">
            <img src={Logo} alt="" className="h-28" />
          </div>

          <div className="sign-in-options w-full mt-5 flex flex-col items-center justify-center">
            <div className="sign-in text-4xl font-bold text-center">
              Sign In
            </div>
          </div>

          <form onSubmit={showOtpInput ? onVerifyOTP : onSubmit}>
            <div className="sign-in-form flex flex-col items-center justify-center mt-5 space-y-7 max-sm:w-full">
              {!showOtpInput ? (
                <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] max-sm:w-[90%]">
                  <input
                    type="tel"
                    className="bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={10}
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between w-[50%] h-12 rounded-[7px] bg-[#E4DEDE] max-sm:w-[90%]">
                    <input
                      type="text"
                      className="bg-[#E4DEDE] w-[100%] h-12 rounded-[7px] p-4 focus:outline-none"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={6}
                    />
                  </div>
                  {timer > 0 ? (
                    <div className="text-sm text-gray-600">
                      Resend OTP in {timer} seconds
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Resend OTP
                    </button>
                  )}
                </>
              )}
            </div>

            {errorMessage && (
              <div className="text-red-600 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <div className="mt-5 flex justify-center">
              <button
                id="sign-in-button"
                type="submit"
                className="text-xl text-white w-32 font-semibold bg-red-600 pt-2 pb-2 rounded-2xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isSigningIn ||
                  (!showOtpInput && !phoneNumber) ||
                  (showOtpInput && !otp)
                }
              >
                {isSigningIn
                  ? "Loading..."
                  : showOtpInput
                  ? "Verify OTP"
                  : "Send OTP"}
              </button>
            </div>
          </form>

          <button className="mt-2 sm:hidden underline" onClick={handelToggle}>
            or Create New Account
          </button>
        </div>

        {/* Right half remains the same */}
        <div className="w-[50%] bg-red-700 flex items-center justify-center text-white max-sm:hidden">
          <div className="right-main flex flex-col items-center justify-center">
            <div className="text-4xl w-[550px] text-center font-bold">
              Join Nepal's best blood providing platform
            </div>
            <div className="text-md mt-5 w-[300px] ml-8">
              Enter your personal details with us and start journey with us
            </div>
            <div
              onClick={handelToggle}
              className="mt-5 text-xl rounded-3xl border-white border-2 p-2 font-bold px-5 shadow-[2px_3px_4px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:text-red-700 cursor-pointer"
            >
              <button className="relative z-10">SIGN UP</button>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
